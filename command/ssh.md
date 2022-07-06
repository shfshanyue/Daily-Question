# 服务器免密码快捷登录

## 登录服务器: ssh

ssh，`secure shell protocol`，以更加安全的方式连接远程服务器。

把以下 IP 地址替换为你云服务器的公网地址，并提供密码即可登录。

但记住一个 IP 地址，这是一个反人性的操作，如果你有多个服务器需要管理呢？

``` bash
# root: 用户名
# 172.16.3.2: 云服务器 IP 地址，需要把 IP 地址换成个人 IP 地址
$ ssh root@172.16.3.2
```

> Q: 你了解 ssh 协议吗，协议默认的端口号是多少？

## 配置别名快速登录：ssh-config

在本地客户端环境 (个人电脑) 上配置 ssh-config，对自己管理的服务器起别名，可以更方便地登录多台云服务器，以下是关于 ssh-config 的配置文件

+ `/etc/ssh/ssh_config`
+ `~/.ssh/config`

以下是快速登录山月两个服务器 `shanyue` 和 `training` 的配置

```config
# 修改 ssh 配置文件 ~/.ssh/config

Host shanyue
    HostName 172.16.3.2
    User root

# 请用真实 IP 地址替换以下的 PUBLIC_IP
# 并记得替换 User
Host training
    HostName <PUBLIC_IP>
    User root
```

配置成功之后直接 ssh <hostname> 就可以直接登录，是不很方便？

``` bash
$ ssh shanyue
Last login: Wed Jun 15 20:09:14 2022 from 172.16.3.4

Welcome to Alibaba Cloud Elastic Compute Service !

[root@shanyue ~]# 
```

## 免密登录：public-key 与 ssh-copy-id

如何实现远程服务器的免密登录需要两个条件:

1. 两个文件: 本地环境的 `~/.ssh/id_rsa.pub` 与 远程服务器的 `~/.ssh/authorized_keys`
1. 一个动作: 把本地文件 `~/.ssh/id_rsa.pub` 中内容复制粘贴到远程服务器 `~/.ssh/authorized_keys`

> 如果本地没有 `~/.ssh/id_rsa.pub` 文件，则使用命令 `ssh keygen` 进行生成。

**总结成一句话，把自己的公钥放在远程服务器的 `authorized_keys` 中**

简单来说，就是 `Ctrl-C` 与 `Ctrl-V` 操作，不过还有一个更加有效率的工具: `ssh-copy-id`。

此时一个解决生产力的命令行工具应运而生: `ssh-copy-id`

```bash
# 在本地环境进行操作

# 提示你输入密码，成功之后可以直接 ssh 登录，无需密码
$ ssh-copy-id shanyue

# 登陆成功，无需密码
$ ssh shanyue
```

## 安全性: 禁用密码登录

为了更大保障服务器的安全性，这里禁止密码登录。修改云服务器的 `sshd` 配置文件：`/etc/ssh/sshd_config`。其中 `PasswordAuthentication` 设置为 `no`，以此来禁用密码登录。

```config
# 编辑服务器端的 /etc/ssh/sshd_config
# 禁用密码登录

Host *
  PasswordAuthentication no
```

## 保持连接，防止断掉

除此之外，还可以通过一些配置来更好地优化我们连接服务器时的体验。

我们可以通过 `man ssh config`，找到每一项的详细释义。

``` config
# 编辑 ~/.ssh/config

Host *
  ServerAliveInterval 30
  TCPKeepAlive yes
  ServerAliveCountMax 6
  Compression yes
```

## 作业

1. 免密登录远程服务器
2. 使用别名登录远程服务器
