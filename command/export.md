# 环境变量的配置

## 默认环境变量

我们可以使用 `$var` 或者 `${var}` 来引用环境变量，而环境变量还有一些扩展值。

详见文档[Parameter Expansion](https://www.gnu.org/software/bash/manual/bash.html#Brace-Expansion)。

+ `${var:-word}`：如果 `var` 不存在，则使用默认值 `word`。
+ `${var:=word}`：如果 `var` 不存在，则使用默认值 `word`。并且赋值 `$var=word`
+ `${var:+word}`：如果 `var` 存在，则使用默认值 `word`。

``` bash
# world
$ echo ${HELLO:-world}

# ''
$ echo $HELLO

# world 
$ echo ${HELLO:=world}

# world
$ echo $HELLO

# 由于此时 $HELLO 存在，则使用 shanyue
# shanyue
$ echo ${HELLO:+shanyue}
```

在 `Dockerfile` 与 `CI` 中，常用到环境变量的扩展，如：

``` bash
# 如果不配置环境变量，则其值为 production，并赋值给 NODE_ENV
${NODE_ENV:=production}
```

## export

通过 `export` 可配置环境变量。

``` bash
$ export A=3
$ echo $A
3
$
$ export NODE_ENV=production
$ echo $NODE_ENV
production
```

通过 `export` 配置的环境变量仅在当前 `shell(tty)` 窗口有效，如果再开一个 shell，则无法读取变量。

**如果需要使得配置的环境变量永久有效，需要写入 `~/.bashrc` 或者 `~/.zshrc`**

``` bash
# 判断当前是哪个 shell
# 如果是 zsh，写入 ~/.zshrc
# 如果是 bash，写入 ~/.bashrc
$ echo $SHELL
/bin/zsh

# 写入 ~/.zshrc，如果不存在该文件，请新建
$ vim ~/.zshrc

写入 ~/.bashrc 后记得使它生效，或者重开一个 shell 窗口
$ source ~/.zshrc
```

## 前置环境变量

在执行命令之前置入环境变量，可以用以指定仅在该命令中有效的环境变量。

``` bash
# 该环境变量仅在当前命令中有效
$ NODE_ENV=production printenv NODE_ENV
production

# 没有输出
$ printenv NODE_ENV
```

在前端中大量使用，如

``` bash
$ NODE_ENV=production npm run build
```

## 作业

1. 如何配置环境变量
2. `${var:=word}` 是什么意思
3. 使用 `export` 配置的环境变量如何永久生效
