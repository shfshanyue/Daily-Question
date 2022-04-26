# 部署 CRA: Docker 缓存优化技术以及多阶段构建

部署完一个简单页面后，此时对于 Docker 与服务部署也有了简单理解。

终于可以来一个与真实项目接近带有复杂度的项目，以 CRA 部署为例:

**部署一个 [Creact React APP](https://github.com/facebook/create-react-app) 单页应用。**

实际上，即使你们技术栈是 Vue 也无所谓，本系列文章很少涉及 React 相关内容，只要你们项目是单页应用即可。

> PS: 本项目以 [cra-deploy](https://github.com/shfshanyue/simple-deploy) 仓库作为实践，配置文件位于 [simple.Dockerfile](https://github.com/shfshanyue/cra-deploy/blob/master/simple.Dockerfile)

## 单页应用的静态资源

**所有的前端单页应用对于部署，最重要的就是两点:**

1. 静态资源如何构建: 大部分项目都是 `npm run build`。
1. 静态资源目录在哪: 有的项目是 `/dist`，有的项目是 `/build`。**CRA 是 `/build` 目录**。

以下，便是在 cra 中获得静态资源的命令。

``` bash
# 创建一个 cra 应用
$ npx create-react-app cra-deploy

# 进入 cra 目录
$ cd cra-deploy

# 进行依赖安装
$ yarn

# 对资源进行构建
$ npm run build

# ./build 目录为静态资源目录，可使用 tree 命令进行打印
$ tree build -L 2
build
├── asset-manifest.json
├── favicon.ico
├── index.html
├── logo192.png
├── logo512.png
├── manifest.json
├── robots.txt
└── static
    ├── css
    ├── js
    └── media

4 directories, 7 files
```

## Dockerfile

在本地将 CRA 应用跑起来，可通过以下步骤:

``` bash
$ yarn
$ npm run build
$ npx serve -s build
```

将命令通过以下几步翻译为一个 Dockerfile:

1. 选择一个基础镜像。由于需要构建，需要 node 的运行环境，因此选择 node。
1. 将以上几个脚本命令放在 RUN 指令中。
1. 启动服务命令放在 CMD 指令中。

``` dockerfile
FROM node:14-alpine

WORKDIR /code

ADD . /code
RUN yarn && npm run build

CMD npx serve -s build
EXPOSE 3000
```

构建完成。然而还可以针对以下两点进行优化。

1. 构建镜像时间过长，**优化构建时间**
1. 构建镜像大小过大，**优化镜像体积**

## 构建时间优化: 构建缓存

我们注意到，一个前端项目的耗时时间主要集中在两个命令:

1. npm install (yarn)
1. npm run build

在本地环境中，如果没有新的 npm package 需要下载，不需要重新 npm i。

**那 Docker 中是不也可以做到这一点？**

在 Dockerfile 中，对于 `ADD` 指令来讲，如果**添加文件内容的 `checksum` 没有发生变化，则可以利用构建缓存**。

而对于前端项目而言，如果 `package.json/yarn.lock` 文件内容没有变更，则无需再次 `npm i`。

将 `package.json/yarn.lock` 事先置于镜像中，安装依赖将可以获得缓存的优化，优化如下。

``` dockerfile
FROM node:14-alpine as builder

WORKDIR /code

# 单独分离 package.json，是为了安装依赖可最大限度利用缓存
ADD package.json yarn.lock /code/
# 此时，yarn 可以利用缓存，如果 yarn.lock 内容没有变化，则不会重新依赖安装
RUN yarn

ADD . /code
RUN npm run build

CMD npx serve -s build
EXPOSE 3000
```

进行构建时，若可利用缓存，可看到 `CACHED` 标记。

``` bash
$ docker-compose up --build
...
 => CACHED [builder 2/6] WORKDIR /code                                                                            0.0s
 => CACHED [builder 3/6] ADD package.json yarn.lock /code/                                                        0.0s
 => CACHED [builder 4/6] RUN yarn                                                                                 0.0s
...
```

## 构建体积优化: 多阶段构建

我们的目标静态资源，完全不需要依赖于 node.js 环境进行服务化，而 node.js 环境将造成极大的资源浪费。

我们可以使用多阶段构建进行优化，最终使用 nginx 进行服务化。

1. 第一阶段 Node 镜像: 使用 node 镜像对单页应用进行构建，生成静态资源
1. 第二阶段 Nginx 镜像: 使用 nginx 镜像对单页应用的静态资源进行服务化

> 该 Dockerfile 配置位于 [cra-deploy/simple.Dockerfile](https://github.com/shfshanyue/cra-deploy/blob/master/simple.Dockerfile)

``` dockerfile
FROM node:14-alpine as builder

WORKDIR /code

# 单独分离 package.json，是为了安装依赖可最大限度利用缓存
ADD package.json yarn.lock /code/
RUN yarn

ADD . /code
RUN npm run build

# 选择更小体积的基础镜像
FROM nginx:alpine
COPY --from=builder code/build /usr/share/nginx/html
```

## 启动容器

我们将 Dockerfile 命名为 `simple.Dockerfile`

> 该 docker compose 配置位于 [cra-deploy/simple.Dockerfile](https://github.com/shfshanyue/cra-deploy/blob/master/docker-compose.yaml)

``` bash
version: "3"
services:
  simple:
    build:
      context: .
      dockerfile: simple.Dockerfile
    ports:
      - 4000:80
```

使用 `docker-compose up --build simple` 启动容器。

访问 `http://localhost:4000` 页面成功。

## 小结

本篇文章，通过构建缓存与多阶段构建优化了体积和时间，然而还有两个个小问题需要解决:

1. 单页应用的路由配置
1. 单页应用的缓存策略
