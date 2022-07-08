# zsh

在 linux 中，拥有各种各样的 shell，比如 bash。

如果将服务器作为个人开发服务器，则很适合将 zsh 作为个人的默认 shell。

## zsh

zsh 是一种更富有交互效果，功能更加强大，界面更加华丽的 shell 工具。

通过 `chsh`，即 `change shell`

``` bash
# 安装 zsh
$ yum install zsh

# 默认的 shell 是 bash
$ echo $SHELL
bash

# 找到 zsh 的默认安装位置
$ which zsh
/usr/bin/zsh

# 更改默认的 shell
$ chsh -s /usr/bin/zsh
```

## ohmyzsh

[ohmyzsh](https://github.com/ohmyzsh/ohmyzsh) 是一个管理 zsh 插件的轻量框架。

``` bash
# 远程下载 install.sh 安装程序并直接执行
$ sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## zshrc

正如 `bash` 的默认配置文件为 `~/.bashrc`，`zsh` 的默认配置文件为 `~/.zshrc`。



## 作业

1. 如何判断当前处在哪个 shell 下
2. zsh 有哪些比较有意思的 plugin


