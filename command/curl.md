# curl

使用命令行发送请求，比在浏览器输入地址更加方便、也更容易定位问题。

## curl

直接发送请求：

``` bash
$ curl ifconfig.me
118.73.227.215
```

发送 HEAD 请求，只需要返回响应头。

``` bash
$ curl --head https://shanyue.tech
HTTP/2 200
server: Tengine
content-type: text/html; charset=utf-8
content-length: 33229
vary: Accept-Encoding
date: Tue, 21 Jun 2022 05:54:24 GMT
vary: Accept-Encoding
x-oss-request-id: 62B15D1050ED1C32320FE906
x-oss-cdn-auth: success
accept-ranges: bytes
etag: "F540C0D57CDB57215AF11970EF4AAEF6"
last-modified: Wed, 23 Mar 2022 14:57:44 GMT
x-oss-object-type: Normal
x-oss-hash-crc64ecma: 8545542358272103335
x-oss-storage-class: Standard
x-oss-meta-mtime: 1648047444.796073379
cache-control: no-cache
content-md5: 9UDA1XzbVyFa8Rlw70qu9g==
x-oss-server-time: 27
ali-swift-global-savetime: 1655790864
via: cache12.l2cn3051[290,290,200-0,M], cache4.l2cn3051[291,0], kunlun6.cn3145[383,382,200-0,M], kunlun3.cn3145[386,0]
x-cache: MISS TCP_MISS dirn:-2:-2
x-swift-savetime: Tue, 21 Jun 2022 05:54:24 GMT
x-swift-cachetime: 0
timing-allow-origin: *
eagleid: 791d26a916557908641262834e

```

查看发送报文及 TLS handshake 的详细。

``` bash
$ curl -vvv --head https://shanyue.tech
* Rebuilt URL to: https://shanyue.tech/
*   Trying 218.91.183.88...
* TCP_NODELAY set
* Connected to shanyue.tech (218.91.183.88) port 443 (#0)
* ALPN, offering h2
* ALPN, offering http/1.1
* successfully set certificate verify locations:
*   CAfile: /etc/pki/tls/certs/ca-bundle.crt
  CApath: none
* TLSv1.3 (OUT), TLS handshake, Client hello (1):
* TLSv1.3 (IN), TLS handshake, Server hello (2):
* TLSv1.3 (IN), TLS handshake, [no content] (0):
* TLSv1.3 (IN), TLS handshake, Encrypted Extensions (8):
* TLSv1.3 (IN), TLS handshake, [no content] (0):
* TLSv1.3 (IN), TLS handshake, Certificate (11):
* TLSv1.3 (IN), TLS handshake, [no content] (0):
* TLSv1.3 (IN), TLS handshake, CERT verify (15):
* TLSv1.3 (IN), TLS handshake, [no content] (0):
* TLSv1.3 (IN), TLS handshake, Finished (20):
* TLSv1.3 (OUT), TLS change cipher, Change cipher spec (1):
* TLSv1.3 (OUT), TLS handshake, [no content] (0):
* TLSv1.3 (OUT), TLS handshake, Finished (20):
* SSL connection using TLSv1.3 / TLS_AES_256_GCM_SHA384
* ALPN, server accepted to use h2
* Server certificate:
*  subject: CN=shanyue.tech
*  start date: Feb  5 00:00:00 2022 GMT
*  expire date: Feb  6 23:59:59 2023 GMT
*  subjectAltName: host "shanyue.tech" matched cert's "shanyue.tech"
*  issuer: C=US; O=DigiCert Inc; OU=www.digicert.com; CN=Encryption Everywhere DV TLS CA - G1
*  SSL certificate verify ok.
* Using HTTP2, server supports multi-use
* Connection state changed (HTTP/2 confirmed)
* Copying HTTP/2 data in stream buffer to connection buffer after upgrade: len=0
* TLSv1.3 (OUT), TLS app data, [no content] (0):
* TLSv1.3 (OUT), TLS app data, [no content] (0):
* TLSv1.3 (OUT), TLS app data, [no content] (0):
* Using Stream ID: 1 (easy handle 0x55c5a8e24690)
* TLSv1.3 (OUT), TLS app data, [no content] (0):
> HEAD / HTTP/2
> Host: shanyue.tech
> User-Agent: curl/7.61.1
> Accept: */*
>
* TLSv1.3 (IN), TLS handshake, [no content] (0):
* TLSv1.3 (IN), TLS handshake, Newsession Ticket (4):
* TLSv1.3 (IN), TLS handshake, [no content] (0):
* TLSv1.3 (IN), TLS handshake, Newsession Ticket (4):
* TLSv1.3 (IN), TLS app data, [no content] (0):
* Connection state changed (MAX_CONCURRENT_STREAMS == 128)!
* TLSv1.3 (OUT), TLS app data, [no content] (0):
* TLSv1.3 (IN), TLS app data, [no content] (0):
< HTTP/2 200
HTTP/2 200
< server: Tengine
server: Tengine
< content-type: text/html; charset=utf-8
content-type: text/html; charset=utf-8
< content-length: 33229
content-length: 33229
< vary: Accept-Encoding
vary: Accept-Encoding
< date: Tue, 21 Jun 2022 06:02:59 GMT
date: Tue, 21 Jun 2022 06:02:59 GMT
< vary: Accept-Encoding
vary: Accept-Encoding
< x-oss-request-id: 62B15F13F15BB231391FB3A8
x-oss-request-id: 62B15F13F15BB231391FB3A8
< x-oss-cdn-auth: success
x-oss-cdn-auth: success
< accept-ranges: bytes
accept-ranges: bytes
< etag: "F540C0D57CDB57215AF11970EF4AAEF6"
etag: "F540C0D57CDB57215AF11970EF4AAEF6"
< last-modified: Wed, 23 Mar 2022 14:57:44 GMT
last-modified: Wed, 23 Mar 2022 14:57:44 GMT
< x-oss-object-type: Normal
x-oss-object-type: Normal
< x-oss-hash-crc64ecma: 8545542358272103335
x-oss-hash-crc64ecma: 8545542358272103335
< x-oss-storage-class: Standard
x-oss-storage-class: Standard
< x-oss-meta-mtime: 1648047444.796073379
x-oss-meta-mtime: 1648047444.796073379
< cache-control: no-cache
cache-control: no-cache
< content-md5: 9UDA1XzbVyFa8Rlw70qu9g==
content-md5: 9UDA1XzbVyFa8Rlw70qu9g==
< x-oss-server-time: 3
x-oss-server-time: 3
< ali-swift-global-savetime: 1655791379
ali-swift-global-savetime: 1655791379
< via: cache24.l2et15-1[66,66,200-0,M], cache44.l2et15-1[67,0], cache27.cn4056[128,128,200-0,M], cache64.cn4056[130,0]
via: cache24.l2et15-1[66,66,200-0,M], cache44.l2et15-1[67,0], cache27.cn4056[128,128,200-0,M], cache64.cn4056[130,0]
< x-cache: MISS TCP_MISS dirn:-2:-2
x-cache: MISS TCP_MISS dirn:-2:-2
< x-swift-savetime: Tue, 21 Jun 2022 06:02:59 GMT
x-swift-savetime: Tue, 21 Jun 2022 06:02:59 GMT
< x-swift-cachetime: 0
x-swift-cachetime: 0
< timing-allow-origin: *
timing-allow-origin: *
< eagleid: 088432cc16557913793393217e
eagleid: 088432cc16557913793393217e

<
* Connection #0 to host shanyue.tech left intact
```

## jq

``` bash

```