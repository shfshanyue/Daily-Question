# cat，管道与重定向

## cat

`cat`，`concatenate` 缩写，`concatenate and print files` 连接文件并打印至标准输出（stdout）。

> 关于标准输入与标准输出概念解释，请查看下一章。

但是在工作中一般仅仅是将单文件打印。

``` bash
$ cat README.md
```

也可以连接多文件进行打印。

``` bash
$ cat package.json yarn.lock
```

那你知道在 cat 时实际做了什么吗？请往下看。

## library：open/read

我们在打开一个文件，读取内容时，在操作系统底层实际上做了两步操作。

+ [open](https://www.man7.org/linux/man-pages/man2/open.2.html)：`open("package.json")`，并返回**文件描述符**，即 `file descriptor`，简写 `fd`，一个非负整数，通过文件描述符可用来读写文件。
+ [read](https://www.man7.org/linux/man-pages/man2/read.2.html)：`read(3)`，通过 `fd` 读取文件内容，其中的 3 为文件描述符。

> 在 Node.js 中，你会发现它有一个 API 为 `fs.readFile`，它实际上是 `fs.open` 与 `fs.read` 的结合体。

## less

更高级更强大的查看文件内容工具，可使用 vim 命令控制上下移动以及关键词搜索。

``` bash
$ less README.md

# 通过 —N 可显示行号
$ less -N README.md
```

## head

`head`，读取文件或者标准输入的前 N 行或前 N 个字节。

``` bash
# 输出文件前 10 行内容
$ head -10 README.md

# 与以上命令同义
$ head --lines 10 READEME.md

# 输出文件前 10 个字节
$ head -c 10 READEME.md
```

## tail

`tail`，读取文件或者标准输入的最后 N 行或最后 N 个字节。

``` bash
# 输出文件后 10 行内容
$ tail -10 README.md
```

但是它与 `head` 最大不同的一点是：`--follow`，简写为 `-f`。它可以实时打印文件中最新内容。

**在调试日志时非常有用**：日志一行一行追加到文件中，而 `tail -f` 可以实时打印追加的内容。

``` bash
$ tail -f log.json

# 如果为了做实验，可再打开一个窗口通过 >> 重定向追加内容至 log.json，具体查看下一章
echo test >> log.json
```

## 作业

1. cat 这个命令行的本义是什么
1. 如何输出文件的前十行/后十行内容
1. 如何实时输出日志的追加内容
