## linux 中的环境变量

环境变量，`environment variables`，在操作系统及用户应用间都有极大的作用。

## printenv

通过 `printenv` 可获得系统的所有环境变量。

``` bash
$ printenv
LANG=zh_CN.UTF-8
HISTCONTROL=ignoredups
HISTTIMEFORMAT=%F %T shanyue
HOSTNAME=training
which_declare=declare -f
XDG_SESSION_ID=204
USER=shanyue
PWD=/home/shanyue
HOME=/home/shanyue
SSH_TTY=/dev/pts/4
MAIL=/var/spool/mail/shanyue
TERM=screen-256color
SHELL=/bin/bash
SHLVL=1
LOGNAME=shanyue
DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/1000/bus
XDG_RUNTIME_DIR=/run/user/1000
PATH=/home/shanyue/.local/bin:/home/shanyue/bin:/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin
HISTSIZE=10000
_=/usr/bin/env
```

从以上命令输出，可以看出 **环境变量命名一般为全部大写**。

我们也可以通过 `printenv`，来获得某个环境变量的值。

``` bash
$ printenv HOME
/home/shanyue
```

除此之外，通过 `$var` 或者 `${var}` 可以取得环境变量，并通过 `echo` 进行打印。

``` bash
$ echo $HOME
/home/shanyue

$ echo ${HOME}
```

## $HOME

`$HOME`，当前用户目录，也就是 `~` 目录。

``` bash
$ echo $HOME
/home/shanyue

# 以下两个命令是等价的
$ cd $HOME
$ cd ~
```

## $USER

`$USER`，即当前用户名。

``` bash
$ echo $USER
shanyue

# 该命令也可获得当前用户名
$ id --user --name
shanyue
```

## $SHELL

在 linux 中，有许多的 shell 工具，比如：

+ [bash](https://www.gnu.org/software/bash/)
+ [zsh](https://www.zsh.org/)
+ `sh`

而 `bash` 是 linux 系统内置的 shell，我们可以通过环境变量 `SHELL` 获得当前是哪一个 SHELL。

``` bash
$ echo $SHELL
/bin/bash
```

## $PATH

见 [PATH](./path.md)

