# output：打包路径配置及分析

> path、publicPath 以及 filename

在 `webpack` 中，可通过 `output.path` 配置资源打包根路径，在 `webpack` 中默认打包路径为 `dist` 目录。

那如何将打包路径更改为 `build` 或其它目录呢？

> 在 nginx 中部署前端时，`output.path` 即是 nginx 的 root 指令指向的位置。

``` js
{
  output: {
    path: 'build'
  }
}
```

> Q：你了解 `path.resolve` 及 `path.join` 两者 API 的区别吗？

## 作业

1. 如何更改打包的路径，如配置根路径为 `dist` 或者 `dist/a/b/c`
1. 每次打包时，需要将打包路径资源全部情况，应如何做

