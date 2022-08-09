# vim visual mode

在前序文章中，讲述了 vim 的三种模式。

在 vim 中，还有一种 `visual mode`，在工作场景中大量用到。

## visual mode

通过以下方式可进入 `visual mode`。

+ `v`：逐字选择
+ `V`：逐行选择
+ `<ctrl-v>`：逐块选择

进入 `visual mode` 后

1. 用 vim move 移动光标选择区域
2. 用 vim operator 选中区域进行复制、删除、缩进等操作

如果需要中途退出 `visual mode`，请使用 `<ctrl-c>`。

## ctrl-v

`<ctrl-v>` 可以以方形选中区域，并可同时操作多行。

比如，同时给三行内容前添加 `HELLO`，可使用 `<ctrl-v>jjIHELLO<ctrl-[>`

+ `<ctrl-v>`：进入 vim `visual mode`
+ `jj`：往下选择两行
+ `I`：进入区域首字符进行编辑
+ `HELLO`：编辑文字
+ `<ctrl-[>`：退出 `visual mode`

## 作业

1. 熟练掌握各类操作
1. 如何给三行内容行尾添加字符 `HELLO`

