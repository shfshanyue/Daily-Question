# function

shell 中函数语法与其它语言类似，而调用函数，如同使用命令行。

练习时，将下文件保存为 `hello.sh`，并通过 `bash hello.sh` 进行执行。

``` bash
hello () {
  echo hello
}

// 调用函数
//=> hello
hello
```

## 传递参数

在传递参数时，使用 `$1`、`$2`、`$3`... 接收参数，而 `$0` 在 zsh 中指函数名，在 bash 中指脚本名称。

``` bash
hello () {
  echo $0 $1 $2 $3 $4
}

# 调用函数
# bash index.sh => hello.sh a b c d
# zsh index.sh  => hello a b c d
# source index.sh => bash a c c d  (bash 环境下)
# source index.sh => hello a c c d (zsh 环境下)
hello a b c d
```

## 特殊变量

除此之外，在函数中还有以下特殊的变量

+ `$#`: 参数数量
+ `$*`: 所有参数
+ `$@`: 所有参数

如果你第一次接触以上变量，有可能傻傻分不清楚。但是联系到上一篇关于数组的文章，就很容易联想到 `@` 代表所有数组，`#` 代表数组个数。

``` bash
hello () {
  echo '$#' ${#}
  echo '$*' ${*}
  echo '$@' ${@} ${@[1]} $1
}

# 调用函数
# => Output:
# $# 4
# $* a b c d
# $@ a b c d a a
hello a b c d
```

## 命令行即函数

函数的调用方法是不和命令行调用方法一模一样？实际上，可把命令行视为函数。

如果 `$0`、`$1`、`$@` 出现在全局，则表明他们是命令行的参数。

## 作业

1. [nodejs 官方镜像的 docker-entrypoint](https://github.com/nodejs/docker-node/blob/main/16/alpine3.16/docker-entrypoint.sh) 是何意思？
1. `$0` `$1` `$@` 各代表什么意思

