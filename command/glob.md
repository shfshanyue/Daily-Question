# glob

glob，`global` 的简写，使用通配符来匹配大量文件。比如 `rm *.js` 就可以删除当前目录所有 js 文件。

在 Node.js/Python 各个语言中，也有对 glob 的支持，比如 [node-glob](https://github.com/isaacs/node-glob)

详见文档 [glob](https://man7.org/linux/man-pages/man7/glob.7.html)，也可以通过 `man bash`，随之查找 `Pattern Matching` 找到文档。

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

# 列出当前目录及所有子目录的后缀名为两个字母的文件
$ ls -lah **/*.??

# 列出当前目录中，以 2 或者 5 或者 8 开头的文件
$ ls -lah [258]*
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

在 `bash` 中，`extglob` 需要通过 `shopt` 命令手动开启。

> `shopt`，`shell option` 缩写，即 shell 配置的意思。

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

在 `zsh` 中，`extglob` 需要通过 `setopt` 命令手动开启。

``` zsh
$ setopt extendedglob
$ setopt kshglob
```

> Q：你知道如何判断当前终端是哪个 shell 吗？

## 作业

1. 如何列出当前目录下所有的 js 文件
1. 如何列出当前目录下所有的 js 文件和 json 文件
1. 假设有 `test000.json` 到 `test099.json` 100个文件，如何列出所有带有数字 258 的文件

