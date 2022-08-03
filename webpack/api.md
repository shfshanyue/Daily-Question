# 使用 webpack api 练习 webpack

在我们使用 webpack 的大部分项目中，都需要使用 `webpack.config.js` 来配置 webpack。

我们学习 `webpack` 的过程也就是学习 `webpack` 配置文件的过程，因此人称 webpack 配置工程师。

但**在学习过程中**，我个人不建议使用 `webpack.config.js` 来学习 webpack。

原因只有一个：**`webpack cli` 实在是太难调试了！**

## 跳来跳去的 webpack cli

当我们执行 `webpack` 命令时发生了什么？

``` bash
$ webpack
```

1. 调用执行 `webpack` 包对应的 `bin/webpack.js` 文件，然后继续调用 `webpack-cli` 包
1. 调用执行 [webpack-cli](https://github.com/webpack/webpack-cli/tree/master/packages/webpack-cli) 包对应的 `bin/cli.js` 文件，然后继续调用 `webpack` 包
1. 调用执行 `webpack` 包的 API 进行打包

你说，这直接调用 `webpack` 的 API 进行学习不更好吗？当然，仅限于学习。

![](https://static.shanyue.tech/images/22-08-03/clipboard-3629.ccf39b.webp)

除了学习，学习 `webpack api` 还有一些其他场景。

## 使用 webpack api 开发

如果你需要基于 `webpack` 做一个脚手架，那很大可能是通过 `webpack api` 来完成的。

比如 `create-react-app` 的 [react-scripts](https://github.com/facebook/create-react-app/tree/main/packages/react-scripts)，便是直接通过 `webpack api` 进行打包。

[见代码](https://github.com/facebook/create-react-app/blob/main/packages/react-scripts/scripts/build.js#L146)。

> 其它脚手架应该也是，但我没有一一验证。

## 使用 webpack api

使用 `webpack api` 也特别容易，将以前 `webpack.config.js` 的配置，作为参数传递给 `webpack` 函数即可。详见文档 [webpack node api](https://webpack.js.org/api/node)。

> Q：既然直接将参数传递给 `webpack` 函数即可，那 `webpack-cli` 的主要作用岂不是读取文件？

示例如下：

``` js
const webpack = require('webpack')

const compiler = webpack({
  // webpack 的诸多配置置于此处
  entry: './index.js'
})

compiler.run((err, stat) => {
  // 在 stat 中可获取关于构建的时间及资源等信息
})
```

使用 `webpack` 进行学习及测试也非常方便，比如使用它测试不同 mode 对打包资源的影响：

``` js
webpack([
  {
    entry: './index.js',
    mode: 'production',
    output: {
      filename: 'main.production.js'
    }
  },
  {
    entry: './index.js',
    mode: 'development',
    output: {
      filename: 'main.development.js'
    }
  },
  {
    entry: './index.js',
    output: {
      filename: 'main.unknown.js'
    }
  }
]).run((err, stat) => {

})
```

## 关于 webpack 的示例

我将所有关于 `webpack` 学习的示例放在了 [node-examples](https://github.com/shfshanyue/node-examples/tree/master/engineering/webpack) 中。

执行 `node build.js`，用以查看构建示例，而在 `build.js` 中，会维护 N 份 webpack 配置。

``` js
// 学习配置一
function f1 () {
  return webpack({
    entry: './index.js',
    mode: 'none',
    output: {
      iife: false,
      pathinfo: 'verbose'
    }
  })
}

// 学习配置二
function f2 () {
  return webpack({
    entry: './index.js',
    mode: 'none',
    optimization: {
      runtimeChunk: true,
    }
  })
}


// 学习配置一时，切换到 f1，学习配置二时，切换到 f2
f1().run((err, stat) => {
  // console.log(stat.toJson())
})
```


## 作业

1. 使用 `webpack api` 打包一个最简的 js 资源
