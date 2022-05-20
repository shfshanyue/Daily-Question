# 部署 CRA: 部署时间与云服务优化

当公司内将一个静态资源部署云服务的前端项目持续跑了 N 年后，部署了上万次后，可能出现几种情况。

1. 时间过长。如构建后的资源全部上传到对象存储，然而**有些资源内容并未发生变更**，将会导致过多的上传时间。
1. 冗余资源。**前端每改一行代码，便会生成一个新的资源，而旧资源将会在 OSS 不断堆积，占用额外体积。** 从而导致更多的云服务费用。

## 静态资源上传优化

在前端构建过程中存在无处不在的缓存

1. 当源文件内容未发生更改时，将不会对 Module 重新使用 Loader 等进行重新编译。这是利用了 webpack5 的持久化缓存。
1. 当源文件内容未发生更改时，构建生成资源的 hash 将不会发生变更。此举有利于 HTTP 的 Long Term Cache。

那对比生成资源的哈希，如未发生变更，则不向 OSS 进行上传操作。**这一步将会提升静态资源上传时间，进而提升每一次前端部署的时间。**

**对于构建后含有 hash 的资源，对比文件名即可了解资源是否发生变更。**

> PS: 该脚本路径位于 [cra-deploy/scripts/uploadOSS.mjs](https://github.com/shfshanyue/cra-deploy/blob/master/scripts/uploadOSS.mjs)

伪代码如下:

``` js
// 判断文件 (Object)是否在 OSS 中存在
// 对于带有 hash 的文件而言，如果存在该文件名，则在 OSS 中存在
// 对于不带有 hash 的文件而言，可对该 Object 设置一个 X-OSS-META-MTIME 或者 X-OSS-META-HASH 每次对比来判断该文件是否存在更改，本函数跳过
// 如果再严谨点，将会继续对比 header 之类
async function isExistObject (objectName) {
  try {
    await client.head(objectName)
    return true
  } catch (e) {
    return false
  }
}
```

而对于是否带有 hash 值，设置不同的关于缓存的响应头。

``` js
// objectName: static/css/main.079c3a.css
// withHash: 该文件名是否携带 hash 值
async function uploadFile (objectName, withHash = false) {
  const file = resolve('./build', objectName)
  // 如果路径名称不带有 hash 值，则直接判断在 OSS 中不存在该文件名，需要重新上传
  const exist = withHash ? await isExistObject(objectName) : false
  if (!exist) {
    const cacheControl = withHash ? 'max-age=31536000' : 'no-cache'
    // 为了加速传输速度，这里使用 stream
    await client.putStream(objectName, createReadStream(file), {
      headers: {
        'Cache-Control': cacheControl
      }
    })
    console.log(`Done: ${objectName}`)
  } else {
    // 如果该文件在 OSS 已存在，则跳过该文件 (Object)
    console.log(`Skip: ${objectName}`)
  }
}
```

另外，我们可以通过 [p-queue](https://github.com/sindresorhus/p-queue) 控制资源上传的并发数量。

``` js
const queue = new PQueue({ concurrency: 10 })

for await (const entry of readdirp('./build', { depth: 0, type: 'files' })) {
  queue.add(() => uploadFile(entry.path))
}
```

## Rclone: 按需上传

[Rclone](https://github.com/rclone/rclone)，`rsync for cloud storage`，是使用 Go 语言编写的一款高性能云文件同步的命令行工具，可理解为云存储版本的 rsync，或者更高级的 ossutil。

它支持以下功能:

1. 按需复制，每次仅仅复制更改的文件
1. 断点续传
1. 压缩传输

> 选择阿里云 oss 作为云存储时，配置时其 type 为 s3，其 provider 为 Alibaba

``` bash
# 将资源上传到 OSS Bucket
# alioss: 通过 rclone 配置的云存储名称，此处为阿里云的 oss，个人取名为 alioss
# shanyue-cra: oss 中的 bucket 名称
$ rclone copy --exclude 'static/**' --header 'Cache-Control: no-cache' build alioss:/shanyue-cra --progress 

# 将带有 hash 资源上传到 OSS Bucket，并且配置长期缓存
$ rclone copy --header  'Cache-Control: max-age=31536000' build/static alioss:/shanyue-cra/static --progress
```

为求方便，可将两条命令维护到 `npm scripts` 中

``` js
{
  "scripts": {
    "oss:rclone": "rclone copy --exclude 'static/**' --header 'Cache-Control: no-cache' build alioss:/shanyue-cra --progress && rclone copy --header  'Cache-Control: max-age=31536000' build/static alioss:/shanyue-cra/static --progress",
  }
}
```

## 删除 OSS 中冗余资源

在生产环境中，OSS 只需保留最后一次线上环境所依赖的资源。(多版本共存情况下除外)

此时可根据 OSS 中所有资源与最后一次构建生成的资源一一对比文件名，进行删除。

``` js
// 列举出来最新被使用到的文件: 即当前目录
// 列举出来OSS上的所有文件，遍历判断该文件是否在当前目录，如果不在，则删除
async function main() {
  const files = await getCurrentFiles()
  const objects = await getAllObjects()
  for (const object of objects) {
    // 如果当前目录中不存在该文件，则该文件可以被删除
    if (!files.includes(object.name)) {
      await client.delete(object.name)
      console.log(`Delete: ${object.name}`)
    }
  }
}
```

通过 npm scripts 进行简化:

``` js
{
  "scripts": {
    "oss:rclone": "rclone copy --exclude 'static/**' --header 'Cache-Control: no-cache' build alioss:/shanyue-cra --progress && rclone copy --header  'Cache-Control: max-age=31536000' build/static alioss:/shanyue-cra/static --progress",
  }
}
```

而对于清除任务可通过**定时任务周期性删除 OSS 上的冗余资源**，比如通过 CRON 配置每天凌晨两点进行删除。由于该脚本定时完成，所以无需考虑性能问题，故不适用 `p-queue` 进行并发控制

而有一种特殊情况，可能不适合此种方法。生产环境发布了多个版本的前端，如 AB 测试，toB 面向不同大客户的差异化开发与部署，此时可针对不同版本对应不同的 `output.path` 来解决。

> `output.path` 可通过环境变量注入 webpack 选项，而环境变量可通过以下命令置入。(或置入 .env)

``` bash
export COMMIT_SHA=$(git rev-parse --short HEAD)

export COMMIT_REF_NAME=$(git branch --show-current)
export COMMIT_REF_NAME=$(git rev-parse --abbrev-ref HEAD)
```

以上两个环境变量非常重要，将会在以后篇章经常用到。

## 小结

通过对 OSS 进行优化后，OSS 篇基本完结。

接下来，如何将部署自动化完成呢，如何将应用使得可通过域名访问呢？
