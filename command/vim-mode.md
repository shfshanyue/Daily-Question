# vim 中的模式

熟悉 `vim` 最重要的是多加练习！

比如在 `vscode` 中安装一个 vim 插件，在 vim 模式下继续开发你们的项目。

## 打开文件

学习 vim 第一步，在服务器新建文件，输入几个字符，保存退出。

``` bash
# 新建一个文件 Readme.md
$ vim Readme.md
```

1. `vim Readme.md`。新建并打开一个文件 Readme.md，此时处于 `normal mode`。
2. `i`。进入 `insert mode`，此时可正常编辑文字。
3. `# hello, vim`。此时处于 `insert mode`，输入字符 `# hello, vim`
4. `esc`。退出 `insert mode`，此时处于 `normal mode`。
5. `:`。进入 `command mode`。
6. `:wq`。在 `command mode` 下继续输入 `:wq`，保存退出。

## 模式

目前为止，已经有了三种模式：

+ normal。普通模式，刚进入 vim 的默认模式，也是最重要的模式。 **确保大部分操作在普通模式下完成，而不是插入模式。**
+ insert。插入模式。在普通模式下通过 `i` 进入插入模式，在插入模式下进行文字编辑。
+ command。命令模式。在普通模式下通过 `:` 进入命令模式，在命令模式下执行命令。

