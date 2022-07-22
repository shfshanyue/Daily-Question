# ssh 隧道

当我们在宿主机（个人的 mac、windows 等笔记本）本地进行开发时，只需要在浏览器打开 `localhost`，便可以愉快地进行开发。

当我们在远程服务器中对某一 web 服务进行开发并测试时，我们很难在宿主机本地进行调试。

我们无法在宿主机中访问服务器中的服务。

但，此时可借助于 `ssh 隧道`，将服务器端口号映射到宿主机本地，则可以愉快地将服务器作为开发环境了。

在以下示例中，`local` 为宿主机，`shanyue` 为远程云服务器，可通过 `ssh config` 进行配置，详见上一章。

## ssh -NL

将远程服务器的端口号可在本地进行访问。

``` bash
# 左侧为本地 IP:PORT，右侧为远程服务器 IP:PORT
$ ssh -L [bind_address:]port:host:hostport
```

以下命令将远程服务器中的 `localhost:5000` 映射到本地的 5000 端口，在浏览器中可直接输入 `localhost:5000` 进行开发调试。

**注意此时端口转发成功后，没有任何日志及提示。**

``` bash
# 在远程服务器开启一个 5000 端口号的服务，此时需要 node 环境
shanyue$ npx serve . -p 5000

# 将远程服务器的 5000 端口供本地使用，此时窗口会被占用
# -N: 用以端口转发
# -L: 将服务器中 localhost:5000 映射到本地 5000 端口
local$ ssh -NL 5000:localhost:5000 shanyue

# 此时需要另开一个窗口，用以执行命令
local$ curl localhost:5000
```

> Q：在服务器中安装了 mysql 数据库，我们如何更安全地链接数据库？

## ssh -NR

将本地的端口号可在远程服务器进行访问。

``` bash
# 左侧为远程服务器 IP:PORT，右侧为本地 IP:PORT
$ ssh -R [bind_address:]port:host:hostport
```

以下命令将本地的 `localhost:5000` 映射到远程服务器的 5000 端口。

``` bash
local$ npx serve . -p 5000

local$ ssh -NR 5000:localhost:5000 shanyue

shanyue$ curl localhost:5000
```

如果说 `ssh -NL` 还可以将服务器作为开发服务器进行使用，那 `ssh -NR` 我们有什么使用场景呢？

有，比如环境变量 `HTTP_PROXY`，用以代理 HTTP 服务

``` bash
# 第一步：将本地的代理端口转发到远程服务器，则在远程服务器也可直接使用代理
# 10010：假设 10010 端口可以在本地进行访问
local$ ssh -NR 10010:localhost:10010 shanyue

shanyue$ export HTTP_PROXY=http://127.0.0.1:10010/
```

## 作业

1. 我们如何在本地浏览器访问云服务器的 8080 端口
2. 我们如何通过 ssh 隧道配置远程服务器的 HTTP_PROXY
