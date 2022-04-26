# 将前端应用配置域名

在上一篇文章，我们已成功搭建了 traefik 网关。

回到我们的 `create-react-app` 部署示例，我们如何将此项目可使他们在互联网通过域名进行访问？

我们将它部署到 <https://cra.shanyue.tech> 中作为示例。在此之前，我需要做两件事

1. `cra.shanyue.tech` 域名属于我个人。域名可自行在域名提供商进行购买。
2. `cra.shanyue.tech` 域名通过 A 记录指向搭建好 traefik 网关的服务器的 IP 地址。此处需要通过域名提供商的控制台进行配置。

![](https://cdn.jsdelivr.net/gh/shfshanyue/assets/2022-01-09/clipboard-9961.2a6ea3.webp)
## 启动服务

我们在容器中配置 `labels` 即可配置域名，启动容器域名即可生效。而无需像传统 nginx 方式需要手动去配置 `proxy_pass`。

而在 `traefik`，在 `container labels` 中配置 `traefik.http.routers` 可为不同的路由注册域名。

``` yaml
labels:
  - "traefik.http.routers.cra.rule=Host(`cra.shanyue.tech`)"
```

编辑 `domain.docker-compose.yaml`，配置文件如下。

> PS: 该配置文件位于 [cra-deploy/domain.docker-compose.yaml](https://github.com/shfshanyue/cra-deploy/blob/master/domain.docker-compose.yaml)

``` yaml {9,14}
version: "3"
services:
  domain:
    build:
      context: .
      dockerfile: router.Dockerfile
    labels:
      # 为 cra 配置我们的自定义域名
      - "traefik.http.routers.cra.rule=Host(`cra.shanyue.tech`)"
      # 设置 https，此时我们的 certresolver 为 le，与上篇文章配置保持一致
      - traefik.http.routers.cra.tls=true
      - traefik.http.routers.cra.tls.certresolver=le

networks:
  default:
    external:
      name: traefik_default
```

根据 `docker-compose up` 启动服务，此时可在互联网访问。

``` bash
$ docker-compose -f domain.docker-compose.yaml up domain
```

访问 <https://cra.shanyue.tech> 成功。

## 如何配置多域名

在 nginx 中可以通过 [server_name](https://nginx.org/en/docs/http/server_names.html) 配置多域名。

在 traefik 中通过 `traefik.https.routers` 可配置多域名。

+ cra.shanyue.tech
+ preview.cra.shanyue.tech
+ feature-a.cra.shanyue.tech

``` yaml
labels:
  - "traefik.http.routers.cra.rule=Host(`cra.shanyue.tech`)"
  - "traefik.http.routers.cra-preview.rule=Host(`preview.cra.shanyue.tech`)"
  - "traefik.http.routers.cra-feature-a.rule=Host(`feature-a.cra.shanyue.tech`)"
```

在我们启动 traefik 时，traefik 容器将 `/var/run/docker.sock` 挂载到容器当中。

通过 `docker.sock` 调用 [Docker Engine API](https://docs.docker.com/engine/api/v1.40/#tag/Image) 可将同一网络下所有容器信息列举出来。

``` bash
# 列举出所有容器的标签信息
$ curl --unix-socket /var/run/docker.sock http:/containers/json | jq '.[] | .Labels'
```

## 小结

目前为止，终于将一个前端应用使用域名进行部署。此时除了一些部署知识外，还需要一些服务器资源，包括

1. 一台拥有公网IP地址的服务器
1. 一个自己申请的域名

当然，针对前端开发者而言，更重要的还是

1. 如何使用 docker 将它跑起来
2. 如何将它更快地跑起来
3. **如何自动将它跑起来**

下一篇文章内容便是 CICD 相关。
