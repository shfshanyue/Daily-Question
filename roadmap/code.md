---
sidebarDepth: 4
---
# 面试大厂，应该练习那些手写代码

大家好，我是山月，最近我在[哔哩哔哩进行模拟面试](https://space.bilibili.com/28696526?spm_id_from=333.1007.0.0)，前来咨询山月的同学络绎不绝。

其中有一个高频问题是：我如何进行编程题目的练习？山月再次总结一份关于手写代码的练习路线。

![前端手写代码](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f88684ccd899437f988661b41f9142f5~tplv-k3u1fbpfcp-watermark.image?)

为了保证代码能够正常运行，调试和测试。

**以下所有的手写代码都贴在 [我的 codepen](https://codepen.io/collection/MggMed) 中**

**以下所有的手写代码都贴在 [我的 codepen](https://codepen.io/collection/MggMed) 中**

**以下所有的手写代码都贴在 [我的 codepen](https://codepen.io/collection/MggMed) 中**

## 准备工作

### API 设计思考

作为一个工作过三年以上的老前端而言，都会明白一个事情:  **API的设计比实现更为重要**。

何解？

如 `compose` 函数常用在各种中间件设计中，如 `redux` 等。`redux` 函数的实现极为简单，甚至一行就能实现，但是能够第一个想到 `compose` 的更不容易。

因此前端面试中的许多面试题以 ES API 与 lodash API 的模拟实现为主，因此在手写代码前需对 `lodash` 与 `ES6+` 文档较为熟悉。

### 代码规范

在面试过程中考察代码，除了可以考察候选人的逻辑能力，其次，可查看候选人的代码能力，比如

1. 是否有一致的代码规范
2. 是否有清晰可读的变量命名
3. 是否有更简介的代码

对于优雅代码的养成能力可以查看 [Clean Code concepts adapted for JavaScript.](https://github.com/ryanmcdermott/clean-code-javascript)，在 Github 上拥有 50+ K的星星数。

比如关于命名优化

``` js
// BAD
// What the heck is 86400000 for?
setTimeout(blastOff, 86400000);

// GOOD
// Declare them as capitalized named constants.
const MILLISECONDS_PER_DAY = 60 * 60 * 24 * 1000; //86400000;

setTimeout(blastOff, MILLISECONDS_PER_DAY);
```

### 空间复杂度与时间复杂度

+ 空间复杂度(Space Complexity) 描述该算法在运行过程中临时占用存储空间大小
+ 时间复杂度(Time complexity) 描述该算法的运行时间，常用大O符号表述

![时间复杂度](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dda5226d9df740a2af6f20da6c5bcfe2~tplv-k3u1fbpfcp-watermark.image?)

> 该图片来自于文章 [How to find time complexity of an algorithm?](https://adrianmejia.com/how-to-find-time-complexity-of-an-algorithm-code-big-o-notation/)

+ O(1): Constant Complexity，常数复杂度，比如计算两次即可得出最终结论
+ O(logn): Logarithmic Complexity，最常见的是二分查找
+ O(n): Linear Complexity，一般为一个 for 循环，但半个或者两个 for 循环也视作 O(n)
+ O(n^2): 一般为嵌套的 for 循环，如冒泡排序

## 手写代码路线图

以下是我在诸多大厂面经中总结的代码题，我将根据难易程度、模块属性总结为不同的部分。

> 备注: [山月总结的所有大厂面试请点击此处](https://q.shanyue.tech)

因此我把题目分为以下几类，可以按照我列出所有代码题的星星数及顺序进行准备，每天找三道题目进行编码，并且坚持下来，三个月后面试大厂时的编码阶段不会出问题。

1. ES API
1. lodash API
1. 编程逻辑题 
1. 算法与数据结构 (leetcode)

**以下所有题目都可以在山月的仓库中找到，并且大部分代码题可在 [codepen](https://codepen.io/collection/MggMed) 上，找到我的题解测试并直接执行。**

## 01 ES API

很多大厂面试题醉心于对于原生 API 的模拟实现，虽然大部分时候无所裨益，但有时可以更进一步加深对该 API 的理解。

例如，当你手写结束 `Promise.all` 时，对手写一个并发控制的 Promises 将会更加得心应手。

### bind/call/apply ⭐⭐⭐⭐⭐️️️️

+ [实现 call/apply](https://github.com/shfshanyue/Daily-Question/issues/674)
+ [实现 bind](https://github.com/shfshanyue/Daily-Question/issues/32)
+ [实现 softBind](https://github.com/shfshanyue/Daily-Question/issues/33)

高频问题，中频实现。

``` js
Function.prototype.fakeBind = function(obj, ...args) {
  return (...rest) => this.call(obj, ...args, ...rest)
}
```

### sleep/delay ⭐⭐⭐⭐⭐

+ 题目: [【Q435】JS 如何实现一个 sleep/delay 函数](https://github.com/shfshanyue/Daily-Question/issues/442)
+ 代码: [【Q435】JS 如何实现一个 sleep/delay 函数](https://codepen.io/shanyue/pen/qBmoNRq?editors=0012)

`sleep` 函数既是面试中常问到的一道代码题，也是日常工作，特别是测试中常用的一个工具函数。

``` js
const sleep = (seconds) => new Promise(resolve => setTimeout(resolve, seconds))

function delay (func, seconds, ...args) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Promise.resolve(func(...args)).then(resolve)
    }, seconds)
  })
}
```

### Promise.all ⭐️⭐️⭐️⭐️⭐️

+ 代码: [Promise.all](https://codepen.io/shanyue/pen/JjWEqBL?editors=0012)
+ 题目: [Promise.all](https://github.com/shfshanyue/Daily-Question/issues/500)

乍看简单，实现时方觉不易。

``` js
function pAll (_promises) {
  return new Promise((resolve, reject) => {
    // Iterable => Array
    const promises = Array.from(_promises)
    // 结果用一个数组维护
    const r = []
    const len = promises.length
    let count = 0
    for (let i = 0; i < len; i++) {
      // Promise.resolve 确保把所有数据都转化为 Promise
      Promise.resolve(promises[i]).then(o => { 
        // 因为 promise 是异步的，保持数组一一对应
        r[i] = o;

        // 如果数组中所有 promise 都完成，则返回结果数组
        if (++count === len) {
          resolve(r)
        }
        // 当发生异常时，直接 reject
      }).catch(e => reject(e))
    }
  })
}
```

### Array.isArray ⭐️⭐️⭐️⭐️⭐️

+ 题目: [Array.isArray](https://github.com/shfshanyue/Daily-Question/issues/563)

面试常问，不过也足够简单。

### Array.prototype.flat ⭐️⭐️⭐️⭐️⭐️

+ 题目: [【Q443】实现一个数组扁平化的函数 flatten](https://github.com/shfshanyue/Daily-Question/issues/451)
+ 代码: [【Q443】实现一个数组扁平化的函数 flatten](https://codepen.io/shanyue/pen/xxdjQXG?editors=0012)

`reduce` 与 `concat` 简直是绝配

``` js
function flatten (list, depth = 1) {
  if (depth === 0) return list
  return list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b, depth - 1) : b), [])
}
```

注意，flatten 拥有第二个参数 depth

### Promise ⭐️⭐️⭐️⭐️

+ 题目: [Promise](https://github.com/shfshanyue/Daily-Question/issues/23)

不说了，要实现真正的符合规范的 Promise，十分不容易。

### Array.prototype.reduce ⭐️⭐️⭐️

+ 代码: [Array.prototype.reduce](https://codepen.io/shanyue/pen/dyWmLgQ?editors=0012)
+ 题目: [Array.prototype.reduce](https://github.com/shfshanyue/Daily-Question/issues/658)

``` js
const reduce = (list, fn, ...init) => {
  let next = init.length ? init[0] : list[0]
  for (let i = init.length ? 0 : 1; i < list.length; i++) {
    next = fn(next, list[i], i)
  }
  return next
}
```

该题目看起来简单，实际做起来有许多边界问题需要注意，如

1. 回调函数中第一个 Index 是多少？
1. 数组为稀疏数组如何处理？

### String.prototype.trim ⭐️⭐️⭐️

+ 题目: [如何去除字符串首尾空白字符](https://github.com/shfshanyue/Daily-Question/issues/667)

在正则表达式中，`\s` 指匹配一个空白字符，包括空格、制表符、换页符和换行符。等价于`[ \f\n\r\t\v\u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]`。

``` js
const trim = str => str.trim || str.replace(/^\s+|\s+$/g, '')
```

一般在考察正则时会考察该 API

## 02 lodash API 

### throtle/debounce ⭐⭐⭐⭐⭐️️

+ 题目: [什么是防抖和节流，他们的应用场景有哪些](https://github.com/shfshanyue/Daily-Question/issues/3)

性能优化中减少渲染的必要手段，代码也足够容易，面试题中经常会被提到。

``` js
function throttle (f, wait) {
  let timer
  return (...args) => {
    if (timer) { return }
    timer = setTimeout(() => {
      f(...args)
      timer = null
    }, wait)
  }
}
```

``` js
function debounce (f, wait) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      f(...args)
    }, wait)
  }
}
```

### cloneDeep ⭐⭐️⭐⭐⭐

+ 题目: [【Q202】如何实现一个深拷贝 (cloneDeep)](https://github.com/shfshanyue/Daily-Question/issues/203)

深拷贝，无论在工作中的性能优化，还是面试中，都大受青睐。

使用 JSON 序列化反序列化无法解决一些复杂对象的拷贝问题，难点在于对不同的数据类型进行处理。

### isEqual ⭐⭐⭐⭐⭐

+ 题目: [【Q598】如何实现一个深比较的函数 deepEqual ](https://github.com/shfshanyue/Daily-Question/issues/614)

深比较，在性能优化中也常用到，比 `cloneDeep` 难度要低一些。

### get ⭐️⭐️⭐️⭐️⭐️

+ 题目: [如何实现类似 lodash.get 函数](https://github.com/shfshanyue/Daily-Question/issues/199)
+ 代码: [如何实现类似 lodash.get 函数](https://codepen.io/shanyue/pen/jOmxwMv?editors=0012)

在 ES6+ 中，使用可选链操作符 `?.` 可进一步减小实现难度

``` js
function get (source, path, defaultValue = undefined) {
  // a[3].b -> a.3.b -> [a, 3, b]
  const paths = path.replace(/\[(\w+)\]/g, '.$1').replace(/\["(\w+)"\]/g, '.$1').replace(/\['(\w+)'\]/g, '.$1').split('.')
  let result = source
  for (const p of paths) {
    result = result?.[p]
  }
  return result === undefined ? defaultValue : result 
}
```

### compose(flowRight) ⭐️⭐️⭐️⭐️⭐️

+ 题目: [【Q181】如何实现 compose 函数，进行函数合成](https://github.com/shfshanyue/Daily-Question/issues/182)

``` js
const compose = (...fns) =>
  // 注意 f、g 的位置，如果实现从左到右计算，则置换顺序
  fns.reduce((f, g) => (...args) => f(g(...args)))
```

### shuffle ⭐️⭐️⭐️⭐️⭐️

+ 题目: [【Q447】如何实现一个数组洗牌函数 shuffle](https://github.com/shfshanyue/Daily-Question/issues/455)
+ 相关: [【Q645】随机生成六位数的手机验证码(重复/不可重复)](https://github.com/shfshanyue/Daily-Question/issues/663)
+ 代码: [【Q447】如何实现一个数组洗牌函数 shuffle](https://codepen.io/shanyue/pen/KKmRqZJ?editors=0012)

对于实现一个简单的 `shuffle`，可能极其简单。

``` js
const shuffle = (list) => list.sort((x, y) => Math.random() - 0.5)
```

如果不借助 `Array.prototype.sort`，可由以下代码实现

``` js
function shuffle (list) {
  const len = list.length
  let result = [...list]
  for (let i = len - 1; i > 0; i--) {
    const swapIndex = Math.floor(Math.random() * (i + 1));
    [result[i], result[swapIndex]] = [result[swapIndex], result[i]]
  }
  return result
}
```

生产实践中很多场景会使用到 `shuffle`，如**随机生成不重复六位数的手机验证码**

### sample ⭐️⭐️⭐️⭐️⭐️

+ 题目: [【Q436】如何实现一个 sample 函数，从数组中随机取一个元素](https://github.com/shfshanyue/Daily-Question/issues/443)

Math.random() 函数返回一个浮点, 伪随机数在范围从0到小于1，用数学表示就是 [0, 1)，可以利用它来实现 sample 函数

``` js
Array.prototype.sample = function () { return this[Math.floor(Math.random() * this.length)] }
```

### sampleSize ⭐️⭐️⭐️⭐️⭐️

+ 题目: [【Q677】如何实现一个 sampleSize 函数，从数组中随机取N个元素](https://github.com/shfshanyue/Daily-Question/issues/696)

可以根据 `shuffle` 来实现一个简单的 sampleSize

``` js
const shuffle = (list) => list.sort((x, y) => Math.random() - 0.5)
const sampleSize = (list, n) => shuffle(list).slice(0, n)
```

### maxBy ⭐⭐⭐⭐⭐

+ 题目: [【Q628】实现一个函数 maxBy，根据给定条件找到最大的数组项](https://github.com/shfshanyue/Daily-Question/issues/646)

### keyBy ⭐⭐⭐⭐

+ 题目: [【Q678】实现一个函数 keyBy](https://github.com/shfshanyue/Daily-Question/issues/697)

### groupeBy ⭐⭐⭐⭐

+ 题目: [【Q679】实现一个函数 groupBy](https://github.com/shfshanyue/Daily-Question/issues/698)

### chunk ⭐️⭐️⭐️⭐️

+ 题目: [【Q643】如何实现 chunk 函数，数组进行分组](https://github.com/shfshanyue/Daily-Question/issues/661)

``` js
function chunk (list, size) {
  const l = []
  for (let i = 0; i < list.length; i++ ) {
    const index = Math.floor(i / size)
    l[index] ??= [];
    l[index].push(list[i])
  }
  return l
}
```

### once ⭐️⭐️⭐️⭐️

+ 题目: [【Q399】实现一个 once 函数，记忆返回结果只执行一次](https://github.com/shfshanyue/Daily-Question/issues/406)

``` js
const f = x => x

const onceF = once(f)

//=> 3
onceF(3)

//=> 3
onceF(4)
```

### template ⭐⭐⭐⭐️️️️️

+ 题目: [【Q660】实现一个 render/template 函数，可以用以渲染模板](https://github.com/shfshanyue/Daily-Question/issues/678)
+ 代码: [【Q660】实现一个 render/template 函数，可以用以渲染模板](https://codepen.io/shanyue/pen/yLboJQE?editors=0012)

难度稍微大一点的编程题目。

``` js
const template = '{{ user["name"] }}，今天你又学习了吗 - 用户ID: {{ user.id }}';

const data = {
  user: {
    id: 10086,
    name: '山月',
  }
};

//=> "山月，今天你又学习了吗 - 用户ID: 10086"
render(template, data); 
```

注意:

1. 注意深层嵌套数据
2. 注意 `user['name']` 属性

### pickBy/omitBy ⭐⭐⭐⭐

### camelCase ⭐️⭐⭐⭐

+ 题目: [驼峰命名](https://github.com/shfshanyue/Daily-Question/issues/703)

### difference ⭐️⭐️⭐️

+ 题目: [【Q655】实现 intersection，取数组交集](https://github.com/shfshanyue/Daily-Question/issues/673)

## 03 编程逻辑题

关于编程逻辑题，指在工作中常会遇到的一些数据处理

### FizzBuzz，是否能被3或5整除  ⭐️⭐️⭐️⭐️⭐️

+ 题目: [FizzBuzz，是否能被3或5整除](https://github.com/shfshanyue/Daily-Question/issues/702)

输入一个整数，如果能够被3整除，则输出 Fizz

如果能够被5整除，则输出 Buzz

如果既能被3整数，又能被5整除，则输出 FizzBuzz

``` js
//=> 'fizz'
fizzbuzz(3)

//=> 'buzz'
fizzbuzz(5)

//=> 'fizzbuzz'
fizzbuzz(15)

//=> 7
fizzbuzz(7)
```

这道题虽然很简单，但在面试中仍然有大部分人无法做对

### 实现 Promise.map 用以控制并发数 ⭐️⭐️⭐️⭐️⭐️

+ 题目: [Promise.map](https://github.com/shfshanyue/Daily-Question/issues/89)
+ 代码: [Promise.map](https://codepen.io/shanyue/pen/zYwZXPN?editors=0012)

用以 Promise 并发控制，面试中经常会有问到，在工作中也经常会有涉及。在上手这道问题之前，了解 [Promise.all]() 的实现将对实现并发控制有很多的帮助。

另外，最受欢迎的 Promise 库 [bluebird](https://github.com/petkaantonov/bluebird) 对 `Promise.map` 进行了实现，在项目中大量使用。

### 异步的 sum/add ⭐️⭐️⭐️⭐️⭐️

**编码题中的集大成者**，出自头条的面经，promise 串行，并行，二分，并发控制，层层递进。

+ 题目: [【Q644】实现一个异步的 sum/add](https://github.com/shfshanyue/Daily-Question/issues/662)

### 如何使用 JS 实现一个发布订阅模式 ⭐️⭐️⭐️⭐️⭐️

+ 题目: [【Q613】如何使用 JS 实现一个发布订阅模式](https://github.com/shfshanyue/Daily-Question/issues/631)
+ 代码: [【Q613】如何使用 JS 实现一个发布订阅模式](https://codepen.io/shanyue/pen/WNjprpe?editors=0012)

### 如何实现无限累加的 sum 函数 ⭐️⭐️⭐️⭐️⭐️

+ 题目: [【Q421】如何实现无限累加的一个函数](https://github.com/shfshanyue/Daily-Question/issues/428)
+ 代码: [【Q421】如何实现无限累加的一个函数](https://codepen.io/shanyue/pen/LYymamZ?editors=0012)

实现一个 sum 函数如下所示：

``` js
sum(1, 2, 3).valueOf() //6
sum(2, 3)(2).valueOf() //7
sum(1)(2)(3)(4).valueOf() //10
sum(2)(4, 1)(2).valueOf() //9
sum(1)(2)(3)(4)(5)(6).valueOf() // 21
```

**这还是字节、快手、阿里一众大厂最为偏爱的题目，实际上有一点技巧问题。**

**这还是字节、快手、阿里一众大厂最为偏爱的题目，实际上有一点技巧问题。**

**这还是字节、快手、阿里一众大厂最为偏爱的题目，实际上有一点技巧问题。**

这是一个关于懒计算的函数，使用 sum 收集所有累加项，使用 valueOf 进行计算

+ sum 返回一个函数，收集所有的累加项，使用递归实现
+ 返回函数带有 valueOf 属性，用于统一计算

``` js
function sum (...args) {
  const f = (...rest) => sum(...args, ...rest)
  f.valueOf = () => args.reduce((x, y) => x + y, 0)
  return f
}
```

### 统计数组中最大的数/第二大的数 ⭐️⭐️⭐️⭐️⭐️

+ 题目: [统计数组中最大的数/第二大的数](https://github.com/shfshanyue/Daily-Question/issues/647)
+ 代码: [统计数组中最大的数/第二大的数](https://codepen.io/shanyue/pen/vYmyYwQ)

求最大的一个值：

``` js
function max (list) {
  if (!list.length) { return 0 }
  return list.reduce((x, y) => x > y ? x : y)
}
```

求最大的两个值：

> 代码见 [找出数组中最大的两个值 - codepen](https://codepen.io/shanyue/pen/vYmyYwQ?editors=1010)

``` js
function maxTwo (list) {
  let max = -Infinity, secondMax = -Infinity
  for (const x of list) {
    if (x > max) {
      secondMax = max
      max = x
    } else if (x > secondMax) {
      secondMax = x
    }
  }
  return [max, secondMax]
}
```

如果求 TopN，可使用大顶堆、小顶堆实现，见另一个问题

### 统计字符串中出现次数最多的字符 ⭐️⭐️⭐️⭐️⭐️

+ 题目: [【Q644】统计字符串中出现次数最多的字符及次数](https://github.com/shfshanyue/Daily-Question/issues/652)
+ 代码: [【Q644】统计字符串中出现次数最多的字符及次数](https://codepen.io/shanyue/pen/YzVGjrv?editors=0012)

``` js
function getFrequentChar (str) {
  const dict = {}
  for (const char of str) {
    dict[char] = (dict[char] || 0) + 1
  }
  const maxBy = (list, keyBy) => list.reduce((x, y) => keyBy(x) > keyBy(y) ? x : y)
  return maxBy(Object.entries(dict), x => x[1])
}
```

以下方案一边进行计数统计一遍进行大小比较，只需要 1 次 `O(n)` 的算法复杂度

``` js
function getFrequentChar2 (str) {
  const dict = {}
  let maxChar = ['', 0]
  for (const char of str) {
    dict[char] = (dict[char] || 0) + 1
    if (dict[char] > maxChar[1]) {
      maxChar = [char, dict[char]]
    }
  }
  return maxChar
}
```

### 对以下数字进行编码压缩 ⭐️⭐️⭐️⭐️⭐️

+ 题目: [【Q412】对以下字符串进行压缩编码](https://github.com/shfshanyue/Daily-Question/issues/419)
+ 代码: [【Q412】对以下字符串进行压缩编码](https://codepen.io/shanyue/pen/bGWrwWM?editors=0012)

这是一道大厂常考的代码题

+ Input: 'aaaabbbccd'
+ Output: 'a4b3c2d1'，代表 a 连续出现四次，b连续出现三次，c连续出现两次，d连续出现一次

有以下测试用例

``` js
//=> a4b3c2
encode('aaaabbbcc')

//=> a4b3a4
encode('aaaabbbaaaa')

//=> a2b2c2
encode('aabbcc')
```

**如果代码编写正确，则可继续深入：**

+ 如果只出现一次，不编码数字，如 aaab -> a3b
+ 如果只出现两次，不进行编码，如 aabbb -> aab3
+ 如果进行解码数字冲突如何解决

编写函数 `encode` 实现该功能

> 代码见 [【Q412】对以下字符进行压缩编码 - codepen](https://codepen.io/shanyue/pen/bGWrwWM?editors=0012)

``` js
function encode (str) {
  const l = []
  let i = 0
  for (const s of str) {
    const len = l.length
    const lastChar = len > 0 ? l[len - 1][0] : undefined
    if (lastChar === s) {
      l[len - 1][1]++
    } else {
      l.push([s, 1])
    }
  }
  return l.map(x => x.join('')).join('')
}
```

测试通过

``` js
> encode('aaab')
< "a3b1"
```

但是面试官往往会继续深入

1. 如果只出现一次，不编码数字，如 `aaab -> a3b`
1. 如果只出现两次，不进行编码，如 `aabbb -> aab3`
1. 如果进行解码，碰到数字如何处理？

以下是除数字外的进一步编码

``` js
function encode (str) {
  const l = []
  let i = -1;
  let lastChar
  for (const char of str) {
    if (char !== lastChar) {
      lastChar = char
      i++
      l[i] = [char, 1];
    } else {
      l[i][1]++
    }
  }
  return l.map(([x, y]) => {
    if (y === 1) {
      return x
    }
    if (y === 2) {
      return x + x
    }
    return x + y
  }).join('')
}
```

### LRU Cache ⭐️⭐️⭐️⭐️⭐️

+ 代码: [【Q249】使用 js 实现一个 lru cache](https://github.com/shfshanyue/Daily-Question/issues/251)

### 实现一个函数用来对 URL 的 querystring 进行编码与解码 ⭐️⭐️⭐️⭐️⭐️

+ 题目: [【Q440】实现一个函数用来对 URL 的 querystring 进行编码](https://github.com/shfshanyue/Daily-Question/issues/448)

### JSONP 的原理是什么，如何实现 ⭐️⭐️⭐️⭐️

+ 题目: [【Q439】JSONP 的原理是什么，如何实现](https://github.com/shfshanyue/Daily-Question/issues/447)

`JSONP`，全称 `JSON with Padding`，为了解决跨域的问题而出现。虽然它只能处理 GET 跨域，虽然现在基本上都使用 CORS 跨域，但仍然要知道它，毕竟**面试会问**。

`JSONP` 基于两个原理:

1. 动态创建 `script`，使用 `script.src` 加载请求跨过跨域
1. `script.src` 加载的脚本内容为 JSONP: 即 `PADDING(JSON)` 格式

``` js
function jsonp ({ url, onData, params }) {
  const script = document.createElement('script')

  // 一、为了避免全局污染，使用一个随机函数名
  const cbFnName = `JSONP_PADDING_${Math.random().toString().slice(2)}`

  // 二、默认 callback 函数为 cbFnName
  script.src = `${url}?${stringify({ callback: cbFnName, ...params })}`

  // 三、使用 onData 作为 cbFnName 回调函数，接收数据
  window[cbFnName] = onData;

  document.body.appendChild(script)
}

// 发送 JSONP 请求
jsonp({
  url: 'http://localhost:10010',
  params: { id: 10000 },
  onData (data) {
    console.log('Data:', data)
  }
})
```

### 使用 JS 如何生成一个随机字符串 ⭐️⭐️⭐️⭐️⭐️

+ 题目: [【Q619】使用 JS 如何生成一个随机字符串](https://github.com/shfshanyue/Daily-Question/issues/637)

``` js
const random = (n) => Math.random().toString(36).slice(2, 2 + n)
```

### 给数字添加千位符  ⭐️⭐️⭐️

+ 代码: [如何给数组添加千位符](https://github.com/shfshanyue/Daily-Question/issues/610)

千位符替换可由正则 /(\d)(?=(\d\d\d)+(?!\d))/ 进行匹配

``` js
function numberThousands (number, thousandsSeperator = ',') {
  return String(number).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousandsSeperator)
}
```

## 04 算法与数据结构 (leetcode)

**Leetcode 简单与中级难度题目 200/100 道，以简单题目为主。直接刷就得了。**

当然，如果你现在开始刷 leetcode，有可能毫无头绪，不知从那道题刷起。

那强烈推荐优先刷[LeetCode 热题 HOT 100](https://leetcode-cn.com/problem-list/2cktkvj/)。

在我的题库中也收集了在诸多大厂面经中总结出的多道算法题，总结如下

### 输出 100 以内的菲波那切数列

+ 题目: [输出 100 以内的菲波那切数列](https://github.com/shfshanyue/Daily-Question/issues/653)

### TopK 问题

+ 题目: [【Q288】如何求数组中的 TOP k](https://github.com/shfshanyue/Daily-Question/issues/290)

典型的二叉堆问题

1. 取数组中前 k 个数做小顶堆，堆化
1. 数组中的其它数逐一与堆顶元素比较，若大于堆顶元素，则插入该数

时间复杂度 O(nlg(k))

### 求正序增长的正整数数组中，其和为 N 的两个数

+ 题目: [【Q681】求正序增长的正整数数组中，其和为 N 的两个数](https://github.com/shfshanyue/Daily-Question/issues/700)

### 求给定数组中 N 个数相加之和为 sum 所有可能集合

+ 题目: [【Q673】求给定数组中 N 个数相加之和为 sum 所有可能集合](https://github.com/shfshanyue/Daily-Question/issues/692)

求给定数组中 N 个数相加之和为 sum 所有可能集合，请补充以下代码

``` js
function fn(arr, n, sum) {}
```

### 如何判断两个链表是否相交

+ 题目: [【Q061】如何判断两个链表是否相交](https://github.com/shfshanyue/Daily-Question/issues/62)

经典问题

## 最终

代码编程题在面试过程中出现频率很高，且能很大程度考察候选人的代码能力与代码风格。
