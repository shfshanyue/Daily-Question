# 日问周刊 | 全栈面试汇总 | 第七期

> 勤学如春起之苗，不见其增，日有所长；辍学如磨刀之石，不见其损，日有所亏。

我在 github 上新建了一个仓库 [日问](https://github.com/shfshanyue/Daily-Question)，每天至少一个问题。有关全栈，graphql，devops，微服务以及软技能，促进职业成长，欢迎交流。

以诸葛武侯的诫子书与君共勉

> 夫君子之行，静以修身，俭以养德。非澹泊无以明志，非宁静无以致远。夫学须静也，才须学也，非学无以广才，非志无以成学。淫慢则不能励精，险躁则不能治性。**年与时驰，意与日去，遂成枯落，多不接世，悲守穷庐，将复何及！**

+ [第一期](https://github.com/shfshanyue/Daily-Question/blob/master/weekly/week1.md)
+ [第二期](https://github.com/shfshanyue/Daily-Question/blob/master/weekly/week2.md)
+ [第三期](https://github.com/shfshanyue/Daily-Question/blob/master/weekly/week3.md)
+ [第四期](https://github.com/shfshanyue/Daily-Question/blob/master/weekly/week4.md)
+ [第五期](https://github.com/shfshanyue/Daily-Question/blob/master/weekly/week5.md)
+ [第六期](https://github.com/shfshanyue/Daily-Question/blob/master/weekly/week6.md)

## 【Q124】如何保证内网服务的安全性

<blockquote> 更多描述: 如 `gitlab CE` 经常暴露出重大漏洞，而它也只需要在公司内部使用。部署 `gitlab` 时我们如何保证它的安全性 </blockquote>

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/125)

basic auth，digest auth，ip whitelist，vpn

## 【Q125】docker 中如何为每个容器的 cpu/memory 设限，原理是什么

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/126)

## 【Q126】localhost:3000 与 localhost:5000 的 cookie 信息是否共享

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/127)

共享

## 【Q127】vpn 的原理是什么

<blockquote> 更多描述: 当在公司工作时经常需要 vpn 用以连接公司内网，其原理是什么 </blockquote>

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/128)

## 【Q128】构建镜像时，那几个指令会增加镜像层数

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/129)

`RUN`，`ADD`，`COPY`

## 【Q129】shell 中 ${} 与 $() 各是什么意思

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/130)

+ `${}` 变量
+ `$()` 命令

## 【Q130】docker 如何隔离容器与宿主机的时间

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/131)

## 【Q131】在 docker 的容器中，如何访问宿主机的 localhost

<blockquote> 更多描述: 如在宿主机有一个 `mysql` 数据库，在容器中，如何连接数据库 </blockquote>

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/132)

## 【Q132】如何在 docker 中运行 docker

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/133)

## 【Q133】http 响应头中如果 content-type 为 application/octet-stream，则代表什么意思

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/134)

## 【Q134】ssh 的原理是什么

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/135)

## 【Q135】负载均衡有哪几种方式，它们的原理是什么

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/136)

TODO

## 【Q136】http 向 https 做重定向应该使用哪个状态码

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/137)

## 【Q137】js 代码压缩的原理是什么

<blockquote> 更多描述: 我们知道 `javascript` 代码经压缩 (uglify) 后，可以使体积变得更小，那它代码压缩的原理是什么。

如果你来做这么一个功能的话，你会怎么去压缩一段 `js` 代码的体积 </blockquote>

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/138)

https://github.com/mishoo/UglifyJS2

## 【Q138】一个守护进程的创建步骤是什么，如何用 C 语言创建

<blockquote> 更多描述: #50  </blockquote>

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/139)

## 【Q139】在 Node 应用中如何利用多核心CPU的优势

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/140)

使用 `cluster` 模块

[Node 中 cluster 的原理是什么](https://github.com/shfshanyue/Daily-Question/issues/141)

## 【Q140】Node 中 cluster 的原理是什么

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/141)

1. `fork` 子进程
1. `Load Balance`
1. 多进程共享端口

### 相关文章

+ [Node 官方文档: cluster](https://nodejs.org/api/cluster.html)
+ [深入浅出 node cluster](https://juejin.im/post/5c87760fe51d4507534c88e5)
+ [Node.js进阶：cluster模块深入剖析](https://github.com/chyingp/nodejs-learning-guide/blob/master/%E6%A8%A1%E5%9D%97/cluster.md)

## 【Q141】http 响应头中的 Date 与 Last-Modified 有什么不同，网站部署时需要注意什么

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/142)

`LM-Factor` 与它俩有关。

简而言之，一个静态资源没有设置 `Cache-Control` 时会以这两个响应头来设置强制缓存时间，而非直接进行协商缓存。在涉及到 CDN 时，表现更为明显，体现在更新代码部署后，界面没有更新。

> 我是山月，可以加我微信 `shanyue94` 与我交流，备注交流。另外可以关注我的公众号【全栈成长之路】

![如果你对全栈面试，前端工程化，graphql，devops，个人服务器运维以及微服务感兴趣的话，可以关注我](https://shanyue.tech/qrcode.jpg)
