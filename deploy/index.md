# 专栏介绍

> 为了更深入理解前端部署，我们将从最原始的部署方案过渡到 Docker 与 Kubernetes，逐步进行优化，并使用 CICD 完善工程质量及部署效率。

你们公司的前端是如何进行部署的？很多人对前端部署感到陌生。

一方面，这些事情与业务无关，也很少有人注意到。另一方面，即便注意到，前端部署一般交给前端负责人或运维同学来负责，也很少有权限接触到相关事项。即使身在大厂，前端部署高度封装，仅需点点点即可完成部署，很多人对其中原理也难以捕捉。

实际上我们对于前端的部署，就是对其静态资源的服务。本专栏通过使用 nodejs 写一个简单的静态服务器，来简单理解前端部署。接下来本专栏将引导你使用 Docker 部署，并优化镜像、优化 Pipieline，一步一步探索前端部署优化及发展，并以单页应用为例进行实践部署。

![大纲](https://static.shanyue.tech/images/22-05-18/deploy.2b4547.webp)

## 文字与视频内容

本专栏维护在我的 Github 仓库 [Daily-Question](https://github.com/shfshanyue/Daily-Question)，若有错别字或者疑问可向我提交 PR/Issue。

而在我的网站大厂面试每日一题的[前端部署十五章](https://q.shanyue.tech/deploy/)专栏中，拥有更好的阅读体验。

为了更好的理解与操作，我在哔哩哔哩也录制了相应的视频合集，见 [前端部署视频合集](https://www.bilibili.com/video/BV1AY4y1671e/)，若有疑问可直接在视频下方进行评论。

## 前置知识

本专栏需要您了解一些前置知识，如 docker/docker-compose/traefik/cicd 等基础用法。

在学习本专栏过程中，您可以随时查阅文档，在文章涉及到的相关配置，会指明具体配置所对应的文档地址。

本专栏尽量做到图文轻松阅读便于理解，并有**代码示例保障能真实跑得起来**。

1. 每段代码都可运行
1. 每篇文章都可实践
1. 每次实践都有示例

示例代码开源，置于 Github 中，演示如何对真实项目进行部署上线。

+ [simple-deploy](https://github.com/shfshanyue/simple-deploy): 了解最简单的部署，不涉及打包等内容。
+ [cra-deploy](https://github.com/shfshanyue/cra-deploy): 了解如何部署单页应用，这里以 [create-react-app](https://github.com/facebook/create-react-app) 为例，但实际上所讲述东西与 React 无关，仅与单页应用有关。

本专栏分为以下若干篇，其中前三篇以[simple-deploy](https://github.com/shfshanyue/simple-deploy)作为示例项目，而余下若干篇以[cra-deploy](https://github.com/shfshanyue/cra-deploy)作为示例项目。

## 你会学到什么

1. 更加了解前端部署方案，并可独立部署个人应用到域名
1. 更加了解自己公司的前端部署方案，并发现其中的不足
1. 更加了解如何使用 Docker 优化前端部署
1. 更加了解如何使用对象存储云服务，并对其进行时间与空间的优化
1. 更加了解如何使用 CICD 优化 Pipeline 时间，并压缩每次部署时间，敏捷开发，快速迭代

## 适宜人群

1. 身在小公司，对前端部署好奇，并有权限进行部署上升级
1. 身在大公司，对运维知识好奇，但无权限窥得前端部署流程
1. 想进一步扩展自己的技术宽度的前端
1. 想将个人应用部署到个人服务器并发布

## 作者简介

山月，前端开发工程师，目前在 Bilibili 作为 UP 主[免费前端模拟面试](https://q.shanyue.tech/mock/)。

同时也是以下网站的站长:

+ [大厂面试每日一题](https://q.shanyue.tech)，包含诸多大厂面试真题以及面经。
+ [一纸简历](https://cv.devtool.tech)，以 Markdown 格式书写简历，包含诸多简历内容模板与样式模板。
+ [开发者武器库](https://devtool.tech/)，包含诸多小工具，比如压缩图片、个人图床等小工具

可添加我的微信 **shanyue-bot** 与我交流。

![](https://static.shanyue.tech/images/22-05-18/clipboard-8626.a61f42.webp)

