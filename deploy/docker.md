# 写给前端的 docker 使用指南

`docker` 使应用部署更加轻量，可移植，可扩展，更好的环境隔离也更大程度地避免了生产环境与测试环境不一致的巨大尴尬。

由于 `docker` 轻便可移植的特点也极大促进了 `CI/CD` 的发展。

## 术语

`docker` 的架构图如下

![docker architecture](https://static.shanyue.tech/images/22-07-13/clipboard-8612.864df1.webp)

> 本图片来自官方文档 [Docker architecture](https://docs.docker.com/get-started/overview/#docker-architecture)

从图中可以看出几个组成部分

+ `docker client`: 即 `docker` 命令行工具
+ `docker host`: 宿主机，`docker daemon` 的运行环境服务器
+ `docker daemon`: `docker` 的守护进程，`docker client` 通过命令行与 `docker daemon` 交互
+ `image`: 镜像，可以理解为一个容器的模板，通过一个镜像可以创建多个容器
+ `container`: 最小型的一个操作系统环境，可以对各种服务以及应用容器化，是镜像的运行实例
+ `registry`: 镜像仓库，存储大量镜像，可以从镜像仓库拉取和推送镜像

## 安装 docker

在本地安装 docker/docker-compose，通过 [Docker Desktop](https://www.docker.com/get-started/) 下载 docker 后，双击安装即可。

![Docker Desktop](https://static.shanyue.tech/images/22-05-31/clipboard-3773.19c457.webp)

如果是个人服务器且为 linux，可参考 [安装 docker](https://docs.docker.com/engine/install/centos/)，它将 `docker` 与 `docker compose` 一并安装。

<!-- ## 镜像加速器

如果拉取镜像网速过慢，可尝试使用镜像加速器。

```bash
# 在 linux 中直接修改 dockerd 配置文件
$ vim /etc/docker/daemon.json
```

在 docker desktop 可图形界面修改配置。

添加阿里云的镜像加速器，阿里云为个人提供了镜像加速服务，可参考 [阿里云官方镜像加速文档](https://help.aliyun.com/document_detail/60750.html)。

```json
{
  "registry-mirrors": ["https://5bic8lua.mirror.aliyuncs.com"]
}
```

重启。 -->

## 底层原理

`docker` 底层使用了一些 `linux` 内核的特性，大概有 `namespace`，`cgroups` 和 `ufs`。

### namespace

`docker` 使用 `linux namespace` 构建隔离的环境，它由以下 `namespace` 组成

+ `pid`: 隔离进程
+ `net`: 隔离网络
+ `ipc`: 隔离 IPC
+ `mnt`: 隔离文件系统挂载
+ `uts`: 隔离hostname
+ `user`: 隔离uid/gid

### control groups

也叫 `cgroups`，限制资源配额，比如某个容器只能使用 `100M` 内存

### Union file systems

`UnionFS` 是一种分层、轻量级并且高性能的文件系统，支持对文件系统的修改作为一次提交来一层层的叠加。`docker` 的镜像与容器就是分层存储，可用的存储引擎有 `aufs`，`overlay` 等。

关于分层存储的详细内容可以查看官方文档 [docker: About storage drivers](https://docs.docker.com/storage/storagedriver/)

## 镜像

镜像是一份用来创造容器的配置文件，而容器可以视作最小型的一个操作系统。

**`docker` 的镜像和容器都使用了 `unionFS` 做分层存储，镜像作为只读层是共享的，而容器在镜像之上附加了一层可写层，最大程度地减少了空间的浪费，详见下图**

![分层存储](https://docs.docker.com/storage/storagedriver/images/sharing-layers.jpg)

> 本图片来自官方文档 [About storage drivers](https://docs.docker.com/storage/storagedriver/#container-and-layers)
> 
> The major difference between a container and an image is the top writable layer.

### 镜像仓库与拉取

大部分时候，我们不需要自己构建镜像，我们可以在[官方镜像仓库 Docker Hub](https://hub.docker.com/explore/)拉取镜像。

可以简单使用命令 `docker pull` 拉取镜像。

拉取镜像后可以使用 `docker inspect` 查看镜像信息，如配置及环境变量等。

``` bash
# 加入拉取一个 node:alpine 的镜像
$ docker pull node:alpine

# 查看镜像信息
$ docker inspect node:alpine

# 列出所有镜像
$ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
node                alpine              f20a6d8b6721        13 days ago         105MB
mongo               latest              965553e202a4        2 weeks ago         363MB
centos              latest              9f38484d220f        8 months ago        202MB
```

### 构建镜像与发布

但并不是所有的镜像都可以在镜像仓库中找到，另外我们也需要为我们自己的业务应用去构建镜像。

使用 `docker build` 构建镜像，**`docker build` 会使用当前目录的 `Dockerfile` 构建镜像**，至于 `Dockerfile` 的配置，参考下节。

``` bash
# -t node-base:10: 指定镜像以及版本号
# .: 指当前路径
$ docker build -t node-base:10 .
```

当构建镜像成功后可以使用 `docker push` 推送到镜像仓库。

## Dockerfile

在使用 `docker` 部署自己应用时，往往需要独立构建镜像。

`docker` 使用 `Dockerfile` 作为配置文件构建镜像，简单看一个 `node` 应用构建的 `dockerfile`。

Dockerfile 的各个指令可参考 [Dockerfile Reference](https://docs.docker.com/engine/reference/builder/)。

``` dockerfile
FROM node:alpine

ADD package.json package-lock.json /code/
WORKDIR /code

RUN npm install --production

ADD . /code

CMD npm start
```

### FROM

基于一个旧有的基础镜像，格式如下。

``` dockerfile
FROM <image> [AS <name>]

# 在多阶段构建时会用到
FROM <image>[:<tag>] [AS <name>]

FROM node:16-alpine
FROM nginx:alpine
```

而以上所述的 node 与 nginx 基础镜像可在[Docker Hub](https://hub.docker.com/)中找到。

需要了解常用的 `alpine`、`node`、`nginx` 基础镜像。

### ADD

把宿主机的文件或目录加入到镜像的文件系统中。

``` dockerfile
ADD [--chown=<user>:<group>] <src>... <dest>

ADD . /code
```

### RUN

在镜像中执行命令，由于 `ufs` 的文件系统，它会在当前镜像的顶层新增一层。

``` dockerfile
RUN <command>

RUN npm run build
```

### CMD

指定容器如何启动。

**一个 `Dockerfile` 中只允许有一个 CMD**

``` dockerfile
# exec form, this is the preferred form
CMD ["executable","param1","param2"] 

# as default parameters to ENTRYPOINT
CMD ["param1","param2"]

# shell form
CMD command param1 param2

CMD npm start
```

## 容器

镜像与容器的关系，类似于代码与进程的关系。

+ `docker run` 创建容器
+ `docker stop` 停止容器
+ `docker rm` 删除容器

### 创建容器

基于 `nginx` 镜像创建一个最简单的容器：启动一个最简单的 http 服务

使用 `docker run` 来启动容器，`docker ps` 查看容器启动状态

``` bash
# 启动 nginx 容器，并在本地 8888 端口进行访问
$ docker run --rm -it --name nginx -p 8888:80 nginx:alpine

$ docker ps -l
CONTAINER ID        IMAGE                COMMAND                  CREATED             STATUS              PORTS                    NAMES
404e88f0d90c        nginx:alpine         "nginx -g 'daemon of…"   4 minutes ago       Up 4 minutes        0.0.0.0:8888->80/tcp     nginx
CONTAINER ID        IMAGE                COMMAND                  CREATED             STATUS              PORTS                    NAMES
```

其中:

<!-- + `-d`: 启动一个 `daemon` 进程 -->
+ `--rm`：当停止容器时自动清楚容器
+ `-it`：可交互式、赋予 tty 的方式
+ `--name`：为容器指定名称
+ `-p host-port:container-port`：宿主机与容器端口映射，方便容器对外提供服务
+ `nginx:alpine`：基于该基础镜像创建容器

此时在宿主机使用 `curl` 测试容器提供的服务是否正常

``` bash
$ curl localhost:8888
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

那如果要进入容器环境中呢？使用 `docker exec -it container-name` 命令

``` bash
$ docker exec -it nginx sh
/ #
/ #
/ #
```

### 容器管理

`docker ps` 列出所有容器

``` bash
$ docker ps
CONTAINER ID        IMAGE                COMMAND                  CREATED             STATUS              PORTS                    NAMES
404e88f0d90c        nginx:alpine         "nginx -g 'daemon of…"   4 minutes ago       Up 4 minutes        0.0.0.0:8888->80/tcp     nginx
498e7d74fb4f        nginx:alpine         "nginx -g 'daemon of…"   7 minutes ago       Up 7 minutes        80/tcp                   lucid_mirzakhani
2ce10556dc8f        redis:4.0.6-alpine   "docker-entrypoint.s…"   2 months ago        Up 2 months         0.0.0.0:6379->6379/tcp   apolloserverstarter_redis_1
```

`docker port` 查看容器端口映射

``` bash
$ docker port nginx
80/tcp -> 0.0.0.0:8888
```

`docker stats` 查看容器资源占用 

``` bash
$ docker stats nginx
CONTAINER ID        NAME                CPU %               MEM USAGE / LIMIT     MEM %               NET I/O             BLOCK I/O           PIDS
404e88f0d90c        nginx               0.00%               1.395MiB / 1.796GiB   0.08%               632B / 1.27kB       0B / 0B             2
```

### 容器测试

如果某时某个容器出现问题，可直接进入容器内部进行调试。

``` bash
$ docker exec -it <container_name>
```

## docker compose

在 docker compose v2 中，使用了 `docker compose` 命令去替代了 `docker-compose` 命令，可以通过 docker compose version 查看版本号。

> 尽管目前 docker compose 最新版本为 v2，但是在本系列专栏中还是使用 v1 进行演示，自行替换即可。

``` bash
$ docker compose version
Docker Compose version v2.6.0

# 如果是 v1 版本，则需要通过 docker-compose 查看命令
$ docker-compose version
docker-compose version 1.29.2, build 5becea4c
docker-py version: 5.0.0
CPython version: 3.7.10
OpenSSL version: OpenSSL 1.1.0l  10 Sep 2019
```

在 2022 年 4 月 26 号，compose v2 已经成为了正式版本。更多见 [Announcing Compose V2 General Availability](https://www.docker.com/blog/announcing-compose-v2-general-availability/)

``` bash
# 使用 docker compose ls，可列出系统全局有多少容器是根据 docker compose 启动，比 v1 版本方便很多
$ docker compose ls
NAME                STATUS              CONFIG FILES
cra-deploy          running(1)          /home/train/Documents/cra-deploy/domain.docker-compose.yaml
traefik             running(1)          /home/train/Documents/traefik/docker-compose.yml
```

在当前目录，新建配置文件为 `docker-compose.yaml`，内容如下。

``` yaml
version: "3"
services:
  app:
    image: "nginx:alpine"
    ports:
      - 8000:80
```

此时可通过 `docker compose up` 启动容器。

## 作业

1. 了解 docker 常见操作，如构建镜像、运行容器、进入容器执行命令
1. 如何进入 docker 容器中进行调试
1. 使用 docker 启动 nginx 容器，并在本地浏览器某端口可直接打开
1. 如何得知启动 nginx 容器的 IP 端口
1. 了解 docker 原理，如何模拟 docker 隔离环境及限制资源
1. Dockerfile、Image、Container 有何区别 
1. Dockerfile 中 CMD 与 RUN 有何区别
