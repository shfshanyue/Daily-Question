# zsh

在 linux 中，拥有各种各样的 shell，比如 bash、zsh、sh 等。

如果将服务器作为个人开发服务器，则很适合将 `zsh` 作为个人的默认 shell。

## zsh

zsh 是一种更富有交互效果，功能更加强大，界面更加华丽的 shell 工具。

通过 `chsh`，即 `change shell`，可切换终端默认 shell。

``` bash
# 安装 zsh
# 注意，不同的发行版，zsh 的安装命令不同
$ yum install zsh

# 默认的 shell 是 bash
$ echo $SHELL
/bin/bash

# 找到 zsh 的默认安装位置
$ which zsh
/usr/bin/zsh

# 更改默认的 shell
# -s: --shell，切换为指定的 shell
$ chsh -s /usr/bin/zsh

# 打印 shell 列表
$ chsh -l
/bin/sh
/bin/bash
/usr/bin/sh
/usr/bin/bash
/usr/bin/zsh
/bin/zsh
```

## ohmyzsh

> 如果你是 MacOS，则强烈推荐将 `zsh` 与 `ohmyzsh` 搭配使用。

[ohmyzsh](https://github.com/ohmyzsh/ohmyzsh) 是一个管理 zsh 插件的轻量框架，使用其可配置大量有用的好看主题及插件。

``` bash
# 远程下载 install.sh 安装程序并直接执行
$ sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

![](https://static.shanyue.tech/images/22-07-22/clipboard-7496.2794e3.webp)

## zshrc

正如 `bash` 的默认配置文件为 `~/.bashrc`，`zsh` 的默认配置文件为 `~/.zshrc`。

### plugin

``` bash
plugins=(
  git
  bundler
  dotenv
  macos
  rake
  rbenv
  ruby
)
```

### theme


## 作业

1. 如何判断当前处在哪个 shell 下
2. zsh 有哪些比较有意思的 plugin


