# 将静态资源推至 OSS

本篇文章需要 OSS(Object Storage) 云服务服务，一个月几毛钱，可自行购买。我们可以把静态资源上传至 OSS，并对 OSS 提供 CDN 服务。

本篇文章还是以项目 [cra-deploy](https://github.com/shfshanyue/cra-deploy) 示例，并将静态资源上传至 OSS 处理。

## PUBLIC_PATH 与 webpack 的处理

假设将带有 hash 值的静态资源推至 CDN 中，此时静态资源的地址为: `https://cdn.shanyue.tech`。而它即是我们将要在 webpack 中配置的 `config.output.publicPath`。

``` js
module.exports = {
  output: {
    publicPath: 'https://cdn.shanyue.tech'
  }
}
```

在 `create-react-app` 中，对 `webpack config` 做了进一步封装，阅读其源码，了解其 `webpack.config.js` 配置。

``` js
const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL
)

const config = {
  output: {
    // webpack uses `publicPath` to determine where the app is being served from.
    // It requires a trailing slash, or the file assets will get an incorrect path.
    // We inferred the "public path" (such as / or /my-project) from homepage.
    publicPath: paths.publicUrlOrPath,
  },
}
```

可知**在 `cra` 中通过设置环境变量 PUBLIC_URL 即可配置 CDN 地址**。

``` bash
export PUBLIC_URL=https://cdn.shanyue.tech
```

## OSS 云服务之前的准备

### AccessKey

+ aliyun_access_key_id
+ aliyun_access_key_secret

在将静态资源上传至云服务时，我们需要 AccessKey/AccessSecret 获得权限用以上传。可参考文档[创建AccessKey](https://help.aliyun.com/document_detail/53045.html)

### Bucket

`Bucket` 是 OSS 中的存储空间。**对于生产环境，可对每一个项目创建单独的 Bucket**，而在测试环境，多个项目可共用 Bucket。

在创建 Bucket 时，需要注意以下事项。

1. 权限设置为公共读 (Public Read)
1. 跨域配置 CORS (manifest.json 需要配置 cors)
1. 记住 Endpoint，比如 `oss-cn-beijing.aliyuncs.com`。将会在配置 PUBLIC_URL 中使用到

### PUBLIC_URL

最终的 PUBLIC_URL 为 `$Bucket.$Endpoint`，比如本篇文章示例项目的 PUBLIC_URL 为 `https://shanyue-cra.oss-cn-beijing.aliyuncs.com`。

但是，你也可以配置 CNAME 记录并使用自己的域名。

在以下命令行及代码示例中，我们将 cra-deploy 项目的静态资源全部上传至 `shanyue-cra` 该 Bucket 中。

## 将资源推送到 OSS: ossutil

在 OSS 上创建一个 Bucket，通过官方工具 [ossutil](https://help.aliyun.com/document_detail/50452.html) 将静态资源上传至 OSS。

+ [ossutil 安装](https://help.aliyun.com/document_detail/120075.htm)
+ [ossutil 文档](https://help.aliyun.com/document_detail/50452.html)

在进行资源上传之前，需要通过 `ossutil config` 进行权限配置。

``` bash
$ ossutil config -i $ACCESS_KEY_ID -k $ACCESS_KEY_SECRET -e $ENDPOINT
```

命令 `ossutil cp` 可将本地资源上传至 OSS。而缓存策略与前篇文章保持一致:

1. 带有 hash 的资源一年长期缓存
1. 非带 hash 的资源，需要配置 Cache-Control: no-cache，**避免浏览器默认为强缓存**

``` bash
# 将资源上传到 OSS Bucket
# --meta: 配置响应头，也就是这里的缓存策略
# oss://shanyue-cra/: bucket 名字
$ ossutil cp -rf --meta Cache-Control:no-cache build oss://shanyue-cra/

# 将带有 hash 资源上传到 OSS Bucket，并且配置长期缓存
# 注意此时 build/static 上传了两遍 (可通过脚本进行优化)
$ ossutil cp -rf --meta Cache-Control:max-age=31536000 build/static oss://shanyue-cra/static
```

为求方便，可将两条命令维护到 `npm scripts` 中

``` js
{
  scripts: {
    'oss:cli': 'ossutil cp -rf --meta Cache-Control:no-cache build oss://shanyue-cra/ && ossutil cp -rf --meta Cache-Control:max-age=31536000 build/static oss://shanyue-cra/static'
  }
}
```

## 将资源推送到 OSS: npm scripts

另有一种方法，通过官方提供的 SDK: [ali-oss](https://github.com/ali-sdk/ali-oss) 可对资源进行精准控制:

1. 对每一条资源进行精准控制
1. 仅仅上传变更的文件
1. 使用 [p-queue](https://github.com/sindresorhus/p-queue) 控制 N 个资源同时上传

``` js
{
  scripts: {
    'oss:script': 'node ./scripts/uploadOSS.js'
  }
}
```

脚本略过不提。

> PS: 上传 OSS 的配置文件位于 [scripts/uploadOSS.js](https://github.com/shfshanyue/simple-deploy/blob/master/scripts/uploadOSS.js) 中，可通过它使用脚本控制静态资源上传。

## Dockerfile 与环境变量

> PS: 该 Dockerfile 配置位于 [cra-deploy/oss.Dockerfile](https://github.com/shfshanyue/cra-deploy/blob/master/oss.Dockerfile)

由于 `Dockerfile` 同代码一起进行管理，我们**不能将敏感信息写入 Dockerfile**。

故这里使用 [ARG](https://docs.docker.com/engine/reference/builder/#arg) 作为变量传入。而 ARG 可通过 `docker build --build-arg` 抑或 `docker-compose` 进行传入。

``` dockerfile
FROM node:14-alpine as builder

ARG ACCESS_KEY_ID
ARG ACCESS_KEY_SECRET
ARG ENDPOINT
ENV PUBLIC_URL https://shanyue-cra.oss-cn-beijing.aliyuncs.com/

WORKDIR /code

# 为了更好的缓存，把它放在前边
RUN wget http://gosspublic.alicdn.com/ossutil/1.7.7/ossutil64 -O /usr/local/bin/ossutil \
  && chmod 755 /usr/local/bin/ossutil \
  && ossutil config -i $ACCESS_KEY_ID -k $ACCESS_KEY_SECRET -e $ENDPOINT

# 单独分离 package.json，是为了安装依赖可最大限度利用缓存
ADD package.json yarn.lock /code/
RUN yarn

ADD . /code
RUN npm run build && npm run oss:cli

# 选择更小体积的基础镜像
FROM nginx:alpine
ADD nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder code/build /usr/share/nginx/html
```

## docker-compose 配置

> PS: 该 compose 配置位于 [cra-deploy/docker-compose.yaml](https://github.com/shfshanyue/cra-deploy/blob/master/docker-compose.yaml)

在 `docker-compose` 配置文件中，通过 `build.args` 可对 `Dockerfile` 进行传参。

而 `docker-compose.yaml` 同样不允许出现敏感数据，此时**通过环境变量进行传参**。在 `build.args` 中，默认从宿主机的同名环境变量中取值。

> PS: 在本地可通过环境变量传值，那在 CI 中呢，在生产环境中呢？待以后 CI 篇进行揭晓。

``` yaml
version: "3"
services:
  oss:
    build:
      context: .
      dockerfile: oss.Dockerfile
      args:
        # 此处默认从宿主机(host)环境变量中传参
        - ACCESS_KEY_ID
        - ACCESS_KEY_SECRET
        - ENDPOINT=oss-cn-beijing.aliyuncs.com
    ports:
      - 8000:80
```

RUN 起来，成功！

``` bash
$ docker-compose up --build oss
```

## 免费的托管服务平台

经过几篇文章的持续优化，当我们使用对象存储服务之后，实际上在我们的镜像中仅仅只剩下几个文件。

+ `index.html`
+ `robots.txt`
+ `favicon.ico`
+ 等

那我们可以再进一步，将所有静态资源都置于公共服务中吗？

可以，实际上 OSS/COS (对象存储服务) 也可以如此配置，但是较为繁琐，如 Rewrite、Redirect 规则等配置。

如果，你既没有个人服务器，也没有属于个人的域名，可将自己所做的前端网站置于以下免费的托管服务平台。

1. Vercel
1. Github Pages
1. Netlify

## 小结

通过本篇文章，我们已将静态资源部署至 CDN(近乎等同于 CDN)，与大部分公司的生产环境一致。

但在测试环境中最好还是建议无需上传至 OSS，毕竟上传至 OSS 需要额外的时间，且对于测试环境无太大意义。

但实际上 OSS 在**上传及存储阶段**，还可以进一步优化，请看下一篇文章。
