# glob

详见文档[glob](https://man7.org/linux/man-pages/man7/glob.7.html)

也可以通过 `man bash`，随之查找 `Pattern Matching` 找到文档

## glob

`glob` 拥有以下基本语法

+ `*`：匹配0个及以上字符
+ `?`：匹配1个字符
+ `[...]`：range，匹配方括号内所有字符
+ `**`：匹配0个及多个子目录

示例如下

``` bash
# 列出当前目录下所有的 js 文件
$ ls -lah *.js
-rw-r--r-- 1 train train 1.5K Jun 10 15:45 ReactVersions.js
-rw-r--r-- 1 train train 1.1K May 22  2021 babel.config.js
-rw-r--r-- 1 train train 7.5K Jun 10 15:45 dangerfile.js

# 列出当前目录及所有子目录的 js 文件
$ ls -lah **/*.js

# 列出当前目录及所有子目录的后缀名为两个字幕的文件
$ ls -lah **/*.??
```

## extglob

还有一些扩展的 glob 模式

+ `?(pattern-list)`，重复0次或1次的模式
+ `*(pattern-list)`，重复0次或多次
+ `+(pattern-list)`，重复1次或多次
+ `@(pattern-list)`，重复1次
+ `!(pattern-list)`，非匹配

``` bash
# 列出所有以 js/json/md 结尾的文件
$ ls -lah *.*(js|json|md)
```

`extglob` 需要通过 `shopt` 命令手动开启

``` bash
$ shopt | grep glob
dotglob         off
extglob         on
failglob        off
globasciiranges off
globstar        off
nocaseglob      off
nullglob        off

$ shopt -s extglob
```

## 作业

1. 如何列出当前目录下所有的 js 文件
1. 如何列出当前目录下所有的 js 文件和 json 文件

