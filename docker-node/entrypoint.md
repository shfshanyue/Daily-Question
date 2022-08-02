# node 官方镜像的 ENTRYPOINT 脚本解析

以 `node:18` 为例，`node` 官方镜像的 ENTRYPOINT 入口脚本为以下内容：

``` bash
#!/bin/sh
set -e

# Run command with node if the first argument contains a "-" or is not a system command. The last
# part inside the "{}" is a workaround for the following bug in ash/dash:
# https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=874264
if [ "${1#-}" != "${1}" ] || [ -z "$(command -v "${1}")" ] || { [ -f "${1}" ] && ! [ -x "${1}" ]; }; then
  set -- node "$@"
fi

exec "$@"
```

源码详见 [docker-entrypoint.sh](https://github.com/nodejs/docker-node/blob/main/18/bullseye/docker-entrypoint.sh)

## shebang

`#!` 组成了 `shebang`，指定脚本执行的解释器的绝对路径。

``` bash
# 使用 sh 执行脚本
#!/bin/sh

# 使用 python 执行脚本
#!/usr/bin/python
```

## set -e

`set -e`，当命令发生异常时立即退出。

> Exit immediately if a pipeline (which may consist of a single simple command), a list, or  a  compound  command  (see SHELL  GRAMMAR  above),  exits with a non-zero status. 

新建文件 `hello.sh`，脚本示例如下，使用 `bash hello.sh` 执行。

``` bash
# 当有该行时，直接报错退出
# 当无该行时，最终会输出 done
set -e

cat notexistfile

echo done
```

## if

接下来是 if 语句，过长，需要拆开来看。

``` bash
if [ "${1#-}" != "${1}" ] || [ -z "$(command -v "${1}")" ] || { [ -f "${1}" ] && ! [ -x "${1}" ]; }; then
  set -- node "$@"
fi
```

在这之前，首先需要了解一下语法，可参考 [Linux 技能实战](https://q.shanyue.tech/command/)

+ `[ ]`：布尔判断
+ `$1`、`$2`、`$@`：`$1` 代表命令行第一个参数，`$@` 代表命令行所有参数。可参考 [linux 中的函数](https://umiinn9jie.feishu.cn/wiki/wikcnA6zD21wdJtihB1y4fSpqgb)

## `${1#-}`

这种属于不较常见的 `Parameter Expansion` 了，常见的也就 `${NODE_ENV:=development}` 这种，见文档 [Shell Parameter Expansion](https://www.gnu.org/software/bash/manual/bash.html#Shell-Parameter-Expansion)。

那 `${var#word}` 具体的含义呢？

可以理解为：如果变量 `$var` 以 `word` 开头，则 `${var#word}` 的值为 `$var` 删掉 `word`，否则为 `$var`。简单点来说，就是 **Remove prefix**。

有点绕口，看看示例：

``` bash
$ var=helloworld

$ echo ${var#hello}
world

$ echo ${var#world}
helloworld

$ echo ${var#ok}
helloworld
```

所以 `"${1#-}" != "${1}"` 的意思是：**判断 `$1` 是否以 `-` 开头**。

其实用以下两种写法更为直观点：

``` bash
$ var=--version

$ [[ ${var:0:1} == "-" ]] && echo ok
ok

$ [[ $var =~ ^- ]] && echo ok
ok
```

## command -v 

`command -v <command>` 输出某个命令的真实绝对路径，`which` 也可以干这件事情。

二者最重要的一个不同点是，当某个命令不存在时，`command -v` 不会输出任何字符，用此常来判断某个命令是否存在。

可参考 [$PATH](https://q.shanyue.tech/command/path.html)

``` bash
$ command -v node
/usr/local/bin/node

$ which hello
/usr/bin/which: no hello in (/home/train/.autojump/bin:/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/home/train/bin)

# 无任何输出
$ command -v hello command -v 
```

而 `[[ -z STRING]]`，判断 STRING 是否为空字符串。

因此下一条，则是判断 `$1` 该命令是否存在，或者说**判断 `$1` 是否是一个全局可执行的命令**。

## `{[ -f "${1}" ] && ! [ -x "${1}"];}`

而这一条，前边是判断 `$1` 是否是一个文件，而后边是判断 `$1` 是否是一个可执行的文件。因此该条件就是说判断 **`$1` 是否是当前目录一个文件但不可执行**。

可参考 [linux 中的括号](https://q.shanyue.tech/command/quote.html)

其目的是在 `Dockerfile` 中可直接写 `CMD ["index.js"]`，如以下示例

``` yaml
FROM node:14-alpine

ADD server.js /

CMD ["server.js"]
```

哦对，注意两点

1. 该命令使用 `{}` 包裹
2. 该命令最后有一个分号

详见 [how to nest conditional script operators -a -o in an if statement in bash](https://unix.stackexchange.com/questions/670519/how-to-nest-conditional-script-operators-a-o-in-an-if-statement-in-bash)

## set --

`set` 用以重置命令行 `$1` `$2` `$3` 等参数。

至于它有什么作用，看了以下示例就明白了了。

``` bash
$ set -- a b c d

$ echo $1 $2 $3 $4
a b c d

$ echo "$@"
a b c d

$ set -- node "$@"

$ echo "$@"
node a b c d
```

所以 `set -- node "$@"` 的意思也很明白了：**最前边添加一个 node 参数**

## exec

`exec`，执行某条命令，但会退出当前 shell。

> If  command  is specified, it replaces the shell. 

``` bash
$ exec echo hello
hello
```

## 总结

对 `docker-entrypoint.sh` 代码添加注释

``` bash
#!/bin/sh
set -e

# 如果 $1 以 - 开头
if [ "${1#-}" != "${1}" ] ||
  # 或者不是一个可执行命令
  [ -z "$(command -v "${1}")" ] ||
  # 或者是当前目录的一个文件，但不可执行
  { [ -f "${1}" ] && ! [ -x "${1}" ]; };
then
  # 则在前边附一个 node 
  set -- node "$@"
fi

# 执行执行代码
exec "$@"
```

1. 如果 `-` 开头，则作为 `node` 的参数执行
1. 如果判断 $1 是文件且不可执行，则使用 `node` 运行该文件
1. 如果判断 $1 是系统命令，则直接执行该命令

