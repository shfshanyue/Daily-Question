# rsync

快速高效，支持断点续传、按需复制的文件拷贝工具，并**支持远程服务器拷贝**。

**强烈建议在本地也使用 `rsync` 替换 `cp` 进行文件拷贝。**

## 远程复制

拷贝数据，我习惯使用 `-lahzv` 结合命令。

如果需要拷贝至远程服务器，则以远程服务器名开头即可。

``` bash
# 将本地的 react 拷贝到 shanyue 服务器的 ~/Documents 目录
#
# -l：--links，拷贝符号链接
# -a：--archive，归档模式
# -h：--human-readable，可读化格式进行输出
# -z：--compress，压缩传输
# -v：--verbose，详细输出
# shanyue: 我的远程服务器
$ rsync -lahzv ~/Documents/react shanyue:/home/shanyue/Documents
```

## 归档模式

`rsync` 归档模式最大的好处是可以拷贝元属性，如 ctime/mtime/mode 等等，这对于静态资源服务器相当有用！！！

> 关于元属性，可参考 [stat](https://q.shanyue.tech/command/stat.html) 命令

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

+ 不以 `/` 结尾，代表将该目录连同目录名一起进行拷贝
+ 以 `/` 结尾，代表将该目录下所有内容进行拷贝

``` bash
# 以下以拷贝 react 目录为例
# 
# ~/Documents/abc/react
$ rsync -lahz ~/Documents/react ~/Documents/abc
$ rsync -lahz ~/Documents/react ~/Documents/abc/

# ~/Documents/abc
$ rsync -lahz ~/Documents/react/ ~/Documents/abc
$ rsync -lahz ~/Documents/react/ ~/Documents/abc/
```

## 作业

1. 熟悉 rsync 在本地及远程服务器间拷贝文件
2. 在 Node.js 或其它语言中如何实现 `cp`。参考 [fsp.cp](https://nodejs.org/api/fs.html#fspromisescpsrc-dest-options)。(cp 实际上是通过库函数 open/write 模拟实现)
3. 为何说保留复制文件时的元属性，对静态资源服务器有益
4. 在使用 rsync 传输前端项目时，如何忽略 node_modules 目录
