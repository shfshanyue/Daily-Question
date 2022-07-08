# find/ag

## find：根据文件名搜索

`find`，在某个目录及所有子目录中的文件进行搜索，可根据 stat 的属性进行查找。

``` bash
$ find . -name '*.json'

# 在当前目录递归查找包含 hello 的文件
$ find . -name '*hello*'

$ find . -perm 777

$ find . -type f
$ find . -type d
$ find . -type s
```

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
