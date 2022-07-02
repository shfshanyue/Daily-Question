# lsof

`lsof`，`list open files`，打印打开的文件列表。

在 linux 中，一切皆是文件。比如 unix socket 等网络资源，tty 等等。

``` bash
$ lsof
```

## less README.md

当我们使用 less 打开文件 `react/README.md` 时，`README.md` 文件被打开，那除此之外还有哪些文件被打开呢？

我们进行试验。

``` bash
# 首先通过 less 打开 React 目录下的文件
$ less READEME.md

# 通过 ps 查询关键词，得到 pid 为 312902
$ ps -ef | grep README
root      312902  312816  0 19:49 pts/4    00:00:00 less README.md
root      312906  312324  0 19:49 pts/5    00:00:00 grep --color=auto README
```

通过 `lsof -p` 可指定 pid，查询某一进程所打开的文件。

是不是打开文件多地吓你一跳？

> 关于 tty/pts 可参考 [概述Linux TTY/PTS的区别](https://www.jb51.net/article/176264.htm)

``` bash
$ lsof -p 312902
COMMAND    PID USER   FD   TYPE DEVICE SIZE/OFF    NODE NAME
less    312902 root  cwd    DIR  253,1     4096  930709 /home/train/Documents/react
less    312902 root  rtd    DIR  253,1     4096       2 /
less    312902 root  txt    REG  253,1   192040 2362796 /usr/bin/less
less    312902 root  mem    REG  253,1  3167872 2361275 /usr/lib64/libc-2.28.so
less    312902 root  mem    REG  253,1   187496 2361215 /usr/lib64/libtinfo.so.6.1
less    312902 root  mem    REG  253,1   278512 2361267 /usr/lib64/ld-2.28.so
less    312902 root    0u   CHR  136,4      0t0       7 /dev/pts/4
less    312902 root    1u   CHR  136,4      0t0       7 /dev/pts/4
less    312902 root    2u   CHR  136,4      0t0       7 /dev/pts/4
less    312902 root    3r   CHR    5,0      0t0    1058 /dev/tty
less    312902 root    4r   REG  253,1     5201  930819 /home/train/Documents/react/README.md
```

## 网络信息

`lsof -i` 拥有强大的网络连接查询的能力，语法如下。

``` bash
$ lsof -i [46][protocol][@hostname|hostaddr][:service|port]
```

``` bash
# 列出所有连接
$ lsof -i
COMMAND      PID   USER   FD   TYPE  DEVICE SIZE/OFF NODE NAME
NetworkMa    774   root   22u  IPv4   20682      0t0  UDP train:bootpc->192.168.0.254:bootps
chronyd      791 chrony    6u  IPv4   18216      0t0  UDP localhost:323
chronyd      791 chrony    7u  IPv6   18217      0t0  UDP localhost:323
sshd        1535   root    5u  IPv4   22140      0t0  TCP *:ssh (LISTEN)
sshd        1535   root    6u  IPv6   22142      0t0  TCP *:ssh (LISTEN)
hostguard   6098   root    5u  IPv4  190752      0t0  TCP train:50280->100.125.2.73:https (ESTABLISHED)
docker-pr 298152   root    4u  IPv4 1165463      0t0  TCP *:webcache (LISTEN)
docker-pr 298159   root    4u  IPv6 1164475      0t0  TCP *:webcache (LISTEN)
docker-pr 298174   root    4u  IPv4 1162128      0t0  TCP *:https (LISTEN)
docker-pr 298181   root    4u  IPv6 1162131      0t0  TCP *:https (LISTEN)
docker-pr 298195   root    4u  IPv4 1164494      0t0  TCP *:http (LISTEN)
docker-pr 298201   root    4u  IPv6 1162146      0t0  TCP *:http (LISTEN)

# 仅仅列出 IPv4 连接
$ lsof -i4

# 列出 8080 且为 TCP 的连接
$ lsof -iTCP:8080

# 列出 8080 的连接
$ lsof -i:8080

# 列出某一 IP 的连接
$ lsof -i@192.168.0.18

# 列出状态为 ESTABLISHED 的 TCP 连接
$ lsof -i -sTCP:ESTABLISHED
```

## 作业

1. 如何快速杀掉某个端口的进程
2. 如何列出所有监听的端口号
3. 文件都有哪些类型

