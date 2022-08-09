# 最简静态资源打包

使用 `webpack` 对最简单的静态资源打包，观察其配置与运行时代码。

我们使用 `webpack` 打包两个文件，`index.js` 与 `sum.js`，并通过脚本文件 `build.js` 进行打包。

> 源码见 [node-examples:webpack/cjs](https://github.com/shfshanyue/node-examples/tree/master/engineering/webpack/cjs)

以下是 `index.js` 文件内容：

``` js
const sum = require('./sum')

console.log(sum(3, 8))
```

以下是 `sum.js` 文件内容：

``` js
module.exports = (...args) => args.reduce((x, y) => x + y, 0)
```

同时编写脚本文件 `build.js` 用以打包。

``` js
webpack({
  entry: './index.js',
  mode: 'none',
  output: {
    iife: false,
    pathinfo: 'verbose'
  }
})
```

## webpack 运行时代码

在前端，经常会听到一个词：打包器，而 `webpack` 是其中影响力最大的打包器。

如以上示例，`index.js` 和 `sum.js` 两个文件将被打包成 `dist/main.js` 一个文件。

`dist/main.js` 的骨架代码包含了一些 `webpack` 如何将多个模块集合在一起的代码，被称为运行时代码。

> `main.js` 文件内容见 [main.js](https://github.com/shfshanyue/node-examples/blob/master/engineering/webpack/cjs/example/main.js)，总共 55 行。

为了更好地理解运行时代码，可在 vscode/chrome 中对其文件进行调试，可参考[在 VS Code 中如何调试 Node.js](https://shanyue.tech/node/vscode-debug.html)。

``` js
/******/ var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/*!****************!*\
  !*** ./sum.js ***!
  \****************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 1:0-14 */
/***/ ((module) => {

module.exports = (...args) => args.reduce((x, y) => x + y, 0)

/***/ })
/******/ ]);
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */
const sum = __webpack_require__(/*! ./sum */ 1)

sum(3, 8)

})();
```

## 运行时代码分析

`webpack` 的 runtime，也就是 webpack 最后生成的代码，做了以下三件事:

1. `__webpack_modules__`: 维护一个所有模块的数组。将入口模块解析为 AST，根据 AST 深度优先搜索所有的模块，并构建出这个模块数组。每个模块都由一个包裹函数 `(module, module.exports, __webpack_require__)` 对模块进行包裹构成。
2. `__webpack_require__(moduleId)`: 手动实现加载一个模块。对已加载过的模块进行缓存，对未加载过的模块，执行 id 定位到 `__webpack_modules__` 中的包裹函数，执行并返回 `module.exports`，并缓存。
3. `__webpack_require__(0)`: 运行第一个模块，即运行入口模块。

![](https://static.shanyue.tech/images/22-08-03/clipboard-1917.63716a.webp)

> Q：你了解 Node.js 中的 `module wrapper` 吗？

另外，当涉及到多个 chunk 的打包方式中，比如 `code spliting`，webpack 中会有 jsonp 加载 chunk 的运行时代码。

对 `webpack runtime` 做进一步精简，代码如下。

``` js
const __webpack_modules__ = [() => {}]
const __webpack_require__ = id => {
  const module = { exports: {} }
  const m = __webpack_modules__[id](module, __webpack_require__)
  return module.exports
}

__webpack_require__(0)
```

## 作业

1. 对 `webpack` 运行时代码进行调试与理解
1. `webpack` 的模块加载器是如何实现的
1. `webpack` 的运行时代码做了那些事情
1. 如何根据入口文件搜索出所有需要打包的模块
1. 如何模拟实现运行时代码的生成

