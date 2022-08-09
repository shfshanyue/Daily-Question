# tmux 快捷键

tmux 的默认配置文件为 `~/.tmux.conf`，可通过它来配置快捷键。

+ [tmux-config for shanyue](https://github.com/shfshanyue/tmux-config)
+ [gpakosz/.tmux](https://github.com/gpakosz/.tmux)

## 命令模式

在 tmux 中，可通过 `<prefix>:` 进入命令模式。

![](https://static.shanyue.tech/images/22-08-09/clipboard-9298.9f6f4e.webp)

此时可输入 `detach`，来 detach session，与在命令行直接输入 `tmux detach` 是一样的效果。

``` bash
# 在 tmux 命令模式执行，或者加关键字 `tmux` 在 shell 中执行
$ detach 
```

## 查看帮助

在 `tmux` 下可通过 `<prefix>?` 查找所有的快捷键。

![](https://static.shanyue.tech/images/22-08-09/clipboard-2896.ffa2bd.webp)

## prefix-key

在 tmux 中，有一个 `<prefix>` 键，默认为 `<ctrl-b>`，在按任意快捷键之前需要先按一个 `<prefix>` 键。

`send-prefix` 指令代表向 tmux 发送 `prefix` 键，`send-prefix -2` 代表新增一个 `<prefix>` 键。

由于 `<ctrl-s>` 相比 `<ctrl-b>` 更加方便快捷，因此使用它作为常用快捷键。

在 `tmux` 中可使用 `bind` 绑定快捷键。

``` bash
# 以下命令直接在 tmux 命令模式执行，或者加关键字 `tmux` 在 shell 中执行，或者写入配置文件 ~/.tmux.conf 中生效
# `prefix :` 可以进入 tmux 命令模式

$ set -g prefix2 C-s
$ bind C-s send-prefix -2
```

## split-window

在 tmux 环境下使用快捷键 `<prefix>%` 与 `<prefix>"` 完成分屏。

![](https://static.shanyue.tech/images/22-08-09/clipboard-3245.d5cee5.webp)

在 tmux 中，通过命令 `tmux split-window` 进行分屏。

``` bash
# -h：水平分屏
# -c：指定路径
$ tmux split-window -h -c ~
```

为了每次分屏都能定位到分屏窗口的当前路径，可使用以下快捷键进行绑定。

``` bash
bind % split-window -h -c "#{pane_current_path}"
bind '"' split-window -c "#{pane_current_path}"
```

## 分屏移动

移动面板命令为 `tmux select-pane`，可配置移动命令为 `hljk`，如此 `<prefix>h` 就是向左移动面板。

另外，也可以开启鼠标支持，通过鼠标快速移动面板。

``` bash
# 以下命令直接在 tmux 命令模式执行，或者加关键字 `tmux` 在 shell 中执行，或者写入配置文件 ~/.tmux.conf 中生效
# `prefix :` 可以进入 tmux 命令模式

# bind：绑定快捷键
# -r：可重复按键
# select-pane：选择面板
$ bind -r h select-pane -L 
$ bind -r l select-pane -R
$ bind -r j select-pane -D
$ bind -r k select-pane -U
```

## 常见快捷键

+ `<prefix>d`：detach session
+ `<prefix>$`：rename session
+ `<prefix>s`：切换 session
+ `<prefix>c`：新建窗口
+ `<prefix>,`：重命名窗口
+ `<prefix>1,`：选择1号窗口
+ `<prefix>2,`：选择2号窗口
+ `<prefix><space>,`：重排局当前窗口
+ `<prefix>x,`：杀掉当前面板，当当前面板卡死时特别有用
+ `<prefix>z,`：将当前面板最大化或恢复

## 翻屏

按 `prefix [` 键进入 tmux 的 `copy mode`，此时可见到在 tmux 右上角有一个黄色的行号。

该模式类似于 vi 的 normal mode，支持复制，粘贴，查找，以及翻页。具体是 vi 还是 emacs 可以根据以下命令探知。

与 vi 命令相同，如上下翻页(半屏)可使用 `<ctrl-d>` 以及 `<ctrl-u>`。

``` bash
$ tmux show-window-options -g mode-keys
```

## 作业

1. 如何新建窗口
2. 如何新建面板
3. 如何跳转到某个窗口
4. 如何跳转到某个面板
5. 如何将某个面板最大化

