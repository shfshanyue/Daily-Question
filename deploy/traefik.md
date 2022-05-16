# 服务编排: 服务发现与 Treafik 网关搭建

通过该专栏的前序文章，我们已经很熟练地在服务器中通过 Docker 进行前端应用的部署。

但如何使它可通过域名对外提供访问呢？

假设你在服务器中，现在维护了 N 个前端应用，起了 N 个容器。但好像，除了使用容器启动服务外，和传统方式并无二致，以前管理进程，现在管理容器。

对，还差一个服务的编排功能。

比如

1. 我使用 docker 新跑了一个服务，如何让它被其它服务所感知或直接被互联网所访问呢？
1. 我使用 docker 跑了 N 个服务，我怎么了解所有的服务的健康状态及路由呢？

这就需要一个基于服务发现的网关建设: [Traefik](https://github.com/traefik/traefik)

## traefik 搭建

[traefik](https://github.com/traefik/traefik) 是一个现代化的反向代理与负载均衡器，它可以很容易地同 Docker 集成在一起使用。每当 Docker 容器部署成功，便可以自动在网络上进行访问。

目前 traefik 在 Github 拥有 36K 星星，可以放心使用。

![](https://cdn.jsdelivr.net/gh/shfshanyue/assets/2022-01-08/clipboard-0525.255635.webp)

配置一下 `docker compose` 可启动 traefik 服务。

``` yaml
version: '3'

services:
  traefik:
    image: traefik:v2.5
    command: --api.insecure=true --providers.docker
    ports:
      - "80:80"
      - "8080:8080"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
```

使用 `docker-compose up` 启动 traefik 后，此时会默认新建一个 `traefik_network` 的网络。这个网络名称很重要，要记住。

![](https://cdn.jsdelivr.net/gh/shfshanyue/assets/2022-01-08/clipboard-5259.7e350b.webp)

## 启动一个任意的服务

启动一个 [whoami](https://hub.docker.com/r/containous/whoami) 的简易版 Web 服务，它将会在页面上打印出一些头部信息。

``` yaml
version: '3'

services:
  # 改镜像会暴露出自身的 `header` 信息
  whoami:
    image: containous/whoami
    labels:
      # 设置Host 为 whoami.docker.localhost 进行域名访问
      - "traefik.http.routers.whoami.rule=Host(`whoami.shanyue.local`)"

# 使用已存在的 traefik 的 network
networks:
  default:
    external:
      name: traefik_default
```

那 `whoami` 服务做了什么事情呢

1. 暴露了一个 `http` 服务，主要提供一些 `header` 以及 `ip` 信息
1. 配置了容器的 `labels`，设置该服务的 `Host` 为 `whoami.shanyue.local`，给 `traefik` 提供标记

此时我们可以通过主机名 `whoami.shanyue.locol` 来访问 `whoami` 服务，我们使用 `curl` 做测试

> PS: `whoami.shanyue.locol` 可以是任意域名，此处仅做测试。如果你拥有个人域名，替换成个人域名后，可在任意互联网处进行访问。

``` bash
# 通过 -H 来指定 Host
$ curl -H Host:whoami.shanyue.local http://127.0.0.1
Hostname: f4b29ed568da
IP: 127.0.0.1
IP: 172.20.0.3
RemoteAddr: 172.20.0.2:42356
GET / HTTP/1.1
Host: whoami.shanyue.local
User-Agent: curl/7.29.0
Accept: */*
Accept-Encoding: gzip
X-Forwarded-For: 172.20.0.1
X-Forwarded-Host: whoami.shanyue.local
X-Forwarded-Port: 80
X-Forwarded-Proto: http
X-Forwarded-Server: 9f108517e2ca
X-Real-Ip: 172.20.0.1
```

服务正常访问。

**此时如果把 `Host` 配置为自己的域名，则已经可以使用自己的域名来提供服务。**

由于本系列文章重点在于部署，因此对于 Traefik 以下两点将不再过多研究

1. 如何配置 https
1. 如何配置 Dashboard

使用以下配置文件，直接配置生效。

## 终极配置文件

终极配置文件已经配置好了 LTS、Access Log 等，但是细节就不讲了，直接上配置。

编辑配置文件 `traefik.toml`，内容如下。

``` toml
[global]
  checkNewVersion = true
  sendAnonymousUsage = true

################################################################
# Entrypoints configuration
################################################################

# Entrypoints definition
#
# Optional
# Default:
[entryPoints]
  [entryPoints.web]
    address = ":80"

    [entryPoints.web.http]
      [entryPoints.web.http.redirections]
        [entryPoints.web.http.redirections.entryPoint]
          to = "websecure"
          scheme = "https"

  [entryPoints.websecure]
    address = ":443"

################################################################
# Traefik logs configuration
################################################################

# Traefik logs
# Enabled by default and log to stdout
#
# Optional
#
[log]

  filePath = "log/traefik.log"

  format = "json"

################################################################
# Access logs configuration
################################################################

# Enable access logs
# By default it will write to stdout and produce logs in the textual
# Common Log Format (CLF), extended with additional fields.
#
# Optional
#
[accessLog]

  # Sets the file path for the access log. If not specified, stdout will be used.
  # Intermediate directories are created if necessary.
  #
  # Optional
  # Default: os.Stdout
  #
  filePath = "log/traefik-access.json"

  # Format is either "json" or "common".
  #
  # Optional
  # Default: "common"
  #
  format = "json"

  [accessLog.fields]
    defaultMode = "keep"

    [accessLog.fields.headers]
      defaultMode = "keep"


################################################################
# API and dashboard configuration
################################################################

# Enable API and dashboard
[api]

  # Enable the API in insecure mode
  #
  # Optional
  # Default: true
  #
  insecure = true

  # Enabled Dashboard
  #
  # Optional
  # Default: true
  #
  dashboard = true

################################################################
# Ping configuration
################################################################

# Enable ping
[ping]

  # Name of the related entry point
  #
  # Optional
  # Default: "traefik"
  #
  # entryPoint = "traefik"

################################################################
# Docker configuration backend
################################################################

# Enable Docker configuration backend
[providers.docker]

  # Docker server endpoint. Can be a tcp or a unix socket endpoint.
  #
  # Required
  # Default: "unix:///var/run/docker.sock"
  #
  # endpoint = "tcp://10.10.10.10:2375"

  # Default host rule.
  #
  # Optional
  # Default: "Host(`{{ normalize .Name }}`)"
  #

  # Expose containers by default in traefik
  #
  # Optional
  # Default: true
  #
  # exposedByDefault = false

[metrics.prometheus]
  buckets = [0.1,0.3,1.2,5.0]
  entryPoint = "metrics"

[certificatesResolvers.le.acme]
  email = "xianger94@qq.com"
  storage = "acme.json"

  [certificatesResolvers.le.acme.tlsChallenge]

  [certificatesResolvers.le.acme.httpChallenge]
    entryPoint = "web"
```

启动容器时，将 `traefik.toml` 挂载到容器当中。

``` yaml
version: '3'

services:
  reverse-proxy:
    image: traefik:v2.5
    ports:
      - "80:80"
      - "443:443"
      - "8080:8080"
    volumes:
      - ./traefik.toml:/etc/traefik/traefik.toml
      - ./acme.json:/acme.json
      - ./log:/log
      - /var/run/docker.sock:/var/run/docker.sock
    container_name: traefik
    env_file: .env
    labels:
      - "traefik.http.routers.api.rule=Host(`traefik.shanyue.local`)"
      - "traefik.http.routers.api.service=api@internal"
```

最终，根据以下命令启动容器。

``` bash
$ touch acme.json
$ chmod 600 acme.json
$ touch .env

$ docker-compose up
```

## 小结

此时，一个反向代理的 Traefix 已经完美配置。当部署一个前端应用后，将会自动实现以下功能:

1. TLS。部署域名将可直接使用 HTTPS 进行访问。
1. AccessLog。会自动收集每个服务的请求日志。
1. 自动收集每个服务的健康状态。
