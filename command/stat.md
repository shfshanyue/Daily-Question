# stat

还记得上篇文章关于 `ls` 的内容吗，它每一行代表什么意思？

别急，我们先看一下 `stat` 这个命令。

## stat

``` bash
$ stat README.md
  File: README.md
  Size: 5201            Blocks: 16         IO Block: 4096   regular file
Device: fd01h/64769d    Inode: 657197      Links: 2
Access: (0644/-rw-r--r--)  Uid: ( 1000/ shanyue)   Gid: ( 1000/ shanyue)
Access: 2022-06-17 10:45:18.954000816 +0800
Modify: 2022-06-17 11:29:45.580831556 +0800
Change: 2022-06-17 12:24:25.276142164 +0800
 Birth: 2022-06-14 19:10:22.779976895 +0800
```

其中:

+ Size: 文件大小
+ Links: 文件硬链接个数
+ Access Mode: 文件访问模式
+ Access: atime, 文件访问时间
+ Modify: mtime, 文件修改时间
+ Change: ctime, 文件修改时间(包括属性，比如 mode 和 owner，也包括 mtime)
+ Birth: 某些操作系统其值为 -

> 对于每个字段的释义详细，可查看 [stat](https://www.man7.org/linux/man-pages/man2/stat.2.html#DESCRIPTION)

## ls 之 owner/mode

``` bash
$ ls -lah README.md
-rw-r--r-- 2 shanyue shanyue 5.1K Jun 17 11:29 README.md
```

各项释义如下:

``` bash
mode         user    group   size mtime        name
-rw-r--r-- 2 shanyue shanyue 5.1K Jun 17 11:29 README.md
```

## file

<!-- > https://stackoverflow.com/questions/19902828/why-does-enoent-mean-no-such-file-or-directory
>
> It's an abbreviation of Error NO ENTry (or Error NO ENTity), and can actually be used for more than files/directories.
>
> It's abbreviated because C compilers at the dawn of time didn't support more than 8 characters in symbols. -->
