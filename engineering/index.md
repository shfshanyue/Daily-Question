# 前言

大家好，我是山月。

我将工作中提炼出来的前端工程化相关内容，总结成一本小册，共计六个专题三十八篇文章。

每篇文章控制在四百字左右，大概五分钟即可读完一篇。争取做到有配图、有视频、有代码示例的三有好文章。

由于字数及篇数有限，*该小册仅仅是前端工程化的冰山一角，仅仅使初级前端对工程化有大概了解*。比如以下几处均可深入

1. 该小册打包体积优化篇仅仅只有五篇，而无涉及到 CSS 的优化，比如在 postcss 体系中使用 uncss 去除无用css代码，使用 cssnano 进行css代码压缩。甚至该小册对 css 体系无过多篇幅。
1. 该小册打包体积优化篇涉及到 corejs 处分析，可使用 browserslist 根据所需浏览器版本号仅仅加载必要的 polyfill。但是即使仅仅加载一个 polyfill 空间也占用极大，此处可深入分析。
1. 该小册部署篇虽提及了 Preview，使得每个分支可单独部署环境进行测试。但是关于 AB、Canary 等流量细化分配方案未有涉及。
1. ...

因此，您可以在阅读时进行深入思考，并可通过多测试试验多研究源码解决更深层次的问题。

## 适合人群

该小册内容难度适中偏简单，适合前端工作经验一年以上、五年以下人群阅读。

该小册假设您已经拥有前端及计算机的一些基础知识，部署篇假设您对 Docker 已有了解。

## 请我喝杯咖啡

<!-- ![](./sponsor.png) -->

## 大纲

### 专题一: Bundle 基础设施建设

1. [模块化方案](https://q.shanyue.tech/engineering/475.html)
2. [AST 及其应用](https://q.shanyue.tech/engineering/756.html)
3. [原理与运行时分析](https://q.shanyue.tech/engineering/729.html)
4. [运行时 Chunk 加载分析](https://q.shanyue.tech/engineering/733.html)
5. [加载非JS资源: JSON与图片](https://q.shanyue.tech/engineering/736.html)
6. [加载非JS资源: Style](https://q.shanyue.tech/engineering/737.html)
7. [将脚本注入 HTML 的处理](https://q.shanyue.tech/engineering/735.html)
8. [Hot Module Reload](https://q.shanyue.tech/engineering/79.html)
9. [构建性能优化](https://q.shanyue.tech/engineering/738.html)

### 专题二: 打包体积性能优化

10. [打包体积分析](https://q.shanyue.tech/engineering/755.html)
11. [Javascript 压缩](https://q.shanyue.tech/engineering/138.html)
12. [Tree Shaking](https://q.shanyue.tech/engineering/87.html)
13. [Polyfill: corejs](https://q.shanyue.tech/engineering/734.html)
14. [browserslist 垫片体积控制](https://q.shanyue.tech/engineering/757.html)

### 专题三: Bundless 基础设施建设

15. [原理与浏览器中的 ESM](https://q.shanyue.tech/engineering/752.html)
16. [CommonJS To ESM](https://q.shanyue.tech/engineering/753.html)
17. [Bundless 与生产环境](https://q.shanyue.tech/engineering/758.html)

### 专题四: npm package 开发

18. [semver 与版本管理](https://q.shanyue.tech/engineering/534.html)
19. [main/module/export 入口](https://q.shanyue.tech/engineering/535.html)
20. [dep/devDep 的区别](https://q.shanyue.tech/engineering/521.html)
21. [engines 宿主环境控制](https://q.shanyue.tech/engineering/533.html)
22. [script hooks 及其风险](https://q.shanyue.tech/engineering/740.html)
23. [npm publish 发布第一个包](https://q.shanyue.tech/engineering/754.html)
24. [lockfile 及其影响](https://q.shanyue.tech/engineering/196.html)
25. [package 中的 lockfile](https://q.shanyue.tech/engineering/747.html)

### 专题五: 包管理工具

26. [npm cache](https://q.shanyue.tech/engineering/759.html)
27. [node_modules 拓扑结构](https://q.shanyue.tech/engineering/746.html)
28. [pnpm 的优势](https://q.shanyue.tech/engineering/751.html)

### 专题六: 前端质量保障

29. [CICD](https://q.shanyue.tech/engineering/748.html)
30. [Git Hooks](https://q.shanyue.tech/engineering/741.html)
31. [Audit](https://q.shanyue.tech/engineering/742.html)
32. [Upgrade](https://q.shanyue.tech/engineering/745.html)
33. [ESLint](https://q.shanyue.tech/engineering/744.html)
34. [Package Patch](https://q.shanyue.tech/engineering/760.html)

### 专题七: 前端服务部署

35. [Long Term Cache](https://q.shanyue.tech/engineering/81.html)
36. [Chunk Spliting 与缓存优化](https://q.shanyue.tech/engineering/761.html)
37. [Docker 部署](https://q.shanyue.tech/engineering/749.html)
38. [Docker Preview 部署](https://q.shanyue.tech/engineering/762.html)