## 专栏介绍

> 为了更深入理解前端部署，我们将从最原始的部署方案过渡到 Docker 与 Kubernetes，逐步进行优化，并使用 CICD 完善工程质量及部署效率。

你们公司的前端是如何进行部署的？很多人对前端部署感到陌生。

一方面，这些事情与业务无关，也很少有人注意到。另一方面，即便注意到，前端部署一般交给前端负责人或运维同学来负责，也很少有权限接触到相关事项。即使身在大厂，前端部署高度封装，仅需点点点即可完成部署，很多人对其中原理也难以捕捉。

实际上我们对于前端的部署，就是对其静态资源的服务。本专栏通过使用 nodejs 写一个简单的静态服务器，来简单理解前端部署。接下来本专栏将引导你使用 Docker 部署，并优化镜像、优化 Pipieline，一步一步探索前端部署优化及发展，并以单页应用为例进行实践部署。

![大纲](https://cdn.jsdelivr.net/gh/shfshanyue/assets/2022-02-24/deploy.c0b122.webp)

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

<!-- 大家好，我是山月，这是我最近新开的专栏：**前端部署系列**。包括 Docker、CICD 等内容，大纲图示如下：

![大纲](https://cdn.jsdelivr.net/gh/shfshanyue/assets/2022-02-24/deploy.c0b122.webp)

示例代码开源，置于 Github 中，演示如何对真实项目进行部署上线。

+ [simple-deploy](https://github.com/shfshanyue/simple-deploy): 了解最简单的部署，不涉及打包等内容。
+ [cra-deploy](https://github.com/shfshanyue/cra-deploy): 了解如何部署单页应用，这里以 [create-react-app](https://github.com/facebook/create-react-app) 为例，但实际上所讲述东西与 React 无关，仅与单页应用有关。

**前端部署**系列正在更新: *1*/20。 -->
