# pipe 与 redirection

## pipe

`|` 构成了管道，它将前边命令的标准输出（stdout）作为下一个命令的标准输入（stdin）。

``` bash
# 读取 package.json 内容，读取前十行，再读取最后三行
$ cat package.json | head -10 | tail -3
```

`pipe` 在 linux 中非常常用。

![](https://static.shanyue.tech/images/22-06-29/clipboard-7407.89b422.webp)

## stdin/stdout

在上边提到标准输入（stdin）与标准输出（stdout），其实，stdin/stdout 就是特殊的文件描述符。

+ `stdin`，fd = 0，直接从键盘中读取数据
+ `stdout`，fd = 1，直接将数据打印至终端
+ `stderr`，fd = 2，标准错误，直接将异常信息打印至终端

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

有时，为了不显示日志，可将所有标准输出重定向至 `/dev/null`。

`/dev/null` 是一个空文件，对于所有的输入都统统吃下，化为乌有。

``` bash
$ echo hello > /dev/null

# 如果后边跟一个 2>&1，表示将 stderr (fd 为2) 重定向至 &1 (fd===1 的文件，及 stdout)
$ cat hello > /dev/null 2>&1
```

## 作业

1. `>` 与 `>>` 的区别是什么
1. stdin/stdout 的文件描述符各是多少
1. 什么是 `Hear Document`
1. 如何不显示某个命令的日志
