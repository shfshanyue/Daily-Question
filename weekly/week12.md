# 日问周刊 | 全栈面试汇总 | 第十二期

我在 github 上新建了一个仓库 [日问](https://github.com/shfshanyue/Daily-Question)，每天一道面试题，有关前端，后端，devops以及软技能，促进职业成长，敲开大厂之门，欢迎交流

在我的博客 [shfshanyue/blog](https://github.com/shfshanyue/blog) 会对比较难的问题进行讲解。

并且记录我的面试经验

+ [大厂面经大全](https://q.shanyue.tech/interview.html)
+ [前端面试题小记](https://q.shanyue.tech/fe/)
+ [计算机基础面试题小计](https://q.shanyue.tech/base/)

## 01 对于已经 import 但未实际使用的模块使用 webpack 还会对它打包吗？

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/204)

## 02 Node 中如何判断一个路径是文件还是文件夹

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/205)

## 03 Code Splitting 的原理是什么

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/206)

## 04 no-cache 与 no-store 的区别是什么

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/207)

no-cache 可以在本地缓存，可以在代理服务器缓存，但是这个缓存要服务器验证才可以使用 
no-store 是禁用缓冲，本地和代理服务器都不缓冲，每次都从服务器获取

## 05 什么是隔离级

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/208)

## 06 在 postgres 中如何查看慢查询语句

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/209)

## 07 如何得知一条 SQL 执行的时长？

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/210)

## 08 如何判断当前环境时移动端还是PC端

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/211)

判断 `navigator.userAgent`，对于 Android/iPhone 可以匹配以下正则

``` js
const appleIphone = /iPhone/i;
const appleIpod = /iPod/i;
const appleTablet = /iPad/i;
const androidPhone = /\bAndroid(?:.+)Mobile\b/i; // Match 'Android' AND 'Mobile'
const androidTablet = /Android/i;
```

当然，不要重复造轮子，推荐一个库: <https://github.com/kaimallea/isMobile>

``` js
import isMobile from 'ismobilejs'

const mobile = isMobile()
```

## 09 React hooks 中 useCallback 的使用场景是什么

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/212)

## 10 在 postgres/mysql 中如何判断当前版本是多少

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/213)

使用 `select version()`

postgres 示例如下:

``` sql
postgres@db:school> select version()
+---------------------------------------------------------------------------------------+
| version                                                                               |
|---------------------------------------------------------------------------------------|
| PostgreSQL 12.1 on x86_64-pc-linux-musl, compiled by gcc (Alpine 8.3.0) 8.3.0, 64-bit |
+---------------------------------------------------------------------------------------+
SELECT 1
Time: 0.028s
```

mysql 示例如下：

``` sql
> select version()
+-------------+
| version()   |
|-------------|
| 5.6.16-log  |
+-------------+
1 row in set
Time: 0.003s
```

## 11 什么是隔离级，都有哪些隔离级

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/214)

隔离级事关并发事务的隔离机制，ANSI SQL 中定义了四种隔离级，分别是

+ Read Uncommited
+ Read Committed
+ Repetable Read
+ Serializable

## 12 input 中监听值的变化是在监听什么事件

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/215)

可以**实时**监听值的变化的事件有以下几种

+ keypress
+ keydown
+ keyup
+ input

注: `onChange` 无法做到实时监听，因为 onChange 需要失去焦点才能触发

## 13 什么是跨域，如何解决跨域问题

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/216)

### 跨域

协议，域名，端口，三者有一不一样，就是跨域

#### 如何解决跨域

目前有两种最常见的解决方案：

1. CORS，在服务器端设置几个响应头
1. Reverse Proxy，在 nginx/traefik/haproxy 等反向代理服务器中设置为同一域名


## 14 你对未来的工作有什么期待

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/217)

## 15 你对未来的三年规划和五年规划是什么样的

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/218)

## 16 当你入职后发现压力过大怎么办

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/219)

## 17 工作中你有没有很佩服的人

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/220)

## 18 请简述一下 event loop

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/221)

## 19 作为技术负责人，你每天的工作是什么样的

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/222)

## 20 数据库中如何查看当前的连接数

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/223)

## 21 数据库查询如何更好地利用数据库缓存进行优化

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/224)

## 22 误操作了一个 delete from 语句，如何恢复数据

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/225)

## 23 你相比去年，有哪些成长

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/226)

## 24 数据库死锁是怎么产生的

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/227)

多个事务对资源的交替顺序访问，如

事务1，访问A表，A表锁住，访问B表，此时B表却被事务2锁住，等待
事务2，访问B表，B表锁住，访问A表，此时A表却被事务1锁住，等待

由此观之，此死锁出现的条件极为苛刻

1. 并发，产生多个事务
1. 顺序，对相同资源的不同顺序访问 (干嘛要不同顺序呀)
1. 时机，恰好两个事物都刚刚走完了第一步

[更多示例](https://www.cnblogs.com/wezheng/p/8366029.html)

## 25 你如何看待996

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/228)

## 26 如何实现一个 flatMap 函数 (头条)

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/229)

## 27 在数据库中一个字段如果是字符串类型的，那应该设置哪种数据类型

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/230)

以下答案仅说明在 postgres 中的情况：

在 postgres 有三种 `varchar`，`char` 以及 `text`，其中三者没有性能差异，见官方文档

> Different from other database systems, in PostgreSQL, there is no performance difference among three character types. In most situation, you should use text or varchar, and varchar(n) if you want PostgreSQL to check for the length limit

所以，选择 `text` 是最好的方案

## 28 如何裁剪图片 (情景：选择头像)

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/231)

## 29 你周末都喜欢做些什么

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/232)

打篮球，看电影，看不下书怎么办

## 30 当有大量的文本库时，如何做一个字云

<blockquote> 更多描述: 如果对去重的每个字都做计数的话，会不会性能过差 </blockquote>

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/233)

## 31 一个关于并发更新的事务以及隔离级的问题

<blockquote> 更多描述: 当多并发场景下有以下事务执行 (计数器自增)，会出现什么问题

``` sql
begin;

-- select count from counter;

update counter set count = count + 1 where id = 1;

commit;
``` </blockquote>

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/234)

如果在 pg 下:

如果隔离级为 RC，则多个事务在更新同一行时，会受到阻塞 (Row Lock)
如果隔离级为 RR，则多个事务在更新同一行时，会报错

```
could not serialize access due to concurrent update
```

mysql 未测试

## 32 以下 SQL 语句会有什么问题 (悲观锁)

<blockquote> 更多描述: 一个计数器，自增一

``` sql
begin;
select count from user;

-- 根据以上 SQL 查询出来的 count 来进行自增
-- 如果在此次事务中，已有多次事务对 count 进行了多次更改怎么办？
update user set count = $count + 1 where id = 1;
commit;
``` </blockquote>

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/235)

在并发情况下会出现问题，先查看本次事务的流程

1. 查询当前计数 -> 此时为 10
1. 对当前计数自增 -> 此时为 11？**在自增时，有可能被多并发的其它事务已经自增到 100 了，此时若设置为 11，肯定有问题**

**如何解决？**

要在第一步时加锁，同一时间只放行一个事务，可以设置分布式锁和悲观锁

+ **分布式锁** (redis)：`SET LOCK_KEY RANDOM_VALUE EX 100 NX`
+ **悲观锁**：`select count from user for update`

## 33 useEffect 中如何使用 async/await

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/236)

`useEffect` 的回调参数无法返回 `Promise`，因此无法使用 `async/await`，此时可以选择再包装一层函数

``` jsx
async function fetchMyAPI() {
  let response = await fetch('api/data')
  response = await res.json()
  dataSet(response)
}

useEffect(() => {
  fetchMyAPI();
}, []);
```

## 34 主域名的 SEO 是否比二级域名要更好

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/237)

## 35 以下代码，koa 会返回什么数据

<blockquote> 更多描述: 根据有无 `await next()` 判断以下代码输出结果

``` js
const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  ctx.body = 'hello, 1'
})

app.use(ctx => {
  ctx.body = 'hello, 2'
})

app.listen(3000)
```

``` js
const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  ctx.body = 'hello, 1'
  await next()
})

app.use(ctx => {
  ctx.body = 'hello, 2'
})

app.listen(3000)
```

``` js
const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  await next()
  ctx.body = 'hello, 1'
})

app.use(ctx => {
  ctx.body = 'hello, 2'
})

app.listen(3000)
``` </blockquote>

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/238)

根据 koa 的洋葱模型，返回结果是

```
hello, 1

hello, 2

hello, 1
```

## 36 什么是服务雪崩，如何避免

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/239)

## 37 Node 如何进行进程间通信 

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/240)

对于 spawn/fork 出来的父子进程来说，可以通过 pipe 的方式

+ `process.on('message')`/`process.send`
+ `stdin.on/stdout.write`

对于并无相关的进程

+ `socket`
+ `message queue`

## 38 如何实现一个 async/await 

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/241)

## 39 如何使用 async/await 实现 Promise.all 的效果

<blockquote> 更多描述: 如获取三个用户的信息，使用 `Promise.all` 的写法

``` js
const users = await Promise.all(getUser(1), getUser(2), getUser(3))
```

那如何不使用 `Promise.all` 实现以上效果 </blockquote>

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/242)

使用 `async`/`await` 实现

``` js
const user1 = getUser(1)
const user2 = getUser(2)
const user3 = getUser(3)

const u1 =  await user1
const u2 =  await user2
const u3 =  await user3
```

## 40 有没有用过 continuous local storage，用在了哪里

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/244)

## 41 有没有遇到 js 捕捉不到异常堆栈信息的情况

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/245)

## 42 Promise 在异步资源的生命周期 (async_hooks) 中是如何被销毁的

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/246)

## 43 有没有用过 Promise.allSettled() ，它是干什么的

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/247)

## 44 谈谈你对微服务的理解，试着画一个脑图

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/248)

## 45 在 node 中如何监听异步资源的生命周期

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/249)

## 46 测试中 TDD 与 BDD 有什么区别

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/250)

## 47 使用 js 实现一个 lru cache

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/251)

## 48 刚刚启动了一个服务，如何知道这个服务对应的端口号是多少

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/252)

## 49 node --max-old-space-size=4096 是什么意思

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/253)

## 50 https 中如何保证证书是可信任的

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/254)

## 51 cookie 有哪些字段

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/255)

+ path
+ domain
+ key
+ value
+ httpOnly

## 52 进程与线程的区别是什么

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/256)

## 53 图片防盗链原理是什么

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/257)

请求头中的 refer 来判断是否屏蔽图片

## 54 如何理解 Node 的异步非阻塞IO

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/258)

## 55 爬虫中如何实现一个调度器

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/259)

## 56 如何实现一个分布式的爬虫

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/260)

可以通过 redis 实现一个分布式的 url 调度器 (Set)，多个分布式爬虫的爬取器从调度器中统一取地址进行爬取

## 57 爬虫如何实现一个去重器

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/261)

## 58 如何实现单点登录

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/262)

一张来 [单点登录原理与简单实现](https://images2015.cnblogs.com/blog/797930/201612/797930-20161203152650974-276822362.png) 的图

![](https://images2015.cnblogs.com/blog/797930/201612/797930-20161203152650974-276822362.png)

## 59 当写爬虫时，因爬取过多被禁掉 IP 怎么解决

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/263)

可以维护一个 IP 地址池，通过 Proxy 的方式去爬取网页

## 60 当一个排期五天的任务需要在两天后上线如何解决

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/264)

## 61 你们项目的测试覆盖率是怎么做的

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/265)

## 62 当 Node 应用发生 gc 时，如何监控

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/266)

## 63 Node 应用中如何查看 gc 的日志

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/267)

通过开启参数 `--trace-gc` 与 `--trace-gc-verbose`

``` bash
$ node --trace-gc index.js

[10711:0x3507b20]    36425 ms: Mark-sweep 28.6 (48.2) -> 19.3 (46.7) MB, 3.9 / 0.0 ms  (+ 10.4 ms in 8 steps since start of marking, biggest step 6.9 ms, walltime since start of marking 77 ms) (average mu = 0.997, current mu = 0.997) finalize incremental marking via task GC in old space requested
[10711:0x3507b20]    36434 ms: Scavenge 21.0 (46.7) -> 5.7 (46.7) MB, 1.0 / 0.0 ms  (average mu = 0.997, current mu = 0.997) allocation failure
[10711:0x3507b20]    36494 ms: Scavenge 21.1 (46.7) -> 6.2 (46.7) MB, 2.3 / 0.0 ms  (average mu = 0.997, current mu = 0.997) allocation failure
[10711:0x3507b20]    36562 ms: Scavenge 21.1 (46.7) -> 6.0 (46.7) MB, 2.8 / 0.0 ms  (average mu = 0.997, current mu = 0.997) allocation failure
```


## 64 bind 与 call/apply 的区别是什么

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/268)

他们都是绑定 this 的，但是

1. `bind` 返回函数
1. `call/apply` 直接执行函数

## 65 CSP 是干什么用的了

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/269)

## 66 你如何看待 serverless

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/270)
