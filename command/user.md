# 用户

Linux 为多用户系统，允许多个用户同时登录。

## whoami

打印当前用户名

``` bash
$ whoami
root
```

## id

打印当前用户 ID 及用户组 ID

``` bash
$ id
uid=0(root) gid=0(root) groups=0(root)

# -u: --user，打印 userId
# -n: --name，打印 userId 所对应的用户名
$ id -un
root
```

## who

打印出当前有哪些用户在登录状态。

``` bash
$ who -H
root     pts/0        Jun 16 22:28 (172.16.3.2)
shanyue  pts/1        Jun 16 22:58 (172.16.3.4)
```

以上输入表示:

1. 当前有两个用户登录，一个是 root，一个是 shanyue
2. root IP 地址为 `172.16.3.2`，在 `pts/0` 的 tty 登录

在日常工作中，可使用 `who -uH` 命令。

``` bash
# -u: 打印出登录用户的 IDLE/PID。
# -H: 打印标头
$ who -uH
NAME     LINE         TIME         IDLE          PID COMMENT
train    pts/0        Jun 17 08:25   .         27455 (118.73.226.42)
root     pts/1        Jun 17 08:29 00:23       27595 (118.73.226.42)
```

`IDLE` 表示当前用户已经处于不活跃状态多长时间，`.` 代表当前仍在活跃状态。比如以上输出表示 root 用户已经 23 分钟无活跃状态。

## w

一个比 `who -uH` 更好用的，可查看有几人登录的工具。

``` bash
$ w
 09:19:02 up 2 days, 18:14,  3 users,  load average: 0.00, 0.00, 0.00
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
train    pts/0    118.73.226.42    08:25    7:02   0.05s  0.05s -bash
root     pts/1    118.73.226.42    08:29   12:46   0.01s  0.00s less
root     pts/2    118.73.226.42    09:12    3.00s  0.00s  0.00s w

$ who -uH
NAME     LINE         TIME         IDLE          PID COMMENT
train    pts/0        Jun 17 08:25 00:07       27455 (118.73.226.42)
root     pts/1        Jun 17 08:29 00:12       27595 (118.73.226.42)
root     pts/2        Jun 17 09:12   .         27998 (118.73.226.42)
```

## last

打印出该服务器的历史登录用户。

``` bash
# -n: 列出最近 10 此
$ last -n 10
root     pts/2        118.73.226.42    Fri Jun 17 09:12   still logged in
root     pts/1        118.73.226.42    Fri Jun 17 08:29   still logged in
train    pts/0        118.73.226.42    Fri Jun 17 08:25   still logged in
train    pts/2        61.149.240.111   Fri Jun 17 00:26 - 00:31  (00:05)
train    pts/2        61.149.240.111   Thu Jun 16 23:19 - 00:24  (01:04)
train    pts/1        118.73.121.227   Thu Jun 16 22:58 - 01:32  (02:33)
train    pts/0        118.73.121.227   Thu Jun 16 22:48 - 01:32  (02:44)
root     pts/0        118.73.121.227   Thu Jun 16 22:44 - 22:48  (00:03)
train    pts/1        118.73.121.227   Thu Jun 16 22:40 - 22:44  (00:04)
root     pts/0        118.73.121.227   Thu Jun 16 22:40 - 22:44  (00:04)

wtmp begins Mon Feb 14 09:05:39 2022
```

前三行表示，IP 地址在远程服务器上有三个用户，三个 shell 窗口。

分析可知，由于是同一个 IP 地址，所以实际上有可能是一个人。这代表一个人在终端开了三个 shell 窗口链接了远程服务器。

## 作业

1. 如何查出当前服务器上有多少个登录用户
1. 如何查出某天服务器上有多少个登录用户


<!-- ## useradd -->

<!-- 添加一个用户。 -->

<!-- ``` bash -->
<!-- # 添加用户名为 shanyue，密码为 xxxxxx -->
<!-- $ useradd shanyue -p xxxxxx -->

<!-- # 切换为用户 shanyue -->
<!-- $ su shanyue -->

<!-- # 查看此时的 id -->
<!-- $ id -->
<!-- uid=1000(shanyue) gid=1000(shanyue) groups=1000(shanyue) -->
<!-- ``` -->

<!-- 添加的第一个用户 uid 一般为 1000。 -->

<!-- 因此在 Dockerfile 中指定用户时，一般指定 uid 为 1000。 -->

<!-- ``` bash -->
<!-- $ addgroup -g 1000 node && adduser -u 1000 -G node -s /bin/sh -D node -->
<!-- ``` -->

<!-- 以上命令见 node 的 [Dockerfile](https://github.com/nodejs/docker-node/blob/main/16/alpine3.16/Dockerfile#L5)。 -->

<!-- ## 用户相关文件 -->

<!-- + `/etc/passwd`: 用户 -->
<!-- + `/etc/shadow`: 用户密码 -->
<!-- + `/etc/group`: 用户组 -->
<!-- + `/etc/gshadow`: 用户组管理员信息 -->

<!-- ``` bash -->
<!-- # 用户名:密码:UID:GID:说明:主目录:shell -->
<!-- $ cat /etc/passwd -->
<!-- root:x:0:0:root:/root:/bin/zsh -->
<!-- bin:x:1:1:bin:/bin:/sbin/nologin -->
<!-- daemon:x:2:2:daemon:/sbin:/sbin/nologin -->
<!-- adm:x:3:4:adm:/var/adm:/sbin/nologin -->
<!-- lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin -->
<!-- sync:x:5:0:sync:/sbin:/bin/sync -->
<!-- sshd:x:74:74:Privilege-separated SSH:/var/empty/sshd:/sbin/nologin -->
<!-- tcpdump:x:72:72::/:/sbin/nologin -->
<!-- train:x:1000:1000::/home/train:/bin/bash -->
<!-- shanyue:x:1001:1001::/home/shanyue:/bin/bash -->
<!-- ``` -->
