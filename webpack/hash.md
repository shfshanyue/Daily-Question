# Long Term Cache

使用 `webpack` 等打包器进行打包时，每个资源都可以生成一个带有 hash 的路径，如 `main.071b73.js`。

> 源码见 [node-examples:webpack/cjs](https://github.com/shfshanyue/node-examples/tree/master/engineering/webpack/cjs) 中 f4 函数

``` js
{
  output: {
    filename: '[name].[contenthash:6].js'
  }
}
```

> Q：此处 chunkhash 与 contenthash 有何区别？以后再讲。

此处对添加 `hash` 的资源设置长期强缓存，可大幅度提高该网站的 HTTP 缓存能力，从而大幅度提高网站的二次加载性能。

> Q：你知道如何配置强缓存，并验证生效吗？

通过在服务器端对资源设置以下 Response Header，进行强缓存一年时间，称为长期缓存，即 `Long Term Cache`。可参考 

``` bash
Cache-Control: public,max-age=31536000,immutable
```

**而当源文件内容发生变更时，资源的 `hash` 发生变化，生成新的可永久缓存的资源地址。**

因此在实践中，可对打包处理后带有 hash 资源的所有文件设置长期缓存。可在浏览器控制台 Network 中查看响应头来验证所属项目是否已成功添加长期缓存。

![](https://static.shanyue.tech/images/22-08-07/clipboard-4204.9237c9.webp)

## 将版本号放在文件名中？

``` js
const package = require('./package.json')

const config = {
  output: {
    filename: `${package.version}.{hash}.js`
  }
}
```

思考一下，可以将我们项目的版本号注入我们的文件名吗？

不可以，因为每次版本号的改变，这将**导致所有缓存都失效**，而每次版本升级时，并不一定所有资源内容都会进行变更。

## hash 是如何生成的？

在 webpack 中，默认使用 `md4` hash 函数，它将基于模块内容以及一系列元信息生成摘要信息。对于 hash 算法的一部分可参考 [NormalModule](https://github.com/webpack/webpack/blob/main/lib/NormalModule.js) 的 hash 函数。

``` js
_initBuildHash(compilation) {
  const hash = createHash(compilation.outputOptions.hashFunction);
  if (this._source) {
    hash.update("source");
    this._source.updateHash(hash);
  }
  hash.update("meta");
  hash.update(JSON.stringify(this.buildMeta));
  this.buildInfo.hash = /** @type {string} */ (hash.digest("hex"));
}
```

选择一个更加快速的 hash 函数，即可减少 CPU 消耗，并提升打包速度。比如将默认的 `md4` 换成 `xxhash64`

在 `webpack` 中，可通过 `output.hashFuction` 来配置 hash 函数。见 [output.hashFunction 官方文档](https://webpack.js.org/configuration/output/#outputhashfunction)

> Tip：这是面试问题如何提升 webpack 打包速度，八股文不常有的答案。

``` js
function f5 () {
  return webpack([
    {
      entry: './index.js',
      mode: 'none',
      output: {
        filename: 'main.[contenthash:6].md4.js',
        hashFunction: 'md4'
      }
    }, {
      entry: './index.js',
      mode: 'none',
      output: {
        filename: 'main.[contenthash:6].xxhash64.js',
        hashFunction: 'xxhash64'
      }
    }
  ])
}
```

## 作业

1. 什么是 Long Term Cache
1. 为什么可以配置 Long Term Cache
1. 如何提升 webpack 编译时期计算 hash 的速度
1. 在 Node.js 中如何进行 hash 函数计算

