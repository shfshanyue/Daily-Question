# 单页应用的路由与持久缓存优化

在上篇文章中，我们介绍了在 Docker 中使用构建缓存与多阶段构建进行优化。

但是在部署单页应用时，仍然有一个问题，那就是客户端路由。

在这篇文章中，将会由 `react-router-dom` 实现一个简单的单页路由，并通过 Docker 进行部署。

> PS: 本项目以 [cra-deploy](https://github.com/shfshanyue/cra-deploy) 仓库作为实践，配置文件位于 [router.Dockerfile](https://github.com/shfshanyue/cra-deploy/blob/master/router.Dockerfile)

## 路由

使用 `react-dom` 为单页应用添加一个路由，由于路由不是本专栏的核心内容，省略掉路由的用法，最终代码如下。

> 源码位于 [cra-deploy/src/App.js](https://github.com/shfshanyue/cra-deploy/blob/master/src/App.js)

``` jsx
import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>当前在 Home 页面</h1>
        <Link to="/about" className="App-link">About</Link>
      </header>
    </div>
  )
}

function About() {
  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>当前在 About 页面</h1>
        <Link to="/" className="App-link">Home</Link>
      </header>
    </div>
  )
}

function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
```

此时拥有两个路由:

1. `/`，首页
1. `/about`，关于页面

## 重新部署，路由出现问题

根据上篇文章的 `docker-compose` 配置文件重新部署页面。

``` bash
$ docker-compose up --build simple
```

此时访问 <http://localhost:4000/about>，将会显示 404。

![404 Not Found](https://static.shanyue.tech/images/22-05-26/clipboard-0368.df3cbf.webp)

其实道理很简单：**在静态资源中并没有 `about` 或者 `about.html` 该资源，因此返回 404 Not Found。而在单页应用中，`/about` 是由前端通过 `history API` 进行控制。**

解决方法也很简单：**在服务端将所有页面路由均指向 `index.html`，而单页应用再通过 `history API` 控制当前路由显示哪个页面。** 这也是静态资源服务器的重写(`Rewrite`)功能。

我们在使用 nginx 镜像部署前端应用时，可通过挂载 nginx 配置解决该问题。

## nginx 的 try_files 指令

在 nginx 中，可通过 try_files 指令将所有页面导向 `index.html`。

``` nginx
location / {
    # 如果资源不存在，则回退到 index.html
    try_files  $uri $uri/ /index.html;  
}
```

此时，可解决服务器端路由问题。

除此之外，我们还可以通过 nginx 配置解决更多问题。

## 长期缓存 (Long Term Cache)

在 CRA 应用中，`./build/static` 目录均由 webpack 构建产生，资源路径将会带有 hash 值。

``` bash
$ tree ./build/static
./build/static
├── css
│   ├── main.073c9b0a.css
│   └── main.073c9b0a.css.map
├── js
│   ├── 787.cf6a8955.chunk.js
│   ├── 787.cf6a8955.chunk.js.map
│   ├── main.a3facdf8.js
│   ├── main.a3facdf8.js.LICENSE.txt
│   └── main.a3facdf8.js.map
└── media
    └── logo.6ce24c58023cc2f8fd88fe9d219db6c6.svg

3 directories, 8 files
```

此时可通过 `expires` 对它们配置一年的长期缓存，它实际上是配置了 `Cache-Control: max-age=31536000` 的响应头。

那为什么带有 hash 的资源可设置长期缓存呢: **资源的内容发生变更，他将会生成全新的 hash 值，即全新的资源路径。**而旧有资源将不会进行访问。

``` nginx
location /static {
    expires 1y;
}
```

<!-- ## 更强的长期缓存与构建配置

1. 
1. 
1. 
1. 
1. 
1. 

+ contenthash
+ chunkhash
+ splitChunks -->

## nginx 配置文件

总结缓存策略如下:

1. 带有 hash 的资源一年长期缓存
1. 非带 hash 的资源，需要配置 Cache-Control: no-cache，**避免浏览器默认为强缓存**

![Cache-Control](https://static.shanyue.tech/images/22-05-26/cache-control.9aa610.webp)

`nginx.conf` 文件需要维护在项目当中，经过路由问题的解决与缓存配置外，最终配置如下:

> 该 nginx 配置位于 [cra-deploy/nginx.conf](https://github.com/shfshanyue/cra-deploy/blob/master/nginx.conf)

``` nginx
server {
    listen       80;
    server_name  localhost;

    root   /usr/share/nginx/html;
    index  index.html index.htm;

    location / {
        # 解决单页应用服务端路由的问题
        try_files  $uri $uri/ /index.html;  

        # 非带 hash 的资源，需要配置 Cache-Control: no-cache，避免浏览器默认为强缓存
        expires -1;
    }

    location /static {
        # 带 hash 的资源，需要配置长期缓存
        expires 1y;
    }
}
```

## Dockerfile 配置文件

此时，在 Docker 部署过程中，需要将 `nginx.conf` 置于镜像中。

修改 `router.Dockerfile` 配置文件如下:

> PS: 该 Dockerfile 配置位于 [cra-deploy/router.Dockerfile](https://github.com/shfshanyue/cra-deploy/blob/master/router.Dockerfile)

``` dockerfile
FROM node:14-alpine as builder

WORKDIR /code

# 单独分离 package.json，是为了 yarn 可最大限度利用缓存
ADD package.json yarn.lock /code/
RUN yarn

# 单独分离 public/src，是为了避免 ADD . /code 时，因为 Readme/nginx.conf 的更改避免缓存生效
# 也是为了 npm run build 可最大限度利用缓存
ADD public /code/public
ADD src /code/src
RUN npm run build

# 选择更小体积的基础镜像
FROM nginx:alpine
ADD nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder code/build /usr/share/nginx/html
``` 

> PS: 该 docker compose 配置位于 [cra-deploy/router.Dockerfile](https://github.com/shfshanyue/cra-deploy/blob/master/router.Dockerfile)

``` yaml
version: "3"
services:
  route:
    build:
      context: .
      dockerfile: router.Dockerfile
    ports:
      - 3000:80
```

使用 `docker-compose up --build route` 启动容器。

+ 访问 <http://localhost:3000> 页面成功。
+ 访问 <http://localhost:3000/about> 页面成功。

## 检验长期缓存配置

访问 <http://localhost:3000> 页面，打开浏览器控制台网络面板。

此时对于**带有** hash 资源， `Cache-Control: max-age=31536000` 响应头已配置。

此时对于**非带** hash 资源， `Cache-Control: no-cache` 响应头已配置。

![查看响应头设置](https://static.shanyue.tech/images/22-05-26/clipboard-1569.785658.webp)

## 百尺竿头更进一步

在前端部署流程中，一些小小的配置能大幅度提升性能，列举一二，感兴趣的同学可进一步探索。

构建资源的优化:

1. 使用 terser 压缩 Javascript 资源
1. 使用 cssnano 压缩 CSS 资源
1. 使用 sharp/CDN 压缩 Image 资源或转化为 Webp
1. 使用 webpack 将小图片转化为 DataURI
1. 使用 webpack 进行更精细的分包，避免一行代码的改动使大量文件的缓存失效

<!-- 网络性能的优化:

1. HTTP2，HTTP2多路复用、头部压缩功能提升网络性能
1. OSCP Stapling，减少浏览器端的 OSCP 查询(可验证证书合法性)
1. TLS v1.3，TLS 握手时间从 2RTT 优化到了 1RTT，并可 0-RTT Resumption
1. HSTS，无需301跳转，直接使用 HTTPS，但更重要的是安全性能
1. Brotli，相对 gzip 更高性能的压缩算法 -->

## 作业

+ 初阶: 挂载 nginx 配置，解决其路由及缓存问题
+ 高阶: 配置 gzip/brotli
+ 面试: 为什么带有 hash 值的资源可设置为长期缓存

## 小结

其实，从这里开始，前端部署与传统前端部署已逐渐显现了天壤之别。

传统的前端部署由运维进行主导，**每次上线都要邮件通知运维该项目前端的上线步骤**，由运维完成，前端对部署的自由度较小。

如 `gzip/brotli` 压缩的开启、`Cache-Control` 等响应头的控制、不同路由的缓存策略，均需告知运维完成，且**很难有版本管理**。

而前端关于部署自由度的延长，体现在以下两个方面:

1. 通过 Docker 对前端进行容器化，再也无需邮件通知运维上线步骤
1. 通过 Docker 与 nginx 配置文件对前端进行 nginx 的配置，一些细小琐碎但与项目强相关的配置无需运维介入

此时，关于如何将前端在 Docker 中进行部署的篇章已经结束，而在工作实践中，往往会将静态资源置于 CDN 中。

那又该如何处理呢？
