# vim 中的操作

复制粘贴删除算是编辑文件最常见的操作，那在 vim 中如何完成？

> Tip：在 vim 中可使用 `:help operator` 查看 `operator` 详细文档，使用 `:help d` 可查看 delete 的详细文档。

## yank (copy)

+ `yy`：复制整行内容
+ ~~`Y`：复制当前字符至行尾，需要配置 `:map Y y$`~~
+ `p`：光标之后进行粘贴
+ `P`：光标之前进行粘贴

## delete

+ `dd`：删除整行内容
+ `D`：删除当前字符至行尾

## change

+ `cc`：删除整行内容并进入 `insert mode`
+ `C`：删除当前字符至行尾并进入 `insert mode`

## shift

缩进在编程中非常实用。

+ `>>`：向右缩进
+ `<<`：向左缩进

## operater + move

以上三种操作，都可以与 move 键结合。比如 `d` 是删除，则

+ `dl` 删除右侧字符（当前字符）
+ `dh` 删除左侧字符
+ `d$` 删除至行尾
+ `dG` 删除至末尾
+ `3dl` 删除右侧三个字符
+ `d3l` 删除右侧三个字符，与上同

## text object

除此之外，结合 `a`/`i` 还可以更好地在括号、引号内工作。以下统称为 `text object`。

> Q：还接的 word 和 WORD 的区别吗？

+ `aw`: a word
+ `iw`: inner word
+ `aW`: a WORD
+ `iW`: inner WORD
+ `a[`：a `[]` block
+ `a(`
+ `a<`
+ `a{`
+ `a"`
+ `a'`

在 vim 中 y/d/c 与 text object 结合的操作，是其它编辑器无法比拟的便捷，如如何删除括号内所有内容？而在 vim 中 很容易做到。

+ `daw`：删除当前单词
+ `di(`：删除括号内所有内容
+ `da(`：删除括号内所有内容，包括括号
+ `ca(`：删除括号内所有内容，包括括号，并进入 `insert mode`

## undo/redo/search

以下严格来说不算 vim 中的操作符（operator)，但是篇幅太短放在这里。

+ `u`：撤销
+ `<ctrl-r>`：重做
+ `/{word}<cr>`：高亮搜索词。如果不需要高亮时，可使用 `:noh[lsearch]` 取消高亮
+ `n`：下一个搜索
+ `N`：上一个搜索

> Q：还记得 less 命令吗，如何在 less 中搜索关键词？

## 作业

1. 熟练掌握各类操作
1. 使用 vim 或 vscode 中 vim 插件来完成日常项目开发
1. 如何删除当前行并进入插入模式

