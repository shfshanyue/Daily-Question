# CI 中的环境变量

在以前诸多章节中都会使用到环境变量。比如在 OSS 篇使用环境变量存储云服务的权限。在前端的异常监控服务中还会用到 Git 的 Commit/Tag 作为 Release 方便定位代码，其中 Commit/Tag 的名称即可从环境变量中获取。

而在后续章节还会使用分支名称作为功能测试分支的前缀。

## 环境变量

在 Linux 系统中，通过 `env` 可列出所有环境变量，我们可对环境变量进行修改与获取操作，如 `export` 设置环境变量，`${}` 操作符获取环境变量。

``` bash
$ env
USER=shanyue

$ echo $USER
shanyue

# 或者通过 printenv 获取环境变量
$ printenv USER

$ export USER=shanyue2

$ echo $USER
shanyue2

# 获取环境变量 Name 默认值为 shanyue
$ echo ${NAME:-shanyue}
```

我们在前后端，都会用到大量的环境变量。环境变量可将非应用层内数据安全地注入到应用当中。在 node.js 中可通过以下表达式进行获取。

``` js
process.env.USER
```

## CI 中的环境变量

CI 作为与 Git 集成的工具，其中注入了诸多与 Git 相关的环境变量。以下列举一条常用的环境变量

如 [Github Actions virables](https://docs.github.com/en/actions/learn-github-actions/environment-variables#default-environment-variables) 中

| 环境变量 | 描述 |
| --- | --- |
| `CI` | `true` 标明当前环境在 CI 中 |
| `GITHUB_REPOSITORY` | 仓库名称。例如 `shfshanyue/cra-deploy`. |
| `GITHUB_EVENT_NAME` | 触发当前 CI 的 Webhook 事件名称 |
| `GITHUB_SHA` | 当前的 Commit Id。 `ffac537e6cbbf934b08745a378932722df287a53`. |
| `GITHUB_REF_NAME` | 当前的分支名称。|

如 [Gitlab CI virables](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html) 中

| 环境变量 | 描述 |
| --- | --- |
| `CI` | `true` 标明当前环境在 CI 中 |
| `CI_PROJECT_PATH` | 仓库名称。例如 `shfshanyue/cra-deploy`。 |
| `CI_COMMIT_SHORT_SHA` | 当前的 Commit Short Id。 `ffac53`。 |
| `CI_COMMIT_REF_NAME` | 当前的分支名称。|

1. Commit/Tag 可作为版本号，注入到日志系统与 Sentry 中追踪异常。如，当在异常系统中收到一条报警，查看其 commit/tag 便可定位到从哪次部署开始出现问题，或者哪次代码提交开始出现问题。
1. Branch 可作为 Preview 前缀。

## 在 CI 中设置环境变量

在 Github Actions 中，可通过 `env` 设置环境变量，并可通过 `$GITHUB_ENV` 在不同的 Step 共享环境变量。

``` yaml
# 如何在 Github Actions 中设置环境变量
# https://docs.github.com/en/actions/learn-github-actions/environment-variables
- run: echo $CURRENT_USER
  env:
    CURRENT_USER: shanyue

- name: Check GITHUB_ENV
  run: |
    echo $GITHUB_ENV
    cat $GITHUB_ENV
- run: echo CURRENT_USER=$(echo shanyue) >> $GITHUB_ENV
- run: echo $CURRENT_USER
```

## CI=true

不同的 CI 产品会在构建服务器中自动注入环境变量。

``` bash
$ export CI=true
```

而测试、构建等工具均会根据环境变量判断当前是否在 CI 中，如果在，则执行更为严格的校验。

如 `create-react-app` 中 `npm test` 在本地环境为交互式测试命令，而在 CI 中则直接执行。

在本地环境构建，仅仅警告(Warn) ESLint 的错误，而在 CI 中，如果有 ESLint 问题，直接异常退出。

`create-react-app` 的源码中，使用了以下语句判断是否在 CI 环境中。

``` js
const isCI =
  process.env.CI &&
  (typeof process.env.CI !== 'string' ||
    process.env.CI.toLowerCase() !== 'false');
```

因此，可在本地中通过该环境变量进行更为严格的校验。比如在 git hooks 中。

``` bash
# 可使用该命令，演示在 CI 中的表现
$ CI=true npm run test

$ CI=true npm run build
```

::: v-pre

## 写段 CI 验证下 CI 中的环境变量

![](https://cdn.jsdelivr.net/gh/shfshanyue/assets/2022-01-11/clipboard-9125.9b3a8e.webp)

> PS: 本次 Action 执行结果 [Github Actions Run](https://github.com/shfshanyue/cra-deploy/runs/4771781199?check_suite_focus=true)

为了验证此类环境变量，我们可以通过 CI 进行验证。

另外，在 Github Actions 中还可以使用 `Context` 获取诸多上下文信息，可通过 `${{ toJSON(github) }}` 进行获取。

``` yaml
name: CI Env Check
on: [push]
jobs:
  env:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: echo $CI
      - run: echo $GITHUB_REPOSITORY
      - run: echo $GITHUB_EVENT_NAME
      - run: echo $GITHUB_SHA
      - run: echo $GITHUB_REF_NAME
      - run: echo $GITHUB_HEAD_REF
      - name: Dump GitHub context
        run: echo '${{ toJSON(github) }}'
```

## 一个项目的环境变量管理

一个项目中的环境变量，可通过以下方式进行设置

1. 本地/宿主机拥有环境变量
1. CI 拥有环境环境变量，当然 CI Runner 可认为是宿主机，CI 也可传递环境变量 (命令式或者通过 Github/Gitlab 手动操作)
1. Dockerfile 可传递环境变量
1. docker-compose 可传递环境变量
1. kubernetes 可传递环境变量 (env、ConfigMap、secret)
1. 一些配置服务，如 [consul](https://github.com/hashicorp/consul)、[vault](https://github.com/hashicorp/vault)

而对于一些前端项目而言，可如此进行配置

1. 敏感数据放在 [vault] 或者 k8s 的 [secket] 中注入环境变量，也可通过 Github/Gitlab 设置中进行注入环境变量
1. 非敏感数据可放置在项目目录 `.env` 中维护
1. Git/OS 相关通过 CI 注入环境变量

## 作业

+ 初阶：在 CI 中获取当前分支名
+ 中阶：你们项目中是如何管理环境变量的

## 小结

关于 CI 中的环境变量介绍就到此了，下篇文章将介绍功能分支的 Preview。
