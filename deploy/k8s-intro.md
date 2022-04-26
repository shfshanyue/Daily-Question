# 使用 k8s 部署

在前边章节中，我们了解了**如何部署容器化的前端应用**，并可通过 CICD 进行自动化部署。

1. 如何进行版本回退
1. 如何进行流量控制

在 `kubernetes` 集群中很容易做到这些事情，**本篇文章中绝大部分为运维所做工作，但前端仍需了解**。

k8s 搭建需要多台服务器，且步骤繁杂，前端开发者很难有条件购买多台服务器。因此山月推荐以下两种途径学习 k8s:

1. 在本地搭建 [minikube](https://minikube.sigs.k8s.io/docs/)
1. 在官网 [Interactive Tutorials](https://kubernetes.io/docs/tutorials/kubernetes-basics/deploy-app/deploy-interactive/) 进行学习，它提供了真实的 minikube 环境
1. Katacoda 的 [Kubernetes Playground](https://www.katacoda.com/courses/kubernetes/playground)

## 术语: Deployment、Service、Pod、RepliaSet

### Pod

Pod 是 k8s 中最小的编排单位，通常由一个容器组成。

### Deployment

Deployment 可视为 k8s 中的部署单元，如一个前端/后端项目对应一个 Deployment。

Deployment 可以更好地实现弹性扩容，负载均衡、回滚等功能。它可以管理多个 Pod，并自动对其进行扩容。

以我们开始的示例项目 `create-react-app` 为例，我们在以前章节通过 `docker-compose` 对其进行了部署。

这次编写一个 `Deployment` 的资源配置文件，在 k8s 上对其部署。

> PS: [kubernetes v1.23 Deployment](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/#deployment-v1-apps)

在部署我们项目之前，先通过 `docker build` 构建一个名称为 `cra-deploy-app` 的镜像。

``` bash
$ docker build -t cra-deploy-app -f router.Dockerfile .

# 实际环节需要根据 CommitId 或者版本号作为镜像的 Tag
$ docker build -t cra-deploy-app:$(git rev-parse --short HEAD) -f router.Dockerfile .
```

我们将配置文件存为 `k8s-app.yaml`，以下是配置文件个别字段释义:

> 配置文件路径位于 [k8s-app.yaml](https://github.com/shfshanyue/cra-deploy/blob/master/k8s-app.yaml)

+ `spec.template`: 指定要部署的 Pod
+ `spec.replicas`: 指定要部署的个数
+ `spec.selector`: 定位需要管理的 Pod

``` yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
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
        image: cra-deploy-app
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 80
```

我们使用 `kubectl apply` 部署生效后查看 `Pod` 以及 `Deployment` 状态。

其中每一个 Pod 都有一个 IP，且应用每次升级后 Pod IP 都会发生该表，那应该如何配置该应用对外访问？

``` bash
$ kubectl apply -f k8s-app.yaml

$ kubectl get pods --selector "app=cra" -o wide
NAME                                READY   STATUS    RESTARTS   AGE    IP
cra-deployment-555dc66769-2kk7p     1/1     Running   0          10m    172.17.0.8
cra-deployment-555dc66769-fq9gd     1/1     Running   0          10m    172.17.0.9
cra-deployment-555dc66769-zhtp9     1/1     Running   0          10m    172.17.0.10

# READY 3/3 表明全部部署成功
$ kubectl get deploy cra-deployment
NAME             READY   UP-TO-DATE   AVAILABLE   AGE
cra-deployment   3/3     3            3           42m
```

从上述命令，列出其中一个 Pod 名是 `cra-deployment-555dc66769-zhtp9`。

其中 `cra-deployment` 是 `Deployment` 名，而该前端应用每次上线升级会部署一个 `Replica Sets`，如本次为 `cra-deployment-555dc66769`。

### Service

`Service` 可通过 `spec.selector` 匹配合适的 Deployment 使其能够通过统一的 `Cluster-IP` 进行访问。

``` yaml
apiVersion: v1
kind: Service
metadata:
  name: cra-service
spec:
  selector:
    # 根据 Label 匹配应用
    app: cra
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
```

根据 `kubectl get service` 可获取 IP，在 k8s 集群中可通过 `curl 10.102.82.153` 直接访问。

``` bash
$ kubectl get service -o wide            
NAME          TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)   AGE   SELECTOR
cra-service   ClusterIP   10.102.82.153   <none>        80/TCP    10m   app=cra

$ curl --head 10.102.82.153
HTTP/1.1 200 OK
Server: nginx/1.21.4
Date: Mon, 14 Feb 2022 04:46:24 GMT
Content-Type: text/html
Content-Length: 644
Last-Modified: Wed, 26 Jan 2022 10:10:51 GMT
Connection: keep-alive
ETag: "61f11e2b-284"
Expires: Mon, 14 Feb 2022 04:46:23 GMT
Cache-Control: no-cache
Accept-Ranges: bytes
```

而且，所有的服务可以通过 `<service>.<namespace>.svc.cluster.local` 进行服务发现。在集群中的任意一个 Pod 中通过域名访问服务

``` bash
# 通过 kebectl exec 可进入任意 Pod 中
$ kubectl exec -it cra-deployment-555dc66769-2kk7p sh

# 在 Pod 中执行 curl，进行访问
$ curl --head cra-service.default.svc.cluster.local
HTTP/1.1 200 OK
Server: nginx/1.21.4
Date: Mon, 14 Feb 2022 06:05:41 GMT
Content-Type: text/html
Content-Length: 644
Last-Modified: Wed, 26 Jan 2022 10:10:51 GMT
Connection: keep-alive
ETag: "61f11e2b-284"
Expires: Mon, 14 Feb 2022 06:05:40 GMT
Cache-Control: no-cache
Accept-Ranges: bytes
```

对外可通过 `Ingress` 或者 `Nginx` 提供服务。

## 回滚

如何进行回滚？

那我们可以对上次版本重新部署一遍。比如在 Gitlab CI 中，我们可以通过点击升级前版本的手动部署按钮，对升级前版本进行重新部署。但是，此时流程有点长。

此时可以使用 `kubectl rollout` 直接进行回滚。

``` bash
$ kubectl rollout undo deployment/nginx-deployment
```

## 小结

本文仅仅是对 k8s 的相关概念做了一个简单的概述，如果寻求更复杂的部署策略可前往[k8s-deployment-strategies](https://github.com/ContainerSolutions/k8s-deployment-strategies)。
