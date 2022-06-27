# chmod/chown

## chown

`chown`，change owner。更改文件的所属用户及组。

通过 `ls` 命令，第三第四列便是文件所属用户及用户组。

``` bash
$ ls -lah .
total 1.2M
drwxr-xr-x 11 shanyue shanyue 4.0K Jun 22 18:42 .
drwxr-xr-x  5 root    root    4.0K Jun 24 11:06 ..
drwxr-xr-x  2 shanyue shanyue 4.0K Jun 10 15:45 .circleci
drwxr-xr-x  2 shanyue shanyue 4.0K Jun 10 15:45 .codesandbox
-rw-r--r--  1 shanyue shanyue  294 May 22  2021 .editorconfig
-rw-r--r--  1 shanyue shanyue  759 Jun 10 15:45 .eslintignore
-rw-r--r--  1 shanyue shanyue 8.4K Jun 10 15:45 .eslintrc.js
drwxr-xr-x  7 shanyue shanyue 4.0K Jun 14 19:06 .git
-rw-r--r--  1 shanyue shanyue   12 May 22  2021 .gitattributes
```

通过 `chown -R`，可一并将子文件所属用户及用户组进行修改。

``` bash
# 将 . 文件夹下当前目录的用户及用户组设为 shanyue
# -R：遍历子文件修改
$ chown -R shanyue:shanyue .
```

## chmod

`mode` 指 linux 中对某个文件的访问权限。

通过 `stat` 可获取某个文件的 mode。

``` bash
# -c：--format
# %a：获得数字的 mode
$ stat -c %a README.md
644

# %A：获得可读化的 mode
$ stat -c %A README.md 
-rw-r--r--
```

在了解 mode 之前，我们先看一下文件的权限。

+ r: 可读，二进制为 100，也就是 4
+ w: 可写，二进制为 010，也就是 2
+ x: 可执行，二进制为 001，也就是 1

而 linux 为多用户系统，我们可对用户进行以下分类。

+ user。文件当前用户
+ group。文件当前用户所属组
+ other。其它用户

再回到刚才的 `644` 所代表的的释义

``` bash
# rw-：当前用户可写可读，110
# r--：当前用户组可读，010
# r--：其它用户可读，010
# 所以加起来就是 644
-rw-r--r--
```

而通过 `chmod` 即可修改用户的权限。

``` bash
$ chmod 777 yarn.lock
```

另外也可以以可读化形式添加权限，如下所示：

``` bash
# u: user
# g: group
# o: other
# a: all
# +-=: 增加减少复制
# perms: 权限
$ chmod [ugoa...][[+-=][perms...]...]

# 为 yarn.lock 文件的用户所有者添加可读权限
$ chmod u+r yarn.lock
```

## 作业

1. 熟悉 cd、pwd、ls、exa、tree 等命令
2. 在 `ls` 单指令列出文件列表时为何不显示 `.git` 目录，应如何显示
3. 在 Node.js 或其它语言中如何获得 `pwd`
4. 在 Node.js 或其它语言中如何获得 `ls` 子文件列表。参考 [fsp.readdir](https://nodejs.org/api/fs.html#fspromisesreaddirpath-options) 及 [readdir](https://man7.org/linux/man-pages/man3/readdir.3.html)

