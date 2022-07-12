# 环境变量的配置

## 默认环境变量

``` bash

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

通过 `export` 配置的环境变量仅在当前 shell(tty) 窗口有效，如果再开一个 shell，则无法读取变量。

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
