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

## printenv/echo

并可以通过 `echo` 命令进行查看。

``` bash
$ echo $A
3

$ echo ${A}
l
```

## export

我们可以通过 `export` 来设置某一个环境变量，或者说在 shell 中赋值变量。

``` bash
export A=3
```

