# tmux

> tmux is a terminal multiplexer

`tmux` 是一个终端复用器，这也是它命名的由来 `t(terminal) mux(multiplexer)`，你可以在一个屏幕上管理多个终端！

在 `mac` 上得益于 [iterm2](https://www.iterm2.com/)，你管理多个终端窗口相当方便。但是在 linux 上，`iterm2` 就鞭长莫及了，`tmux` 的优势就显出来了。

就我理解，`tmux` 在 linux 上或者 mac 上有诸多好处

1. 分屏

    诚然，`iterm2` 也是可以做到分屏的，但是 `iterm2` 有一个缺点便是 `iterm for Mac`。如果结合 `iterm2` 与 `ssh` 的话，`iterm2` 分屏需要不断地 `ssh <server>`，导致的后果就是有多个用户连接，使用 `who` 命令查看登录用户数。

1. attach

    `attach` 可以起到保护现场的作用，不至于因 `ssh timeout`，而丧失了工作环境。

1. 操作简单，可配置化

    你可以使用快捷键很快地在多个窗口，面板间切换，粘贴复制，无限滚屏。

本章将介绍以下内容

+ contos/mac 上如何安装 `tmux` 
+ 使用 ansible 自动化批量安装 `tmux`
+ `tmux` 常用操作

至于说它高颜值，体现在可定制化样式的状态栏下，可以设置状态栏的样式, 位置，当前window的样式，状态栏信息的丰富度。比如 [gpakosz/.tmux](https://github.com/gpakosz/.tmux) 的配置

![tmux](https://cloud.githubusercontent.com/assets/553208/9890797/8dffe542-5c02-11e5-9c06-a25b452e6fcc.gif)

<!--more-->

+ 原文地址: [窗口复用与 tmux](https://shanyue.tech/op/tmux-setting.html)
+ 系列文章: [服务器运维笔记](https://shanyue.tech/op/)

## 安装

如果你在 mac 上，那么你可以使用 `brew install tmux` 安装 tmux，简单，快捷。

但是你在 centos 上，如果直接使用 `yum` 来安装软件，会安装特别旧的版本，且很多实用的功能无法使用。那么直接通过 [tmux源码](https://github.com/tmux/tmux) 自己编译安装则是一个不错的注意

``` bash
# 安装软件依赖
$ yum install -y gcc automake libevent-devel ncurses-devel glibc-static

# 下载源代码
$ git clone git@github.com:tmux/tmux.git

# 切换到 2.8 版本
$ git checkout 2.8
$ cd tmux

# 编译源码
$ sh autogen.sh && ./configure && make

# 查看版本号
$ ./tmux -V
tmux 2.8
```
