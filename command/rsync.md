# rsync

快速高效，支持断点续传、按需复制的文件拷贝工具，并**支持远程服务器拷贝**。

**强烈建议在本地也使用 `rsync` 替换 `cp` 进行文件拷贝。**

## 归档模式

拷贝数据。

``` bash
# 将本地的 react 拷贝到 shanyue 服务器的 ~/Documents 目录
#
# -l：--links，拷贝符号链接
# -a：--archive，归档模式
# -h：--human-readable，可读化格式进行输出
# -z：--compress，压缩传输
# shanyue: 我的远程赋予其
$ rsync -lahz ~/Documents/react shanyue:/home/shanyue/Documents
```

`rsync` 归档模式最大的好处是可以拷贝原信息，如 ctime/mtime/mode 等等，这对于静态资源服务器相当有用！！！

``` bash
# 查看其 yarn.lock 信息
$ ls -lah | grep yarn
-rwxrwxrwx  1 root root 733K Jun 10 15:47 yarn.lock

# yarn2.lock 使用 rsync 拷贝
$ rsync -lahz yarn.lock yarn2.lock
# yarn3.lock 使用 cp 拷贝
$ cp yarn.lock yarn3.lock

# 观察可知
# rsync 修改时间/mode 与源文件保持一致
# cp 修改时间为当前最新时间，mode 也不一致
$ ls -lah | grep yarn
-rwxrwxrwx  1 root root 733K Jun 10 15:47 yarn.lock
-rwxrwxrwx  1 root root 733K Jun 10 15:47 yarn2.lock
-rwxr-xr-x  1 root root 733K Jun 26 23:19 yarn3.lock
```

## 拷贝目录

拷贝目录，则需要看原目录是否以 `/` 结尾。

``` bash
# ~/Documents/abc/react
$ rsync -lahz ~/Documents/react ~/Documents/abc
$ rsync -lahz ~/Documents/react ~/Documents/abc/

# ~/Documents/abc
$ rsync -lahz ~/Documents/react/ ~/Documents/abc
$ rsync -lahz ~/Documents/react/ ~/Documents/abc/
```