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
```

## useradd

添加一个用户。

``` bash
# 添加用户名为 shanyue，密码为 xxxxxx
$ useradd shanyue -p xxxxxx

# 切换为用户 shanyue
$ su shanyue

# 查看此时的 id
$ id
uid=1000(shanyue) gid=1000(shanyue) groups=1000(shanyue)
```

添加的第一个用户 uid 一般为 1000。

因此在 Dockerfile 中指定用户时，一般指定 uid 为 1000。

``` bash
$ addgroup -g 1000 node && adduser -u 1000 -G node -s /bin/sh -D node
```

以上命令见 node 的 [Dockerfile](https://github.com/nodejs/docker-node/blob/main/16/alpine3.16/Dockerfile#L5)。

## 用户相关文件

+ `/etc/passwd`: 用户
+ `/etc/shadow`: 用户密码
+ `/etc/group`: 用户组
+ `/etc/gshadow`: 用户组管理员信息

``` bash
# 用户名:密码:UID:GID:说明:主目录:shell
$ cat /etc/passwd
root:x:0:0:root:/root:/bin/zsh
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
sync:x:5:0:sync:/sbin:/bin/sync
sshd:x:74:74:Privilege-separated SSH:/var/empty/sshd:/sbin/nologin
tcpdump:x:72:72::/:/sbin/nologin
train:x:1000:1000::/home/train:/bin/bash
shanyue:x:1001:1001::/home/shanyue:/bin/bash
```