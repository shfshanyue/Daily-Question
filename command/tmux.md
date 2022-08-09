# tmux

> tmux is a terminal multiplexer

`tmux` 是一个终端复用器，这也是它命名的由来 `t(terminal) mux(multiplexer)`，你可以在 linux 终端管理多个窗口。

1. 分屏。
1. attach。`attach` 可以起到保护现场的作用，不至于因 `ssh timeout`，而丧失了工作环境。
1. 操作简单，可配置化。你可以使用快捷键很快地在多个窗口，面板间切换，粘贴复制，无限滚屏。

## 安装

如果你在 mac 上，那么你可以使用 `brew install tmux` 安装 tmux。

如果在 linux 上，可直接通过 [tmux源码](https://github.com/tmux/tmux) 编译安装。

``` bash
# 安装软件依赖
$ yum install -y gcc automake libevent-devel ncurses-devel glibc-static

# 下载源代码
$ git clone git@github.com:tmux/tmux.git

# 编译源码
$ sh autogen.sh && ./configure && make

# 直接执行
$ ./tmux 

# 使得 tmux 可全局执行
$ cp ./tmux /usr/local/bin/tmux
```

## 术语

+ `server`：包含多个 `session`
+ `session`：可以理解为谷歌浏览器打开了两个浏览器，每个浏览器就是一个 `session`，每一个 `session` 包含多个 `window`
+ `window`：可以理解为谷歌浏览器的每个标签页，每一个 `window` 包含多个 `pane`
+ `pane` 面板

## 命令

在 `tmux` 中直接使用 `tmux` 命令可进入 `tmux` 环境。

![](https://static.shanyue.tech/images/22-08-07/clipboard-3171.6bd0f8.webp)

### 新建 session

``` bash
# 新建一个 tmux session
# new：new-session 的简写
$ tmux new -s shanyue

# 也可以直接通过 tmux 命令进入
# tmux
```

### 退出并继续 session

如果需要退出 `tmux` 环境但需要保存工作现场，则输入命令 `tmux detach` 即可，下次进入时选择 `tmux atach`

``` bash
# 退出并保存环境
$ tmux detach

# 列出所有的 session
# ls：list-sessions 的简写
$ tmux ls
shanyue: 1 windows (created Sun Jul 31 16:02:49 2022)

# a: attach 简写，
# -t：选择要 attach 的 session name
$ tmux a -t shanyue
```

## 作业

1. 安装 tmux
2. 熟悉 tmux attach/detach 命令

