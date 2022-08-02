# 基于 docker/docker-compose 对极简项目的部署

本篇文章介绍如何使用 Docker 将一个极简前端页面进行部署，而极简资源内容如下。也就是上篇文章的 **hello 版前端应用**。

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body>
  hello, shanyue. 
</body>
</html>
```

你可以**在本地安装 docker**完成本篇文章的部署实践内容，部署内容与上篇文章一致。在本篇文章之前，你需要先做一些功课:

1. 在本地安装 docker/docker-compose。通过 [Docker Desktop](https://www.docker.com/get-started/) 下载 docker 后，双击安装即可。
1. 了解 [Dockerfile Reference](https://docs.docker.com/engine/reference/builder/)。了解最常见的 FROM/ADD/CMD 即可。不需要全部过一遍，遇到没见过的指令及时查阅即可。
1. 了解 [Compose file Reference](https://docs.docker.com/compose/compose-file/compose-file-v3/)。不需要全部过一遍，遇到没见过的指令及时查阅即可。
1. 了解 [Docker Hub](https://hub.docker.com/)。在该网站，可查找适合于自己的诸多基础镜像，比如 [node](https://hub.docker.com/_/node) 与 [nginx](https://hub.docker.com/_/nginx)。

如果你在此之前没有学习过 Docker，可参照山月以前的文章 [Docker 简易入门](https://shanyue.tech/op/docker.html) 进行学习

> PS: 本项目以 [simple-deploy](https://github.com/shfshanyue/simple-deploy) 仓库作为实践，配置文件位于 [node.Dockerfile](https://github.com/shfshanyue/simple-deploy/blob/master/node.Dockerfile)

## 在本地启动并运行项目

由上篇文章可知，我们主要是将该资源服务化，此时可借助于一个工具 `serve` 进行静态资源服务化。

``` bash
# 将 serve 置于 dependencies 中
$ npm i

# 通过 serve 启动服务
# 可通过 npm scripts 命令封装成 start
$ npx serve .
```

通过 `npm scripts`，将启动服务命令封装成 `npm start`

``` js
{
  start: 'serve .'
}
```

## Dockerfile

一般来说，根据以下三步，可以将脚本命令翻译成 Dockerfile。

1. 选择一个基础镜像。可在 [Docker Hub](https://hub.docker.com/) 中进行查找镜像。由于前端项目依赖于 Node 环境，我们选择 [node:14-alpine](https://hub.docker.com/_/node?tab=description) 作为基础镜像，其中基于轻量操作系统 `alpine`，内置了 `node14`/`npm`/`yarn` 等运行环境。
1. 将以上几个脚本命令放在 RUN 指令中。
1. 启动服务命令放在 CMD 指令中。

翻译如下:

> PS: 该 Dockerfile 配置位于 [simple-deploy/node.Dockerfile](https://github.com/shfshanyue/simple-deploy/blob/master/node.Dockerfile)

``` dockerfile
# 选择一个体积小的镜像 (~5MB)
FROM node:14-alpine

# 设置为工作目录，以下 RUN/CMD 命令都是在工作目录中进行执行
WORKDIR /code

# 把宿主机的代码添加到镜像中
ADD . /code

# 安装依赖
RUN yarn

EXPOSE 3000

# 启动 Node Server
CMD npm start
```

还差两步，就可以将该最简单示例运行起来:

1. 通过 Dockfile 构建镜像 (Image)
1. 通过镜像运行容器 (Container)

## 构建镜像 (Image)

使用 `docker build` 命令可基于 Dockerfile 构建镜像。

镜像构建成功后，我们可以将仓库上传至 Docker 仓库，如 [Docker Hub](https://hub.docker.com/)。而对于业务项目而言，一般会上传至公司内部的私有镜像仓库，比如通过 [harbor](https://github.com/goharbor/harbor) 搭建的私有镜像仓库。

``` bash
# 构建一个名为 simple-app 的镜像
# -t: "name:tag" 构建镜像名称
$ docker build -t simple-app .

# git rev-parse --short HEAD: 列出当前仓库的 CommitId
# 也可将当前 Commit 作为镜像的 Tag
# 如果该前端项目使用 git tag 以及 package.json 中的 version 进行版本维护，也可将 version 作为生产环境镜像的 Tag
$ docker build -t simple-app:$(git rev-parse --short HEAD)

# 构建成功后，可用该命令列出所有的镜像
# 发现该镜像占用体积 133MB
$ docker images
REPOSITORY           TAG         IMAGE ID       CREATED          SIZE
simple-app           latest      c1571917d2c2   17 seconds ago   133MB
```

此时构建镜像成功，通过 `docker images` 可知镜像体积为 **133MB**。记住这个数字，以后优化镜像体积时用得到。

## 运行容器

我们可以基于镜像运行 N 个容器，而本次启动的容器也是我们最终所要提供的静态服务。

``` bash
# 根据该镜像运行容器
# 如果需要在后台运行则添加 -d 选项
# --rm: 当容器停止运行时，自动删除容器
# -p: 3000:3000，将容器中的 3000 端口映射到宿主机的 3000 端口，左侧端口为宿主机端口，右侧为容器端口
$ docker run --rm -p 3000:3000 simple-app

# 运行成功后可在另一个窗口查看所有容器
$ docker ps
CONTAINER ID   IMAGE        COMMAND                  CREATED          STATUS          PORTS                                       NAMES
50784910f758   simple-app   "docker-entrypoint.s…"   20 seconds ago   Up 20 seconds   0.0.0.0:3000->3000/tcp, :::3000->3000/tcp   wizardly_solomon
```

此时在本地访问 `http://localhost:3000` 访问成功

然而，通过冗余繁琐的命令行构建镜像和容器，比如管理端口，存储、环境变量等，有其天然的劣势，不易维护。

## 更高效的方式: docker-compose

![docker-compose](https://static.shanyue.tech/images/22-05-23/docker-compose.0510d8.webp)

将命令行的选项翻译成配置文件，是更为简单且更容易维护的方式。比如对于 webpack 而言，基本上基于 `webpack.config.js` 配置文件使用。

而 `docker compose` 即可将 docker cli 的选项翻译成配置文件，除此之外，它还有更强大的功能。

编辑 `docker-compose.yaml` 配置文件如下所示。当然，由于这是一个最简项目，因此配置文件也极其简单。

> PS: 该 docker compose 配置位于 [simple-deploy/docker-compose.yaml](https://github.com/shfshanyue/simple-deploy/blob/master/docker-compose.yaml)

``` yaml
version: "3"
services:
  app:
    # build: 从当前路径构建镜像
    build: .
    ports:
      - 3000:3000
```

配置结束之后，即可通过一行命令 `docker-compose up` 替代以前关于构建及运行容器的所有命令。

``` bash
# up: 创建并启动容器
# --build: 每次启动容器前构建镜像
$ docker-compose up --build
```

此时在本地访问 `http://localhost:3000` 访问成功

此时，通过 `docker`/`docker-compose` 便部署成功了第一个前端应用。

以下，再介绍一个使用 Docker 的小技巧。

## 构建镜像 RUN 输出查看小技巧

在使用 `docker build` 进行构建时，通过 `RUN` 指令可以通过打印一些关键信息进行调试，

但是，在我们进行 `docker build` 时，无法查看其输出结果。

此时可以通过 `--progress plain` 来查看其输出结果。

``` dockerfile
FROM node:14-alpine

RUN echo shanyue
```

对以上镜像构建，可拿到 `echo shanyue` 的输出结果。

``` bash {8}
$ docker build --progress plain --no-cache .
4 [1/2] FROM docker.io/library/node:14-alpine
4 sha256:4641ddabdab058bf21b1550827533213f023ec21abf1ceb322993c137532f760
4 CACHED

5 [2/2] RUN echo shanyue
5 sha256:37883e3cbc36146a836ad89f3cf147723bcda1d2cf4e97655c9ed1afceb59517
5 0.237 shanyue
5 DONE 0.3s
```

## 作业

1. 通过 docker/docker-compose 将单文件 html 进行部署
2. 你了解如何找到官方 node 镜像的 Dockerfile 吗
3. 我们为什么可以直接在 node 镜像中使用 yarn 命令行工具

## 小结

通过本篇文章，我们已经可以通过 Docker 完成对极简前端项目的部署。

但是，前端静态资源并不需要 nodejs 环境，且 nodejs 镜像较大，我们可以使用 nginx 作为基础镜像来部署前端。
