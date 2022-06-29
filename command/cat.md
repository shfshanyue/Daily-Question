# cat，管道与重定向

## cat

`cat`，`concatenate` 缩写，`concatenate and print files` 连接文件并打印至标准输出（stdout）。

但是在工作中一般仅仅是将单文件打印。

``` bash
$ cat README.md
```

也可以连接多文件进行打印。

``` bash
$ cat package.json yarn.lock
```

那在 `cat` 时实际是做了什么？

## library：open/read

我们在打开一个文件，读取内容时，在操作系统底层实际上做了两步操作。

+ [open](https://www.man7.org/linux/man-pages/man2/open.2.html)：`open("package.json")`，并返回**文件描述符**，即 `file descriptor`，简写 `fd`，一个非负整数。
+ [read](https://www.man7.org/linux/man-pages/man2/read.2.html)：`read(3)`，通过 `fd` 读取文件内容，其中的 3 为文件描述符。

> 在 Node.js 中，你会发现它有一个 API 为 `fs.readFile`，它实际上是 `fs.open` 与 `fs.read` 的结合体。

## less

更高级更强大的查看文件内容工具，可使用 vim 命令控制上下移动以及关键词搜索。

``` bash
$ less README.md
```

## head

``` bash
# 输出文件前 10 行内容
$ head -10 README.md
```

## tail

``` bash
# 输出文件后 10 行内容
$ tail -10 README.md
```

## pipe

`|` 构成了管道，它将前边命令的标准输出（stdout）作为下一个命令的标准输入（stdin）。

``` bash
# 读取 package.json 内容，读取前十行，再读取最后三行
$ cat package.json | head -10 | tail -3
```

`pipe` 在 linux 中非常常用。

![](https://static.shanyue.tech/images/22-06-29/clipboard-7407.89b422.webp)

## stdin/stdout

在上边提到标准输入（stdin）与标准输出（stdout），与文件描述符。

其实，stdin/stdout 就是特殊的文件描述符。

+ `stdin`，fd = 0，直接从键盘中读取数据
+ `stdout`，fd = 1，直接将数据打印至终端
+ `stderr`，fd = 2，直接将异常信息打印至终端

## redirection

+ `>`：将文件描述符或标准输出中内容写入文件
+ `>>`：将文件描述符或标准输出中内容追加入文件

``` bash
# READEME.md 内容为 hello，这里的文件描述符就是标准输出
$ echo hello > README.md

# READEME.md 内容最后一行为 hello
$ echo hello >> README.md
```

## heredoc

在许多官方文档中的命令中，我们经常可以看到以下用法

``` bash
$ cat <<EOF > READEME.md
...
```

其意思是将标准输入时的内容，写入到 README.md 中。

其中 `<<EOF`，称作 `Hear Document`，当最终写入 EOF（End of line）时，则 heardoc 会停止输入。

``` bash
<<[-]word
  here-document
delimiter

# 一般使用 EOF，作为结束符
<<EOF
  here-document
EOF
```

## 日志重定向

有时，为了不显示日志，可将所有标准输出重定向至 `/dev/null`

``` bash
$ echo hello > /dev/null

# 如果后边跟一个 2>&1，表示将 stderr (fd 为2) 重定向至 &1 (fd===1 的文件，及 stdout)
$ cat hello > /dev/null 2>&1
```