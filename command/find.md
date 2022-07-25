# find/ag

## find：根据文件名搜索

`find`，在某个目录及所有子目录中的文件进行**递归搜索**，可根据文件的属性进行查找。

而文件的属性，可通过 [stat](https://q.shanyue.tech/command/stat.html) 命令进行获得。

> 你还记得文件有哪些属性吗？

``` bash
# 注意，如果文件路径名使用 glob，则需要使用引号括起来
$ find . -name '*.json'

# 在当前目录递归查找包含 hello 的文件
$ find . -name '*hello*'

# 在当前目录递归查找修改时间大于 30 天并且小于 60 天的文件
# 其中数字以天为单位，+ 表示大于，- 表示小于
# +30: 大于30天
# -60: 小于60天
$ find . -mtime +30 -mtime -60

# 在当前目录递归查找权限 mode 为 777 的文件
$ find . -perm 777

# 在当前目录递归查找类型为 f/d/s 的文件
$ find . -type f
$ find . -type d
$ find . -type s

# 在当前目录递归查找 inode 为 10086 的文件
# 一般用以寻找硬链接的个数，比如 pnpm 中某一个 package 的全局路径在哪里
$ find . -inum 10086

# 寻找相同的文件（硬链接），与以上命令相似
$ find . -samefile package.json
```

> Q：你还记得 f/d/s 各代表什么文件类型吗？

如果需要找到所有文件，并对所查询的文件进行一系列操作呢？

此时可使用 `--exec`，而文件名可使用 `{}` 进行替代，最后需要使用 `\;` 结尾。

``` bash
# 在当前目录递归查找所有以 test 开头的文件，并打印完整路径
# realpath: 打印文件的完整路径
# {}: 查找到文件名的占位符
$ find . -name 'test*' -exec realpath {} \;
```

而如果用以删除，则可直接使用 `-delete` 命令。

``` bash
# 在当前目录递归查找所有以 test 开头的文件，并删除
$ find . -name 'test*' -exec realpath {} \;
```

## grep -r：根据文件内容搜索

`grep`，即 `Global Regular Expression Print` 的缩写，可基于正则表达式在文件中搜索内容。

如需在目录中进行搜索，可使用 `-r` 参数。

``` bash
# 在当前目录寻找 helloworld 
$ grep -r helloworld .
```

![](https://static.shanyue.tech/images/22-07-24/clipboard-6194.81bb3a.webp)

## ag：根据文件内容搜索

可根据 [the silver searcher](https://github.com/ggreer/the_silver_searcher) 进行文件内容搜索。

该命令需要手动下载安装。

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
