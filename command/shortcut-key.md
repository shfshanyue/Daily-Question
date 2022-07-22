# 快捷键

## Emacs Mode

在 bash 下，有许多快捷键，可以提高输入命令行的效率。快捷键默认为 Emacs Mode。

+ `<ctrl-a>` 移至行首
+ `<ctrl-e>` 移至行尾
+ `<meta-b>` 移至上一个单词 
+ `<meta-f>` 移至下一个单词 
+ `<ctrl-u>` 删除光标之前内容
+ `<ctrl-k>` 删除光标之后内容
+ `<ctrl-l>` 清屏
+ `<ctrl-p>` 上一个历史记录
+ `<ctrl-n>` 下一个历史记录
+ `<ctrl-r>` 搜索历史记录

更多快捷键，可查看 [Readline 手册](https://www.man7.org/linux/man-pages/man3/readline.3.html#EDITING_COMMANDS)

## Vim Mode

通过 `set -o vi`，可以将快捷键改为 vi 风格。

此时通过一些 vi 的快捷键即可操作命令行，了解更多请学习 vi。

同时，在 Emacs Mode 下的清屏快捷键还挺好用，可在 vi mode 下通过 bind 命令绑定 `<ctrl-l>`。

``` bash
# 将这两行命令放置在 shell 配置文件下
# bash: ~/.bashrc
# zsh:  ~/.zshrc

# 切换为 vi mode
set -o vi
# 绑定清屏的快捷键为 <ctrl-l>
bind -m vi-insert "\C-l":clear-screen
```

其中，使用了 `bind` 绑定快捷键，通过 `bind -P` 可查看所有可绑定快捷键的操作。

``` bash
$ bind -P
abort can be found on "\C-g", "\C-x\C-g", "\e\C-g".
accept-line can be found on "\C-j", "\C-m".
alias-expand-line is not bound to any keys
arrow-key-prefix is not bound to any keys
backward-byte is not bound to any keys
backward-char can be found on "\C-b", "\eOD", "\e[D".
backward-delete-char can be found on "\C-h", "\C-?".
backward-kill-line can be found on "\C-x\C-?".
backward-kill-word can be found on "\e\C-h", "\e\C-?".
```

## zsh 下的 Vim Mode

如果在 `zsh` 下，如果需要配置 `vi-mode`，你的操作就不需要如此麻烦，仅仅开启 `vi-mode` 的插件即可。

编辑 `~/.zshrc` 文件中的 `plugins` 配置，启用 `vi-mode` 插件。

``` bash
plugins=(... vi-mode)
```

## 作业

1. 如何快速移至命令的行首和行尾
1. 如何快速清屏
1. 如何快速清楚整个命令
1. 你更喜欢用 vim 模式的快捷键还是 emacs 的快捷键
