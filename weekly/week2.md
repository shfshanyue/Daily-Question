# 日问周刊 | 全栈面试汇总 | 第二期

> 勤学如春起之苗，不见其增，日有所长；辍学如磨刀之石，不见其损，日有所亏。

我在 github 上新建了一个仓库 [日问](https://github.com/shfshanyue/Daily-Question)，每天至少一个问题。有关全栈，graphql，devops，微服务以及软技能，促进职业成长，欢迎交流。

以诸葛武侯的诫子书与君共勉

> 夫君子之行，静以修身，俭以养德。非澹泊无以明志，非宁静无以致远。夫学须静也，才须学也，非学无以广才，非志无以成学。淫慢则不能励精，险躁则不能治性。**年与时驰，意与日去，遂成枯落，多不接世，悲守穷庐，将复何及！**

<!--more-->

## 【Q037】linux 有哪些发行版，你最喜欢哪一个

> 原文链接，欢迎讨论: [【Q037】linux 有哪些发行版，你最喜欢哪一个](https://github.com/shfshanyue/Daily-Question/issues/38)

开放问题，不过你至少得知道一个发行版...

## 【Q036】http 状态码中 301，302和307有什么区别

> 原文链接，欢迎讨论: [【Q036】http 状态码中 301，302和307有什么区别](https://github.com/shfshanyue/Daily-Question/issues/37)

+ 301，Moved Permanently。永久重定向，该操作比较危险，需要谨慎操作：如果设置了301，但是一段时间后又想取消，但是浏览器中已经有了缓存，还是会重定向。
+ 302，Fount。临时重定向，但是会在重定向的时候改变 method: 把 POST 改成 GET，于是有了 307
+ 307，Temporary Redirect。临时重定向，在重定向时不会改变 method

## 【Q035】http 常见的状态码有哪些

> 原文链接，欢迎讨论: [【Q035】http 常见的状态码有哪些](https://github.com/shfshanyue/Daily-Question/issues/36)

## 【Q034】如何实现一个 loading 动画

> 原文链接，欢迎讨论：[【Q034】如何实现一个 loading 动画](https://github.com/shfshanyue/Daily-Question/issues/35)

## 【Q033】如何对接口进行限流]

> 原文链接，欢迎讨论: [【Q033】如何对接口进行限流](https://github.com/shfshanyue/Daily-Question/issues/34)

一般采用漏桶算法：

1. 漏桶初始为空
1. API 调用是在往漏桶里注水
1. 漏桶会以一定速率出水
1. 水满时 API 拒绝调用

![漏桶算法](https://d33wubrfki0l68.cloudfront.net/e737eb0be9176ca74d03344f082281154f90f12c/c0076/assets/img/leaky-bucket.f8cb8f08.png)

可以使用 `redis` 的计数器实现

1. 计数器初始为空
1. API 调用计数器增加
1. 给计数器设置过期时间，隔段时间清零，视为一定速率出水
1. 计数器达到上限时，拒绝调用

当然，这只是大致思路，这时会有两个问题要注意

1. 最坏情况下的限流是额定限流速率的2倍
1. 条件竞争问题

不过实际实现时注意以下就好了（话说一般也是调用现成的三方库做限流...)，可以参考我以前的文章 <https://shanyue.tech/post/rate-limit/>

## 【Q032】js 中什么是 softbind，如何实现

> 原文链接，欢迎讨论：[【Q032】js 中什么是 softbind，如何实现](https://github.com/shfshanyue/Daily-Question/issues/33)

## 【Q031】js 中如何实现 bind

> 原文链接，欢迎讨论: [【Q031】js 中如何实现 bind](https://github.com/shfshanyue/Daily-Question/issues/32)

**最简单的 `bind` 一行就可以实现，而在实际面试过程中也不会考察你太多的边界条件**

``` js
Function.prototype.fakeBind = function(obj) {
  return (...args) => this.apply(obj, args)
}
```

测试一下

``` js
function f (arg) {
  console.log(this.a, arg)
}

// output: 3, 4
f.bind({ a: 3 })(4)

// output: 3, 4
f.fakeBind({ a: 3 })(4)
```

## 【Q030】linux 中如何打印所有网络接口

> 原文链接，欢迎讨论: [【Q030】linux 中如何打印所有网络接口](https://github.com/shfshanyue/Daily-Question/issues/31)

### ifconfig

`ifconfig` 是最简单最常用，但是打印信息太多了

``` bash
$ ifconfig
```

### netstat

`netstat` 与 `ip` 也挺好用，特别是它们还可以打印路由表

``` bash
$ netstat -i
```

### ip

``` bash
$ ip link

$ ip addr
```

## 【Q029】websocket 如何向特定的用户组推送消息

在 `redis` 处维护一个对象，记录每个 group 所对应的 `connections`/`sockets`

``` js
{
  'Class:201901': [student1Socket, student2Socket]
}
```

当 client 刚连入 server 时，便加入某个特定的组，或者叫 room，比如 student01，刚开始连入 server，可能要加入 room：`Student:01`，`Class:201901`，`Group:10086`

## [【Q028】在linux中如何获取登录的用户](https://github.com/shfshanyue/Daily-Question/issues/29) [<img src="https://img.shields.io/badge/linux-fabd14">](https://github.com/shfshanyue/Daily-Question/issues?q=is%3Aopen+is%3Aissue+label%3Alinux)

> [【Q028】在linux中如何获取登录的用户](https://github.com/shfshanyue/Daily-Question/issues/29) [<img src="https://img.shields.io/badge/linux-fabd14">](https://github.com/shfshanyue/Daily-Question/issues?q=is%3Aopen+is%3Aissue+label%3Alinux)

``` bash
$ who

$ last
```

## [【Q027】在前端开发中，如何获取浏览器的唯一标识](https://github.com/shfshanyue/Daily-Question/issues/28) [<img src="https://img.shields.io/badge/js-f1da50">](https://github.com/shfshanyue/Daily-Question/issues?q=is%3Aopen+is%3Aissue+label%3Ajs)

[fingerprintjs2](https://github.com/Valve/fingerprintjs2)

## [【Q026】如何对接口进行压力测试](https://github.com/shfshanyue/Daily-Question/issues/27) [<img src="https://img.shields.io/badge/server-blueviolet">](https://github.com/shfshanyue/Daily-Question/issues?q=is%3Aopen+is%3Aissue+label%3Aserver)

## [【Q025】简述 socket 建立的过程](https://github.com/shfshanyue/Daily-Question/issues/26) [<img src="https://img.shields.io/badge/network-blue">](https://github.com/shfshanyue/Daily-Question/issues?q=is%3Aopen+is%3Aissue+label%3Anetwork)

一图胜千言

![image](https://user-images.githubusercontent.com/13389461/68817970-5e11d000-06be-11ea-85ee-5d2496d14c63.png)

## [【Q024】在 postgres 中，查询时如何对 jsonb 数据格式化](https://github.com/shfshanyue/Daily-Question/issues/25) [<img src="https://img.shields.io/badge/db-red">](https://github.com/shfshanyue/Daily-Question/issues?q=is%3Aopen+is%3Aissue+label%3Adb)

使用 `jsonb_pretty` 函数，示例如下

``` sql
> select jsonb_pretty('{"a": {"b": 4}}'::jsonb)
+----------------+
| jsonb_pretty   |
|----------------|
| {              |
|     "a": {     |
|         "b": 4 |
|     }          |
| }              |
+----------------+
SELECT 1
Time: 0.018s
```

## [【Q023】websocket 服务多节点部署时会有什么问题，怎么解决](https://github.com/shfshanyue/Daily-Question/issues/24) [<img src="https://img.shields.io/badge/server-blueviolet">](https://github.com/shfshanyue/Daily-Question/issues?q=is%3Aopen+is%3Aissue+label%3Aserver)

![借用 redis](https://raw.githubusercontent.com/shfshanyue/graph/master/draw/ws-redis.jpg)

## [【Q022】如何实现一个简单的 Promise](https://github.com/shfshanyue/Daily-Question/issues/23) [<img src="https://img.shields.io/badge/js-f1da50">](https://github.com/shfshanyue/Daily-Question/issues?q=is%3Aopen+is%3Aissue+label%3Ajs)

一个简单的 `Promise` 的粗糙实现，关键点在于

1. 当 `pending` 时， `thenable` 函数由一个队列维护
1. 当状态变为 `resolved(fulfilled)` 时，队列中所有 `thenable` 函数执行
1. 当 `resolved` 时， `thenable` 函数直接执行

`rejected` 状态同理

```javascript
class Prom {
  static resolve (value) {
    if (value && value.then) {
      return value 
    }
    return new Prom(resolve => resolve(value))
  }

  constructor (fn) {
    this.value = undefined
    this.reason = undefined
    this.status = 'PENDING'

    // 维护一个 resolve/pending 的函数队列
    this.resolveFns = []
    this.rejectFns = []

    const resolve = (value) => {
      // 注意此处的 setTimeout
      setTimeout(() => {
        this.status = 'RESOLVED'
        this.value = value
        this.resolveFns.forEach(({ fn, resolve: res, reject: rej }) => res(fn(value)))
      })
    }

    const reject = (e) => {
      setTimeout(() => {
        this.status = 'REJECTED'
        this.reason = e
        this.rejectFns.forEach(({ fn, resolve: res, reject: rej }) => rej(fn(e)))
      })
    }

    fn(resolve, reject)
  }


  then (fn) {
    if (this.status === 'RESOLVED') {
      const result = fn(this.value)
      // 需要返回一个 Promise
      // 如果状态为 resolved，直接执行
      return Prom.resolve(result)
    }
    if (this.status === 'PENDING') {
      // 也是返回一个 Promise
      return new Prom((resolve, reject) => {
        // 推进队列中，resolved 后统一执行
        this.resolveFns.push({ fn, resolve, reject }) 
      })
    }
  }

  catch (fn) {
    if (this.status === 'REJECTED') {
      const result = fn(this.value)
      return Prom.resolve(result)
    }
    if (this.status === 'PENDING') {
      return new Prom((resolve, reject) => {
        this.rejectFns.push({ fn, resolve, reject }) 
      })
    }
  }
}

Prom.resolve(10).then(o => o * 10).then(o => o + 10).then(o => {
  console.log(o)
})

return new Prom((resolve, reject) => reject('Error')).catch(e => {
  console.log('Error', e)
})
```

## [【Q021】React 中，cloneElement 与 createElement 各是什么，有什么区别](https://github.com/shfshanyue/Daily-Question/issues/22) [<img src="https://img.shields.io/badge/react-61dafb">](https://github.com/shfshanyue/Daily-Question/issues?q=is%3Aopen+is%3Aissue+label%3Areact)

首参不一样，直接上 API

``` js
React.cloneElement(
  element,
  [props],
  [...children]
)

React.createElement(
  type,
  [props],
  [...children]
)
```

## [【Q020】如何实现一个分布式锁](https://github.com/shfshanyue/Daily-Question/issues/21) [<img src="https://img.shields.io/badge/redis-0d4e99">](https://github.com/shfshanyue/Daily-Question/issues?q=is%3Aopen+is%3Aissue+label%3Aredis) [<img src="https://img.shields.io/badge/server-blueviolet">](https://github.com/shfshanyue/Daily-Question/issues?q=is%3Aopen+is%3Aissue+label%3Aserver)

## [【Q019】如何实现选中复制的功能](https://github.com/shfshanyue/Daily-Question/issues/20) [<img src="https://img.shields.io/badge/html-ea4628">](https://github.com/shfshanyue/Daily-Question/issues?q=is%3Aopen+is%3Aissue+label%3Ahtml)

它一般可以使用第三方库 [clipboard.js](https://github.com/zenorocha/clipboard.js) 来实现，源码很简单，可以读一读

主要有两个要点

1. 选中
1. 复制

### 选中

选中主要利用了 [Selection API](https://developer.mozilla.org/en-US/docs/Web/API/Selection)

选中的代码如下

``` js
const selection = window.getSelection();
const range = document.createRange();

range.selectNodeContents(element);
selection.removeAllRanges();
selection.addRange(range);

selectedText = selection.toString();
```

取消选中的代码如下

``` js
window.getSelection().removeAllRanges();
```

它有现成的第三方库可以使用: [select.js](https://github.com/zenorocha/select)

### 复制

复制就比较简单了，`execCommand`

``` js
document.exec('copy')
```

