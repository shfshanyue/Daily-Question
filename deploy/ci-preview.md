# Preview and Environments

关于 Preview，我在前几篇文章提到过几次，**即每一个功能分支都配有对应的测试环境**。

> PS: 如果不了解 Preview 的话，可以看看我在 [cra-deploy](https://github.com/shfshanyue/cra-deploy) 的一个 [PR #21](https://github.com/shfshanyue/cra-deploy/pull/21)。
>
> ![](https://cdn.jsdelivr.net/gh/shfshanyue/assets/2022-01-13/clipboard-1458.98c150.webp)

项目研发的从开发到上线，一般可以可以划分为三个环境

1. `local`：本地环境，把项目 git clone 到自己的工作笔记本或者开发机中，在 `localhost:8080` 类似的地址进行调试与开发。此时环境的面向对象主要是开发者。
1. `dev`：测试环境，本地业务迭代开发结束并交付给测试进行功能测试的环境，在 `dev.shanyue.tech` 类似的二级域名进行测试。此时环境的面向对象主要是测试人员。
1. `prod`：生产环境，线上供用户使用的环境，在 `shanyue.tech` 类似的地址。此时环境的面向对象主要是用户。

这里我们增加一个功能分支测试环境，对应于 `feature` 分支。每个 `feature` 分支都会有一个环境，一个特殊的测试环境。如对功能 `feature-A` 的开发在 `feature-A.cra.dev.shanyue.tech` 进行测试。

本篇文章将实践对 [cra-deploy](https://github.com/shfshanyue/cra-deploy) 的 `feature-preview` 分支部署在 `feature-preview.cra.shanyue.tech` 中作为示例。

**那实现多分支环境部署？**

## 基于 docker/compose 进行部署

回忆之前关于部署的章节内容，我们可以根据以下 `docker-compose.yaml` 进行部署，并配置为 `cra.shanyue.tech`。

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

则仔细一思索，不难得出 docker-compose 的解决方案。

1. 对不同分支根据分支名配置不同的 service
1. 对每个 service 根据分支名配置响应的 `labels`

回忆之前关于 CI 的章节内容，我们在构建服务器中，**可通过环境变量获取到当前仓库的当前分支**，我们基于分支名称进行功能分支环境部署。

假设 `COMMIT_REF_NAME` 为指向当前分支名称的环境变量，如此

``` yaml
version: "3"
services:
  cra-preview-${COMMIT_REF_NAME}:
    build:
      context: .
      dockerfile: router.Dockerfile
    labels:
       # 配置域名: Preview
       - "traefik.http.routers.cra-preview-${COMMIT_REF_NAME}.rule=Host(`${COMMIT_REF_NAME}.cra.shanyue.tech`)"
       - traefik.http.routers.cra-preview-${COMMIT_REF_NAME}.tls=true
       - traefik.http.routers.cra-preview-${COMMIT_REF_NAME}.tls.certresolver=le

# 一定要与 traefik 在同一网络下
networks:
  default:
    external:
      name: traefik_default
```

大功告成，但还有一点问题: `在 Service Name 上无法使用环境变量`。

``` bash
$ docker-compose -f preview.docker-compose.yaml up
WARNING: The COMMIT_REF_NAME variable is not set. Defaulting to a blank string.
ERROR: The Compose file './preview.docker-compose.yaml' is invalid because:
Invalid service name 'cra-app-${COMMIT_REF_NAME}' - only [a-zA-Z0-9\._\-] characters are allowed
```

## docker-compose.yaml 中的环境变量替换

在 `docker-compose.yaml` 中不支持将 `Service` 作为环境变量，因此 `docker-compose up` 启动容器失败。

我们可以写一段脚本将文件中的环境变量进行替换，但完全没有这个必要，**因为有一个内置于操作系统的命令 `envsubst` 专职于文件内容的环境变量替换**。

> PS: 如果系统中无自带 `envsubst` 命令，可使用[第三方 envsubst](https://github.com/a8m/envsubst) 进行替代。

注意，以下命令中的 `COMMIT_REF_NAME` 环境变量为当前分支名称，可通过 git 命令获取。而在 CI 当中，可直接通过 CI 相关环境变量获得，无需通过命令。

``` bash
$ cat preview.docker-compose.yaml | COMMIT_REF_NAME=$(git rev-parse --abbrev-ref HEAD) envsubst
version: "3"
services:
  cra-preview-feature-preview:
    build:
      context: .
      dockerfile: router.Dockerfile
    labels:
       # 配置域名: Preview
       - "traefik.http.routers.cra-preview-master.rule=Host(`cra.master.shanyue.tech`)"
       - traefik.http.routers.cra-preview-master.tls=true
       - traefik.http.routers.cra-preview-master.tls.certresolver=le

# 一定要与 traefik 在同一网络下
networks:
  default:
    external:
      name: traefik_default

# 将代理文件进行环境变量替换后，再次输出为 temp.docker-compose.yaml 配置文件
$ cat preview.docker-compose.yaml | COMMIT_REF_NAME=$(git rev-parse --abbrev-ref HEAD) envsubst > temp.docker-compose.yaml

# 根据配置文件启动容器服务
$ docker-compose -f temp.docker-compose.yaml up --build
```

## environment

在我们实施了 Preview/Production 后，我们希望可以看到在 PR 的评论或者其它地方可以看到我们的部署地址。这就是 **Environtment**。

+ [Github Actions: environment](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idenvironment)
+ [Using environments for deployment](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)

在 CI 中配置 `environment` 为期望的部署地址，则可以在每次部署成功后，便可以看到其地址。

``` yaml
environment:
  name: review/$COMMIT_REF_NAME
  url: http://$COMMIT_REF_NAME.cra.shanyue.tech
```

![](https://cdn.jsdelivr.net/gh/shfshanyue/assets/2022-02-04/clipboard-4252.4ac063.webp)

而在 Github 中，你甚至可以看到每个 Environment 的部署历史。

![Deployment History](https://cdn.jsdelivr.net/gh/shfshanyue/assets/2022-02-04/clipboard-9131.f7971f.webp)

## 基于 CICD 的多分支部署

在 CICD 中可根据环境变量获取当前分支名，详情可参考上一篇文章: [CI 中的环境变量](./ci-env.md)。

在 Gitlab CI 中可以通过环境变量 `CI_COMMIT_REF_SLUG` 获取，*该环境变量还会做相应的分支名替换*，如 `feature/A` 到 `feature-a` 的转化。

在 Github Actions 中可以通过环境变量 `GITHUB_REF_NAME`/`GITHUB_HEAD_REF` 获取。

> `CI_COMMIT_REF_SLUG`: $CI_COMMIT_REF_NAME lowercased, shortened to 63 bytes, and with everything except 0-9 and a-z replaced with -. No leading / trailing -. Use in URLs, host names and domain names.

> [Github Actions Default Environment Variables](https://docs.github.com/en/actions/learn-github-actions/environment-variables#default-environment-variables)

以下是一个基于 `github actions` 的多分支部署的简单示例:

> PS: 该 CI 配置位于 [cra-deploy/preview.yaml](https://github.com/shfshanyue/cra-deploy/blob/master/.github/workflows/preview.yaml)

``` yaml
# 为了试验，此处作为单独的 Workflow，在实际工作中可 Install -> Lint、Test -> Preview 串行检验
name: Preview

# 执行 CI 的时机: 当 git push 到 feature-* 分支时
on:
  push:
    branches:    
      - feature-*

# 执行所有的 jobs
jobs:
  preview:
    # 该 Job 在自建的 Runner 中执行
    runs-on: self-hosted
    environment:
      # 获取 CICD 中的变量: Context
      # https://docs.github.com/en/actions/learn-github-actions/expressions
      name: preview/${{ github.ref_name }}
      url: https://${{ github.ref_name	}}.cra.shanyue.tech
    steps:
      # 切出代码，使用该 Action 将可以拉取最新代码
      - uses: actions/checkout@v2
      - name: Preview
        run: |
          cat preview.docker-compose.yaml | envsubst > docker-compose.yaml
          docker-compose up --build -d cra-preview-${COMMIT_REF_NAME}
        env:
          COMMIT_REF_NAME: ${{ github.ref_name }}
```

以下是一个基于 `gitlab CI` 的多分支部署的简单示例:

``` yaml
deploy-for-feature:
  stage: deploy
  only:
    refs:
      - /^feature-.*$/
  script:
    # 在 CI 中可直接修改为 docker-compose.yaml，因在 CI 中都是一次性操作
    - cat preview.docker-compose.yaml | envsubst > docker-compose.yaml
    - docker-compose up --build -d
  # 部署环境展示，可在 Pull Request 或者 Merge Request 中直接查看
  environment:
    name: review/$CI_COMMIT_REF_NAME
    url: http://$CI_COMMIT_REF_SLUG.cra.shanyue.tech
```

## 自动 Stop Preview

当新建了一个功能分支，并将它 push 到仓库后，CI 将在测试环境部署服务器将会自动启动一个容器。即便该分支已被合并，然而该分支对应的功能分支测试地址仍然存在，其对应的容器也仍然存在。

而当业务迭代越来越频繁，功能分支越来越多时，将会有数十个容器在服务器中启动，这将造成极大的服务器资源浪费。

当然，我们可以将已经合并到主分支的功能分支所对应的容器进行手动停止，但是不够智能。

我们可以通过 CI 做这件事情: **当 PR 被合并后，自动将该功能分支所对应的 Docker 容器进行关停**。

> PS: 该 CI 配置位于 [cra-deploy/stop-preview.yaml](https://github.com/shfshanyue/cra-deploy/blob/master/.github/workflows/stop-preview.yaml)

> PS2: [Stop Preview 所对应的 Action](https://github.com/shfshanyue/cra-deploy/runs/5066759058?check_suite_focus=true)


``` yaml
# 为了避免服务器资源浪费，每次当 PR 被合并或者关闭时，自动停止对应的 Preview 容器
name: Stop Preview

on:
  pull_request:
    types:
      # 当 feature 分支关闭时，
      - closed

jobs:
  stop-preview:
    runs-on: self-hosted
    steps:
      # - name: stop preview
      #   # 根据 Label 找到对应的容器，并停止服务，因为无需代码，所以用不到 checkout
      #   run: docker ps -f label="com.docker.compose.service=cra-preview-${COMMIT_REF_NAME}" -q | xargs docker stop

      - uses: actions/checkout@v2
      - name: stop preview
        run: |
          cat preview.docker-compose.yaml | envsubst > docker-compose.yaml
          docker-compose stop
        env:
          COMMIT_REF_NAME: ${{ github.head_ref }}
```

## 基于 k8s 的多分支部署

> PS: 本段内容需要对 k8s 有基本概念的了解，比如 `Deployment`、`Pod`、`Service`。可在下一篇章进行了解。

+ Deployment: 对 [cra-deploy](https://github.com/shfshanyue/cra-deploy) 项目的部署视作一个 Deployment
+ Service: 对 [cra-deploy](https://github.com/shfshanyue/cra-deploy) 提供可对集群或外网的访问地址

如此一来

1. 根据分支名作为镜像的 Tag 构建镜像。如 `cra-deploy-app:feature-A`
1. 根据带有 Tag 的镜像，对每个功能分支进行单独的 Deployment。如 `cra-deployment-feature-A`
1. 根据 Deployment 配置相对应的 Service。如 `cra-service-feature-A`
1. 根据 Ingress 对外暴露服务并对不同的 Service 提供不同的域名。如 `feature-A.cra.shanyue.tech`

> 配置文件路径位于 [k8s-preview-app.yaml](https://github.com/shfshanyue/cra-deploy/blob/master/k8s-preview-app.yaml)

``` yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cra-deployment-${COMMIT_REF}
spec:
  selector:
    matchLabels:
      app: cra
  replicas: 3
  template:
    metadata:
      labels:
        app: cra
    spec:
      containers:
      - name: cra-deploy
        image: cra-deploy-app:${COMMIT_REF}
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 80

---

apiVersion: v1
kind: Service
metadata:
  name: cra-service-${COMMIT_REF}
spec:
  selector:
    app: cra
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
```

## deploy 命令的封装

但是无论基于那种方式的部署，我们总是可以在给它封装一层来简化操作，一来方便运维管理，一来方便开发者直接接入。如把部署抽象为一个命令，我们这里暂时把这个命令命名为 `deploy`，`deploy` 这个命令可能基于 `kubectl/heml` 也有可能基于 `docker-conpose`。

该命令最核心 API 如下：

``` bash
$ deploy service-name --host :host
```

假设要部署一个应用 `shanyue-feature-A`，设置它的域名为 `feature-A.dev.shanyue.tech`，则这个部署前端的命令为：

``` bash
$ deploy shanyue-feature-A --host feature-A.dev.shanyue.tech
```

现在只剩下了一个问题：找到当前分支。

## 小结

随着 CICD 的发展、对快速迭代以及代码质量提出了更高的要求，基于分支的分支测试环境则成为了刚需。

对于该环境的搭建，思路也很清晰

1. 借用现有的 CICD 服务，如 `github actions` 或者 `gitlab CI` 获取当前分支信息
1. 借用 Docker 快速部署前端或者后端，根据分支信息启动不同的服务，根据 Docker 启动服务并配置标签
1. 根据容器的标签与当前 Git 分支对前端后端设置不同的域名

另外，这个基于容器的思路不仅仅使用于前端，同样也适用于后端。而现实的业务中复杂多样，如又分为已下几种，这需要在项目的使用场景中灵活处理。

+ `feature-A` 的前端分支对应 `feature-A` 的后端分支环境
+ `feature-A` 的前端分支对应 `develop` 的后端分支环境
+ `feature-A` 的前端分支对应 `master` 的后端分支环境
