## 【Q035】http 常见的状态码有哪些

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/36)

By [jiayankai](https://github.com/jiayankai)
* 1XX 表示消息
* 2XX 表示成功
* 3XX 表示重定向
* 4XX 表示客户端错误
* 5XX 表示服务端错误

##### 常见的状态码

* 200
> 最喜欢见到的状态码，表示请求成功

* 301
> 永久重定向

* 302
> 临时重定向

* 304
> 自上次请求，未修改的文件

* 400
> 错误的请求

* 401
> 未被授权，需要身份验证，例如token信息等等

* 403
> 请求被拒绝

* 404
> 资源缺失，接口不存在，或请求的文件不存在等等

* 500
> 服务器端的未知错误

* 502
> 网关错误

* 503
> 服务暂时无法使用


## 【Q036】http 状态码中 301，302和307有什么区别

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/37)

By [shfshanyue](https://github.com/shfshanyue)
+ 301，Moved Permanently。永久重定向，该操作比较危险，需要谨慎操作：如果设置了301，但是一段时间后又想取消，但是浏览器中已经有了缓存，还是会重定向。
+ 302，Fount。临时重定向，但是会在重定向的时候改变 method: 把 POST 改成 GET，于是有了 307
+ 307，Temporary Redirect。临时重定向，在重定向时不会改变 method


## 【Q050】http 状态码 502 和 504 有什么区别

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/51)

By [sjfkai](https://github.com/sjfkai)
* 502 Bad Gateway
The server was acting as a gateway or proxy and received an invalid response from the upstream server.
收到了上游响应但无法解析

* 504 Gateway Timeout
The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.
上游响应超时


## 【Q079】简述 http 的缓存机制

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/80)

## 【Q081】http proxy 的原理是什么

<blockquote> 更多描述: 如 `webpack-dev-server` 可以设置 proxy，`nginx` 也可以设置 </blockquote>

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/82)

By [shfshanyue](https://github.com/shfshanyue)
todo

## 【Q084】随着 http2 的发展，前端性能优化中的哪些传统方案可以被替代

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/85)

By [shfshanyue](https://github.com/shfshanyue)
1. 雪碧图
1. 资源文件合并

## 【Q085】http2 与 http1.1 有什么不同

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/86)

## 【Q107】什么是 Basic Auth 和 Digest Auth

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/108)

## 【Q108】gzip 的原理是什么

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/109)

By [shfshanyue](https://github.com/shfshanyue)
`gzip` 使用了 `LZ77` 算法与 `Huffman` 编码来压缩文件，重复度越高的文件可压缩的空间就越大。

## 【Q109】可以对图片开启 gzip 压缩吗，为什么

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/110)

By [shfshanyue](https://github.com/shfshanyue)
不需要开启，如果开启的话，有可能使图片变的更大。如果你注意一些网站的 img 资源时，就会发现他们都没有开启 `gzip`

参考: https://webmasters.stackexchange.com/questions/8382/is-gzipping-images-worth-it-for-a-small-size-reduction-but-overhead-compressing

> **Don't use gzip for image or other binary files.**
>
> Image file formats supported by the web, as well as videos, PDFs and other binary formats, are already compressed; using gzip on them won't provide any additional benefit, and can actually make them larger. To compress images, see Optimize images.

## 【Q110】http 的请求报文与响应报文的格式是什么

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/111)

By [shfshanyue](https://github.com/shfshanyue)
以 `nc` 模拟 http 报文如下

``` bash
$ nc www.baidu.com 80
GET / HTTP/1.1
Host: www.baidu.com

HTTP/1.1 200 OK
Accept-Ranges: bytes
Cache-Control: no-cache
Connection: Keep-Alive
Content-Length: 14615
Content-Type: text/html
Date: Tue, 10 Dec 2019 02:48:44 GMT
P3p: CP=" OTI DSP COR IVA OUR IND COM "
P3p: CP=" OTI DSP COR IVA OUR IND COM "
Pragma: no-cache
Server: BWS/1.1
Set-Cookie: BAIDUID=F0FC6B3A056DEA285F51A1F2F8A170BB:FG=1; expires=Thu, 31-Dec-37 23:55:55 GMT; max-age=2147483647; path=/; domain=.baidu.com
Set-Cookie: BIDUPSID=F0FC6B3A056DEA285F51A1F2F8A170BB; expires=Thu, 31-Dec-37 23:55:55 GMT; max-age=2147483647; path=/; domain=.baidu.com
Set-Cookie: PSTM=1575946124; expires=Thu, 31-Dec-37 23:55:55 GMT; max-age=2147483647; path=/; domain=.baidu.com
Set-Cookie: BAIDUID=F0FC6B3A056DEA287CB2B9422E09E30E:FG=1; max-age=31536000; expires=Wed, 09-Dec-20 02:48:44 GMT; domain=.baidu.com; path=/; version=1; comment=bd
Traceid: 1575946124058431156210725656341129791126
Vary: Accept-Encoding
X-Ua-Compatible: IE=Edge,chrome=1

<!DOCTYPE html><!--STATUS OK-->
........内容省略
```

## 【Q111】http 响应头中的 ETag 值是如何生成的

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/112)

By [shfshanyue](https://github.com/shfshanyue)
关于 `etag` 的生成需要满足几个条件

1. 当文件不会更改时，`etag` 值保持不变。所以不能单纯使用 `inode`
1. 便于计算，不会特别耗 CPU。这样子 `hash` 不是特别合适
1. 便于横向扩展，多个 `node` 上生成的 `etag` 值一致。这样子 `inode` 就排除了

关于服务器中 `etag` 如何生成可以参考 [HTTP: Generating ETag Header](https://stackoverflow.com/questions/4533/http-generating-etag-header)

**那么在 `nginx` 中的 `etag` 是如何生成的？**

### nginx 中 ETag 的生成

我在网上找到一些资料与源代码了解到了 `etag` 的计算方法。由 `python` 伪代码表示计算方法如下

``` python
etag = '{:x}-{:x}'.format(header.last_modified, header.content_lenth)
```

源码: [ngx_http_core_modules.c](https://github.com/nginx/nginx/blob/6c3838f9ed45f5c2aa6a971a0da3cb6ffe45b61e/src/http/ngx_http_core_module.c#L1582)

``` c
etag->value.len = ngx_sprintf(etag->value.data, "\"%xT-%xO\"",
                                  r->headers_out.last_modified_time,
                                  r->headers_out.content_length_n)
                      - etag->value.data;
```

**总结：`nginx` 中 `etag` 由响应头的 `Last-Modified` 与 `Content-Length` 表示为十六进制组合而成。**

随手在我的k8s集群里找个 `nginx` 服务测试一下

``` bash
$ curl --head 10.97.109.49
HTTP/1.1 200 OK
Server: nginx/1.16.0
Date: Tue, 10 Dec 2019 06:45:24 GMT
Content-Type: text/html
Content-Length: 612
Last-Modified: Tue, 23 Apr 2019 10:18:21 GMT
Connection: keep-alive
ETag: "5cbee66d-264"
Accept-Ranges: bytes
```

由 `etag` 计算 `Last-Modified` 与 `Content-Length`，使用 `js` 计算如下，结果相符

``` js
> new Date(parseInt('5cbee66d', 16) * 1000).toJSON()
"2019-04-23T10:18:21.000Z"
> parseInt('264', 16)
612
```

### Last-Modified，ETag 与协商缓存

我们知道协商缓存有两种方式

+ `Last-Modified`/`if-Modified-Since`
+ `ETag`/`If-None-Match`

既然在 `nginx` 中 `ETag` 由 `Last-Modified` 和 `Content-Length` 组成，那它便算是一个加强版的 `Last-Modified` 了，那加强在什么地方呢？

** `Last-Modified` 是由一个 `unix timestamp` 表示，则意味着它只能作用于秒级的改变**

那下一个问题：[如果 http 响应头中 ETag 值改变了，是否意味着文件内容一定已经更改](https://github.com/shfshanyue/Daily-Question/issues/113)


## 【Q112】如果 http 响应头中 ETag 值改变了，是否意味着文件内容一定已经更改

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/113)

By [shfshanyue](https://github.com/shfshanyue)
不一定，由服务器中 `ETag` 的生成算法决定。详见 [#112](https://github.com/shfshanyue/Daily-Question/issues/112)

比如 `nginx` 中的 `etag` 由 `last_modified` 与 `content_length` 组成，而 `last_modified` 又由 `mtime` 组成

当编辑文件却未更改文件内容时，或者 `touch file`，`mtime` 也会改变，此时 `etag` 改变，但是文件内容没有更改。

## 【Q116】http 服务中静态文件的 Last-Modified 是根据什么生成的

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/117)

By [shfshanyue](https://github.com/shfshanyue)
一般会选文件的 `mtime`，表示文件内容的修改时间

`nginx` 也是这样处理的，源码见: [ngx_http_static_module.c](https://github.com/nginx/nginx/blob/4bf4650f2f10f7bbacfe7a33da744f18951d416d/src/http/modules/ngx_http_static_module.c#L217)

``` c
    r->headers_out.status = NGX_HTTP_OK;
    r->headers_out.content_length_n = of.size;
    r->headers_out.last_modified_time = of.mtime;
```

关于为什么使用 `mtime` 而非 `ctime`，可以参考 [#116](https://github.com/shfshanyue/Daily-Question/issues/117)

## 【Q117】既然 http 是无状态协议，那它是如何保持登录状态

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/118)

By [shfshanyue](https://github.com/shfshanyue)
通过 cookie 或者 Authorization header 来传递凭证，在服务端进行认证

## 【Q119】https 是如何保证报文安全的

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/120)

## 【Q121】我们如何从 http 的报文中得知该服务使用的技术栈

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/122)

By [shfshanyue](https://github.com/shfshanyue)
一般有两个 response header，有时服务端为了隐蔽自己真实的技术栈会隐蔽这两个字段

+ `X-Powerd-By`
+ `Server`

## 【Q122】在发送 http 请求报文时，Host 是必要的吗

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/123)

By [Gloomysunday28](https://github.com/Gloomysunday28)
是有必要的，因为我们不知道会途径会不会有代理出现， 如果直接到达服务器的话，服务器是可以通过路径知道资源在哪，但是如果通过代理的话，代理无法得知具体服务器是什么地址

## 【Q133】http 响应头中如果 content-type 为 application/octet-stream，则代表什么意思

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/134)

## 【Q136】http 向 https 做重定向应该使用哪个状态码

> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/137)
