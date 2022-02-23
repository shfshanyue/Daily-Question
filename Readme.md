# 日问

+ [山月的博客点击这里](https://github.com/shfshanyue/blog)
+ [一日一题官方网站点击这里](https://q.shanyue.tech)
+ [一日一题 bilibili 讲解点击这里](https://account.bilibili.com/account/home)，每天晚上九点十分B站直播讲解面试题。

> 勤学如春起之苗，不见其增，日有所长；辍学如磨刀之石，不见其损，日有所亏。

每天至少一个前端面试题，并附以答案及讨论。每天五分钟，半年大厂中，促进个人职业成长，敲开大厂之门。日问致力做到有问题、有答案、有代码、有视频讲解。

以诸葛武侯的诫子书与君共勉:

> 夫君子之行，静以修身，俭以养德。非澹泊无以明志，非宁静无以致远。夫学须静也，才须学也，非学无以广才，非志无以成学。淫慢则不能励精，险躁则不能治性。**年与时驰，意与日去，遂成枯落，多不接世，悲守穷庐，将复何及！**

## CodeSandbox 示例集

由于在 `CodeSandBox` 无法以收藏夹的方式共享，我把其中涉及到有关代码的示例列举在这里

1. [React.memo 和性能优化](https://codesandbox.io/s/zujianxiasuoyouzizujianhuifashengchongxinxuanran-bv70e)。当某个组件状态更新时，它的所有子组件树将会重新渲染。
1. [React.memo 和记忆化数据](https://codesandbox.io/s/reactmemo-and-memo-1dt59)
1. [React.memo 和 React.useMemo 优化性能](https://codesandbox.io/s/reactmemo-and-reactusememo-79txp)
1. [React.memo 和 React.useCallback 优化性能](https://codesandbox.io/s/reactusecallback-and-perf-d3k6s)
1. [React useEffect cleanup](https://codesandbox.io/s/useeffect-clean-i2fi3?file=/src/App.js)。在这段代码中，示例演示 cleanup 的时机
1. [React 中可以以数组的 index 作为 key 吗?](https://codesandbox.io/s/react-key-shuzudeindex-nl47k)。在这段代码中，使用 index 作为 key，其中夹杂了 input，引发 bug
1. [React 中以数组的 index 作为 key](https://codesandbox.io/s/index-as-key-yichangshili-pfmpk)。在这段代码中，使用 index 作为 key，其中夹杂了随机数，引发了 bug
1. [React 兄弟组件通信](https://codesandbox.io/s/react-xiongdizujiantongxin-f2jf6)。兄弟组件在 React 中如何通信
1. [React 中合成事件](https://codesandbox.io/s/syntheticevent-249x1)。React 中事件为合成事件，你可以通过 `e.nativeEvent` 获取到原生事件，观察 `e.nativeEvent.currentTarget` 你将会发现 React 将所有事件都绑定在了 `#app`(React 应用挂载的根组件)
1. [React 中 input.onChange 的原生事件是什么？](https://codesandbox.io/s/input-onchange-1ybhw)。观察 `e.nativeEvent.type` 可知
1. [React hooks 如何实现一个计数器 Counter](https://codesandbox.io/s/shiyong-react-hooks-ruheshixianyigejishuqi-counter-tc5u1)
1. [React FiberNode 数据结构](https://codesandbox.io/s/fibernode-diaoshixinxi-rqt78)。贯彻 `element._owner` 可知 FiberNode 数据结构
1. [React 点击按钮时自增三次](https://codesandbox.io/s/react-setstate-dianjianniuzizengsanci-b4j29)。此时需使用回调函数，否则会报错
1. [React 不可变数据的必要性](https://codesandbox.io/s/react-bukebianduixiangzhihanshuzujian-zppgm)。
1. [React 不可变数据的必要性之函数组件](https://codesandbox.io/s/react-todo-setstate-bukebianduixiang-r7qof)。当在 React hooks 中 setState 两次为相同数据时，不会重新渲染
1. [React 状态批量更新之事件处理](https://codesandbox.io/s/react-state-pilianggengxin-826iv)。事件处理中的状态会批量更新，减少渲染次数
1. [React 状态批量更新之异步请求](https://codesandbox.io/s/react-state-pilianggengxiner-jzu52)。异步请求中的状态不会批量更新，将会造成多次渲染
1. [React18 状态批量更新](https://codesandbox.io/s/react18-state-pilianggengxin-75ktu)。在 React 18 中所有状态将会批量更新
1. [React capture value](https://codesandbox.io/s/react-capture-value-ft06r)

## Codepen 示例集

+ [前端大厂面试指南](https://codepen.io/collection/MggMed?grid_type=list)

## 特别赞助

[**Apifox: API 文档、API 调试、API Mock、API 自动化测试**](https://www.apifox.cn?utm_source=shanyue-question)

## 大厂内推

添加微信 `shanyue94`，免费大厂内推。

+ [阿里-供应链平台事业部-前端-校招/社招](https://q.shanyue.tech/infer/ali-ascp.html)
+ [字节-视频架构组-前端-社招](https://q.shanyue.tech/infer/toutiao-media-arch.html)
+ [腾讯-CSIG智慧零售-前端-社招](https://q.shanyue.tech/infer/tencent-csig.html)
+ ...

## 大厂面经

### 阿里

+ [16年毕业的前端er在杭州求职ing](https://juejin.im/post/5a64541bf265da3e2d338862)
+ [面试分享：专科半年经验面试阿里前端P6+总结(附面试真题及答案)](https://juejin.im/post/5a92c23b5188257a6b06110b)
+ [三年前端，面试思考（头条蚂蚁美团offer）](https://juejin.im/post/5bd97627f265da39651c0a4b)

更多面经请转至 [大厂面经大全](https://q.shanyue.tech/interviews/fe.html)

### 头条

+ [字节跳动今日头条前端面经（4轮技术面+hr面](https://juejin.im/post/5e6a14b1f265da572978a1d3)
+ [字节跳动 前端校招 一二三面+hr面](https://juejin.im/post/5e61136ee51d4527196d6019)
+ [半年工作经验今日头条和美团面试题面经分享](https://juejin.im/post/5b03e79951882542891913e8)

更多面经请转至 [大厂面经大全](https://q.shanyue.tech/interviews/fe.html)

### 腾讯

+ [腾讯前端面试篇（一）](https://juejin.im/post/5c19c1b6e51d451d1e06c163)
+ [腾讯校招前端三面,虐完继续撸|掘金技术征文](https://juejin.im/post/59c907d46fb9a00a4746e2db)
+ [鹅厂视频部笔试及面试问题整理](https://juejin.im/post/5b2cd3f7e51d4558a75e857a)

更多面经请转至 [大厂面经大全](https://q.shanyue.tech/interviews/fe.html)

<!-- ## 大厂内推与大厂面经推送

如果你想在网站及公众号上发布招聘，请添加我的微信 `shanyue94`，我将与你在以下几个方面进行讨论，并共同拟定模拟面试题在我公众号上发布招聘信息

1. 业务描述，及其业务发展与前景
1. 职位描述，及其技术侧重于偏向 -->

<!-- ## 时间线

+ 2019.11.01 - 添加第一道题
+ 2019.11.04 - 添加 Readme
+ 2019.11.07 - 第1个 star
+ 2019.11.12 - 第8个 star
+ 2019.11.16 - 第16个 star
+ 2019.11.26 - 第32个 star
+ 2019.12.02 - 用周日一天的时间使用 Issues 自动生成了官网
+ 2019.12.03 - 第64个 star
+ 2019.12.05 - 第100道题
+ 2019.12.08 - 第128道题
+ 2021.07-24 - 第666道题 -->

<!-- ## 官方网站

[日问网站](https://q.shanyue.tech) 的技术栈由 `vuepress` + `github GraphQL api` + `github actions` + `alioss` + `alicdn` 组成。具体流程在[如果你只想搭建一个博客](https://shanyue.tech/no-vps/if-you-want-a-blog.html)中可窥一二。

每当创建问题与回答问题时，官网将由 `github actions` 自动构建，并自动部署上线。当然，因为构建以及CDN刷新可能需要一些时间。至于更多的影响因素可以参考问题 [【Q094】你们的前端代码上线部署一次需要多长时间，需要人为干预吗](https://github.com/shfshanyue/Daily-Question/issues/95) -->

## 交流

我是山月，你可以添加微信 `shanyue94` 与我交流，另外欢迎关注我的博客[山月行](https://shanyue.tech/)，我会在其中分享工作中遇到的一些前后端问题以及思考。


社交:

| [Github](https://github.com/shfshanyue) | [知乎](https://www.zhihu.com/people/shfshanyue) | [掘金](https://juejin.cn/user/1556564164489389) | [博客](https://shanyue.tech) | [B站](https://space.bilibili.com/28696526/) |
|-----------------------------------------|-----------------------------------------------|-----------------------------------------------|----------------------------|--------------------------------------------|


项目:

| [极客时间返利](https://geek.shanyue.tech/) | [前端面试每日一题](https://q.shanyue.tech/)      | [诗词集](https://shici.xiange.tech)    |
|------------------------------------|--------------------------------------|-------------------------------------|
| [开发者工具箱](https://devtool.tech)     | [npm 在线执行](https://npm.devtool.tech) | [前端周刊](https://weekly.shanyue.tech) |
| [一纸简历](https://cv.devtool.tech)     | [码途编辑器](https://markdown.devtool.tech) | [云吸一只猫](https://cat.shanyue.tech) |
