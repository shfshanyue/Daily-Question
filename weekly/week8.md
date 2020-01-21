# 日问周刊 | 全栈面试汇总 | 第八期

+ [第一期](https://github.com/shfshanyue/Daily-Question/blob/master/weekly/week1.md)
+ [第二期](https://github.com/shfshanyue/Daily-Question/blob/master/weekly/week2.md)
+ [第三期](https://github.com/shfshanyue/Daily-Question/blob/master/weekly/week3.md)
+ [第四期](https://github.com/shfshanyue/Daily-Question/blob/master/weekly/week4.md)
+ [第五期](https://github.com/shfshanyue/Daily-Question/blob/master/weekly/week5.md)
+ [第六期](https://github.com/shfshanyue/Daily-Question/blob/master/weekly/week6.md)
+ [第七期](https://github.com/shfshanyue/Daily-Question/blob/master/weekly/week7.md)

我在 github 上新建了一个仓库 [日问](https://github.com/shfshanyue/Daily-Question)，每天一道面试题，有关前端，后端，devops以及软技能，促进职业成长，敲开大厂之门，欢迎交流

并且记录我的面试经验

+ [17年面试记(阿里百度美团头条小米滴滴)](https://q.shanyue.tech/interviews/2017.html)
+ [18年面试记(头条)](https://q.shanyue.tech/interviews/2018.html)
+ [19年面试记(阿里头条)](https://q.shanyue.tech/interviews/2019.html)

## 分类

### 计算机与编程基础

[计算机网络](https://q.shanyue.tech/base/network/) | 
[算法与数据结构](https://q.shanyue.tech/base/algorithm/) | 
[操作系统](https://q.shanyue.tech/base/os/) |
[Linux基础](https://q.shanyue.tech/base/linux/) |
[http](https://q.shanyue.tech/base/http/) | 
[vim](https://q.shanyue.tech/base/vim/) | 
[git](https://q.shanyue.tech/base/git/)

### 前端

[CSS](https://q.shanyue.tech/fe/css/) |
[Javascript](https://q.shanyue.tech/fe/js/) |
[html](https://q.shanyue.tech/fe/html/) |
[React](https://q.shanyue.tech/fe/react/) |
[Vue](https://q.shanyue.tech/fe/vue/) |
[Webpack](https://q.shanyue.tech/fe/webpack/) |
[前端工程化](https://q.shanyue.tech/fe/前端工程化/)

### 后端

[后端基础](https://q.shanyue.tech/server/server/) |
[数据库](https://q.shanyue.tech/server/db/) |
[Redis](https://q.shanyue.tech/server/redis/) |
[微服务架构](https://q.shanyue.tech/server/micro-service/)

### DevOps

[DevOps](https://q.shanyue.tech/devops/devops/) |
[Docker](https://q.shanyue.tech/devops/docker/) |
[kubernetes](https://q.shanyue.tech/devops/k8s/)

### 开放式问题

[开放式问题](http://q.shanyue.tech/open/open/)

### 历史记录

[查看所有问题](https://q.shanyue.tech/weekly/history.html)

## http 响应头中的 Date 与 Last-Modified 有什么不同，网站部署时需要注意什么

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/142)

`LM-Factor` 与它俩有关。

简而言之，一个静态资源没有设置 `Cache-Control` 时会以这两个响应头来设置强制缓存时间，而非直接进行协商缓存。在涉及到 CDN 时，表现更为明显，体现在更新代码部署后，界面没有更新。

## react hooks 中如何模拟 componentDidMount

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/143)

在 `useEffect`，把第二个参数即依赖的状态，设置为 `[]`
 
``` js
useEffect(callback, [])
```

## docker-compose 部署 docker 时，如何把宿主机的环境变量注入到容器中

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/144)

## http 1.1 中的 keep-alive 有什么作用

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/145)

在 `http 1.1` 中，在响应头中设置 `keep-alive` 可以在一个 TCP 连接上发送多个 http 请求

1. 避免了重开 TCP 连接的开销
1. 避免了刷新时重新建立 SSL 连接的开销
1. 避免了QPS过大时，服务器的连接数过大

在服务器端使用响应头开启 `keep-alive`

``` bash
Connection: Keep-Alive
Keep-Alive: timeout=5, max=1000
```

## 如何判断端口是否可达

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/146)

使用 `nc`，`-z` 指测试接口连通性

``` bash
nc -vz localhost 443
```

## 如果使用 SSR，可以在 created/componentWillMount 中访问 localStorage 吗

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/147)

不可以，created/componentWillMount 时，还未挂载，代码仍然在服务器中执行，此时没有浏览器环境，因此此时访问 localStorage 将会报错

## 当在浏览器中看到某资源使用了 http2 后，使用 curl 为什么看到的仍是 http 1.1

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/148)

## 关于 JSON，以下代码输出什么

更多描述: ``` js
const obj = {
  a: 3,
  b: 4,
  c: null,
  d: undefined,
  get e () {}
}

console.log(JSON.stringify(obj))
```

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/149)

``` js
{"a":3,"b":4,"c":null}
```

对重中的 `null`，`function` 将在 `JSON.stringify` 时会忽略掉

## 什么是队首阻塞，如何解决，原理如何

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/150)

## redis 中 zset 是什么，用作什么应用场景

> 在 Issue 中交流与讨论: [Issue 地址](https://github.com/shfshanyue/Daily-Question/issues/151)

`SortedSet`，有序集合，一般可以有两种用途

1. 排行榜，TOP N 之类
1. 优先级消息队列
