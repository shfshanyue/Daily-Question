# 手写最简静态资源服务器

在所有人入门编程及学习更多编程语言时，敲下的第一行代码是: 输出 `hello, world`。

``` js
console.log('hello, world')
```

初学部署前端，如同学习编程一样，不能一开始就要求将生产环境的项目进行部署要从简单的开始学习。

比如本系列专栏，**先部署一个最简单 HTML 如下所示，只有几行代码，无任何 CSS/Javascript 代码，我称它为hello 版前端应用**。

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

> PS: 本文以 [simple-deploy](https://github.com/shfshanyue/simple-deploy) 仓库作为实践

我们将带着两个疑问，一步一步了解前端部署:

1. 如何手写一个简单的静态资源服务器用以部署前端
1. 为何需要 nginx、docker 等工具辅助前端部署

## HTTP 报文

HTTP 是在互联网中进行数据交互的协议，你可从互联网中拿到文档、图片、音频及视频各种资源。HTTP 可视为 Web 的基石，更是前端的

而最简部署可看做，你向服务器发送一个获取 HTML 资源的请求，而服务端将响应一段 HTML 资源。我们在请求资源的过程中将发送一段请求报文(Request Message)，而服务端返回的 HTML 资源为响应报文(Response Message)。

**我们写一段服务器代码，在 HTTP 响应报文中设置响应体为 HTML，便完成了对极简前端的部署。**

以下是对**hello版前端应用**的真实的 HTTP 请求及响应报文。

> 通过 `curl -vvv localhost:3000` 可获得报文信息。

``` bash
# 请求报文
GET / HTTP/1.1
Host: localhost:3000

# 响应报文
HTTP/1.1 200 OK
Content-Length: 133
Content-Type: text/html; charset=utf-8
Date: Fri, 31 Dec 2021 04:19:14 GMT
Connection: keep-alive
Keep-Alive: timeout=5

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

以下是对**hello版前端应用**的 HTTP 请求及响应报文的图文表示

![](https://cdn.jsdelivr.net/gh/shfshanyue/assets/2022-02-24/simple-deploy.67a117.webp)

好，那接下来我们写一段服务器代码，用以响应 HTML。

## 手写简单静态资源服务器: 响应字符串

作为前端，以我们最为熟悉的 Node 为例，写一段最简单的前端部署服务。该服务监听本地的 3000 端口，并在响应体返回我们的**hello 版前端应用**。

为求简单，我们直接将**hello 版前端应用**以字符串的形式进行响应。

在 Node 中写服务端最重要的内置模块(`builtinModule`)为 [node:http](https://nodejs.org/api/http.html)，通过 `node:` 前缀，可指明其为内置模块，被称作 `Protocol Import`。从而避免了 node 内置模块与第三方模块的命名冲突。

``` js
const http = require('node:http')
```

通过 `http.createServer` 可对外提供 HTTP 服务，而 `res.end()` 可设置 HTTP 报文的响应体。以下是一段 hello 版本的 nodejs 服务。

``` js
const server = http.createServer((req, res) => res.end('hello, world'))
server.listen(3000, () => {
  console.log('Listening 3000')
})
```

我们将**hello 版前端应用**以字符串的方式在代码中进行维护，并通过 `res.end()` 设置其为响应报文的响应体。最终代码如下。

> PS: 该段服务器 nodejs 代码位于 [simple-deploy/server.js](https://github.com/shfshanyue/simple-deploy/blob/master/server.js)

``` js
const http = require('node:http')

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body>
  hello, shanyue. 
</body>
</html>`

const server = http.createServer((req, res) => res.end(html))
server.listen(3000, () => {
  console.log('Listening 3000')
})
```

通过 `node server.js` 启动服务，成功运行。

``` bash
$ node server.js
Listening 3000
```

启动服务后，在浏览器端打开 `localhost:3000`，可查看到响应头及响应体 `hello, shanyue`。

![](https://cdn.jsdelivr.net/gh/shfshanyue/assets/2021-12-31/clipboard-3621.529aef.webp)

**恭喜你，部署成功！**

但是前端静态资源总是以文件的形式出现，我们需对代码进一步优化。

## 手写简单静态资源服务器: 响应文件

当然，部署前端作为**纯静态资源**，需要我们使用文件系统(file system)去读取资源并将数据返回。

在代码中，html 以前以字符串形式进行维护，现在将其置于文件系统中的 `index.html` 中，并通过 nodejs 中文件系统读取文件的相关 API `fs.readFileSync('./index.html')` 进行获取文件内容，代码如下。

``` js
// fs 为内置模块，
const fs = require('node:fs')

// 通过 fs.readFileSync 可读取文件内容
const html = fs.readFileSync('./index.html')
```

我们将**hello 版前端应用**以文件系统的方式进行维护，并通过 `res.end()` 设置其为响应报文的响应体。最终代码如下。

> PS: 该段服务器 nodejs 代码位于 [simple-deploy/server-fs.js](https://github.com/shfshanyue/simple-deploy/blob/master/server-fs.js)

``` js
const http = require('node:http')
const fs = require('node:fs')

// 上段代码这里是一段字符串，而这里通过读取文件获取内容
const html = fs.readFileSync('./index.html')

const server = http.createServer((req, res) => res.end(html))
server.listen(3000, () => {
  console.log('Listening 3000')
})
```

接下来启动代码，成功运行。

``` bash
$ node server-fs.js
Listening 3000
```

当然，对于前端这类纯静态资源，**自己写代码无论从开发效率还是性能而言都是极差的**，这也是我们为何要求助于专业工具 nginx 之类进行静态资源服务的原因所在。

比如将文件系统修改为 `ReadStream` 的形式进行响应将会提升该静态服务器的性能，代码如下。

```js
const server = http.createServer((req, res) => {
  // 此处需要手动处理下 Content-Length
  fs.createReadStream('./index.html').pipe(res)
})
```

因此，有诸多工具专门针对静态资源进行服务，比如 [serve](https://github.com/vercel/serve)，比如 [nginx](https://nginx.org/en/)。

``` bash
$ npx serve .
```

`serve` 是 `next.js` 的母公司 `vercel` 开发的一款静态资源服务器。作为前端久负盛名的静态服务器，广泛应用在现代前端开发中，如在 `create-react-app` 构建成功后，它会提示使用 `serve` 进行部署。本地环境而言，还是 [serve](https://github.com/vercel/serve) 要方便很多啊。

![Creact React APP 构建后，提示使用 serve 进行部署](https://cdn.jsdelivr.net/gh/shfshanyue/assets/2021-12-31/clipboard-3980.619061.webp)

**然而，Javascript 的性能毕竟有限，使用 `nginx` 作为静态资源服务器拥有更高的性能。**

## 部署的简单理解

通过以上两个最简服务的成功运行，可以使我们更加深入的了解前端部署。我们再回头看，什么是部署呢，为什么说你刚才部署成功？

假设此时你有一台拥有公共 IP 地址的服务器，在这台服务器使用 `nodejs` 运行刚才的代码，则外网的人可通过 `IP:3000` 访问该页面。那这可理解为部署，使得所有人都可以访问。

假设你将该服务器作为你的工作环境，通过 `npm start` 运行代码并通过，所有人都可访问他，即可视为部署成功。看来你离所有人都可访问的部署只差一台拥有公共 IP 的服务器。

实际上，有极少数小微企业在生产环境中就是直接 ssh 进生产环境服务器，并通过 `npm start` 部署成功后，通过 IP 与端口号的方式进行访问。当然通过 IP 地址访问的项目一般也非公开项目，如果公开使用域名的话，则用 nginx 配置域名加一层反向代理。

**不管怎么说，你现在已经可以通过裸机(宿主机)部署一个简单的前端应用了。**

## 关于部署的更多疑问解答

我们现在已经可以在本地跑起服务了，但是在生产环境部署为什么还需要 nginx，甚至 docker 呢？

接下来，我回应一些关于前端部署的更多疑问。

### 问: 那既然通过 `npm start` 可以启动服务并暴露端口对外提供服务，那为什么还需要 nginx 呢？

**你需要管理诸多服务(比如A网站、B网站)，通过 nginx 进行路由转发至不同的服务，这也就是反向代理**，另外 TLS、GZIP、HTTP2 等诸多功能，也需要使用 nginx 进行配置。

当然，如果你不介意别人通过端口号去访问你的应用，不用 nginx 等反向代理器也是可以的。

![反向代理](https://cdn.jsdelivr.net/gh/shfshanyue/assets/2022-02-24/Nginx.632fa5.webp)

关于 nginx 的学习可以查看后续章节。

### 问: 我确实不介意别人通过 IP:Port 的方式来访问我的应用，那在服务器可以 npm run dev 部署吗？

**可以，但是非常不推荐**。`npm run dev` 往往需要监听文件变更并重启服务，此处需要消耗较大的内存及CPU等性能。

比如针对 Typescript 写的后端服务器，不推荐在服务器中直接使用 `ts-node` 而需要事先编译的理由同样如此。

当然，如果你也不介意性能问题也是可以的。

### 问: 那为什么需要 Docker 部署？

用以隔离环境。

假设你有三个后端服务，分别用 Java、Go、Node 编写，你需要在服务器分别安装三者的环境，才能运行所有语言编写的代码，这对于开发者而言非常麻烦。

假设你有三个 Node 服务，分别用 node10、node12、node14 编写，你需要在服务器分别安装三个版本 nodejs 才能运行各个版本 nodejs 编写的代码，对于开发者而言也非常麻烦。

而有了 Docker，就没有这种问题，它可单独提供某种语言的运行环境，并同时与宿主机隔离起来。

对于前端而言，此时你可以通过由自己在项目中单独维护 `nginx.conf` 进行一些 nginx 的配置，大大提升前端的自由性和灵活度，而无需通过运维或者后端来进行。

关于 docker 的学习可以查看后续章节。

## 小结

本篇文章介绍了了一些对于前端部署的简单介绍，并使用 nodejs 写了两段代码用以提供静态服务，加深对前端部署的理解。虽然我们可自写代码对前端静态资源进行部署，但从功能性与性能而讲，都是远不如专业工具的。

在本文章，将应用在本地或者宿主机进行成功运行，但是现代流行的前端部署方案，都是使用 docker 对前端进行部署。

而在下篇文章中，我们将介绍如何使用 Docker 将仅有十几行代码的 **hello 版前端应用** 跑起来。
