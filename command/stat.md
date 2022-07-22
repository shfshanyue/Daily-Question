# stat

还记得上篇文章关于 `ls` 的内容吗，它每一行代表什么意思？

别急，我们先看一下 `stat` 这个命令。

> 在 mac 中，stat 用法与 linux 有差异，请在 linux 下练习该命令。

## stat

`stat`，查看文件系统信息。

``` bash
$ stat README.md
  File: README.md
  Size: 5201            Blocks: 16         IO Block: 4096   regular file
Device: fd01h/64769d    Inode: 657197      Links: 1
Access: (0644/-rw-r--r--)  Uid: ( 1000/ shanyue)   Gid: ( 1000/ shanyue)
Access: 2022-06-17 10:45:18.954000816 +0800
Modify: 2022-06-17 11:29:45.580831556 +0800
Change: 2022-06-17 12:24:25.276142164 +0800
 Birth: 2022-06-14 19:10:22.779976895 +0800
```

其中:

+ regular file: 普通文件
+ Size: 文件大小
+ Inode：每个文件的 Inode 编号
+ Links: 文件硬链接个数
+ Access Mode: 文件访问模式
+ Access: atime, 文件访问时间
+ Modify: mtime, 文件修改时间（在 HTTP 服务器中，常以此作为 last-modified 响应头）
+ Change: ctime, 文件修改时间（包括属性，比如 mode 和 owner，也包括 mtime，因此 ctime 总比 mtime 大）
+ Birth: 某些操作系统其值为 -

> 对于每个字段的释义详细，可查看 [stat](https://www.man7.org/linux/man-pages/man2/stat.2.html#DESCRIPTION)

## stat -c

使用 `stat -c`，可指定文件某个属性进行输出。

``` bash
$ stat -c --format=FORMAT
```

有以下格式可选：

+ %a     access rights in octal
+ %A     access rights in human readable form
+ %f     raw mode in hex
+ %F     file type
+ %g     group ID of owner
+ %G     group name of owner
+ %h     number of hard links
+ %i     inode number
+ %n     file name
+ %s     total size, in bytes
+ ...

``` bash
$ stat -c "%a" README.md
644
$ stat -c "%F" README.md
regular file
$ stat -c "%A" README.md
-rw-r--r--
$ stat -c "%y" README.md
2022-06-17 12:21:06.028463373 +0800
$ stat -c "%Y" README.md
1655439666
```

## 文件类型

在 Linux 中一切都是文件，我们可通过 `stat` 查看文件类型。

我们查看一下 Linux 中有哪些文件类型。

``` bash
$ stat -c "%F" README.md
regular file

$ stat -c "%F" node_modules/
directory

$ stat -c "%F" /usr/local/bin/npm
symbolic link

$ stat -c "%F" /dev/null
character special file

$ stat -c "%F" /dev/pts/0
character special file

$ stat -c "%F" /dev/vda
block special file

$ stat -c "%F" /var/run/docker.sock
socket
```

同时，还可以使用 `ls -lah` 查看文件类型，第一个字符表示文件类型。

+ -，regular file。普通文件。
+ d，directory。目录文件。
+ l，symbolic link。符号链接。
+ s，socket。套接字文件，一般以 `.sock` 作为后缀。（可把 `.sock` 理解为 API，我们可以像 HTTP 一样对它请求数据）
+ b，block special file。块设备文件。
+ c，character special file。字符设备文件。

``` bash
$ ls -lah /dev/null
crw-rw-rw- 1 root root 1, 3 Sep 29  2019 /dev/null

$ ls -lah /dev
```

## 作业

1. 尝试说出四种以上文件类型
1. 尝试说出四种以上文件元属性
1. 如何查看某个文件的文件类型
1. 如何判断某个文件是一个软链接及硬链接
1. 我们修改了文件的 mode，在 git 中是否有更改操作
1. 我们修改了文件的 mtime，在 git 中是否有更改操作
1. 在 Node.js 或其它语言中如何获取 stat 信息
