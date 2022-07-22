# find/ag

## find：根据文件名搜索

`find`，在某个目录及所有子目录中的文件进行**递归搜索**，可根据文件的属性进行查找。

而文件的属性，可通过 `stat` 命令进行获得。

``` bash
$ find . -name '*.json'

# 在当前目录递归查找包含 hello 的文件
$ find . -name '*hello*'

$ find . -perm 777

# 在当前目录查找类型为 f/d/s 的文件
$ find . -type f
$ find . -type d
$ find . -type s

# 在当前目录查找 inode 为 10086 的文件
# 一般用以寻找硬链接的个数，比如 pnpm 中某一个 package 的全局路径在哪里
$ find . -inum 10086

# 寻找相同的文件（硬链接），与以上命令相似
$ find . -samefile package.json
```

> Q：你还记得 f/d/s 各代表什么文件类型吗？

## ag：根据文件内容搜索

可根据 [the silver searcher](https://github.com/ggreer/the_silver_searcher) 进行文件内容搜索。

``` bash
$ ag helloworld
```

![](https://static.shanyue.tech/images/22-07-08/clipboard-1152.2d6175.webp)

## git grep：根据文件内容搜索

如果使用 git 管理项目，并且需要在项目中进行搜索内容的话，则可以使用 `git grep`。

``` bash
$ git grep helloworld
```

## 作业

1. 如何找到当前目录及所有子目录下文件名包含 hello 的文件
1. 如何找到当前目录及所有子目录下文件内容包含 hello 的文件
1. 如何列出当前目录（不包含子目录）下的所有目录
1. 如果一个连接为硬链接，那如何在全局目录中找到该文件
1. 如何删掉当前目录中最近修改时间大于一年的全部文件
