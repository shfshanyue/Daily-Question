# PATH

## $PATH

`$PATH` 有可能是写命令行工具最重要的环境变量。

我们打印环境变量，输出为以 `:` 分割的路径列表。

``` bash
$ echo $PATH
/home/shanyue/.local/bin:/home/shanyue/bin:/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin
```

实际上是一个路径列表，如下：

+ `/home/shanyue/.local/bin`
+ `/home/shanyue/bin`
+ `/usr/local/bin`
+ `/usr/bin`
+ `/usr/local/bin`
+ `/usr/sbin`

假设我们需要执行一个命令，我需要进入到该命令的目录，然后执行，如 `./script.sh`。

在 linux 操作系统中，有许多全局可执行的命令行工具，那我们是如何定位到这些命令的？

我们就是 **通过 `$PATH` 环境变量作为我们的全局命令执行目录**。

## 如何写一个命令行工具

那我们自己写一个全局命令行工具就有了两个思路：

1. 将自己的命令所在的目录纳入 $PATH 中
2. 将自己的命令复制到 $PATH 的某个路径中 (一般为软链接)

> Q: 你知道 `npm install -g` 全局安装的命令行为什么可以直接使用呢？

``` bash
$ ls -lah /usr/local/bin/
total 62M
drwxr-xr-x.  2 root root 4.0K Jan  8 14:04 .
drwxr-xr-x. 15 root root 4.0K May 12  2020 ..
-rwxr-xr-x   1 root root  13M Jan  8 19:04 docker-compose
lrwxrwxrwx   1 root root    3 Sep 30  2019 ex -> vim
lrwxrwxrwx   1 root root   37 Jul  9  2020 gatsby -> ../lib/node_modules/gatsby-cli/cli.js
-rwxr-xr-x   1 root root  47M Jun 15  2020 node
lrwxrwxrwx   1 root root   38 Jul 18  2020 npm -> ../lib/node_modules/npm/bin/npm-cli.js
lrwxrwxrwx   1 root root   38 Jul 18  2020 npx -> ../lib/node_modules/npm/bin/npx-cli.js
lrwxrwxrwx   1 root root    3 Sep 30  2019 rview -> vim
lrwxrwxrwx   1 root root    3 Sep 30  2019 rvim -> vim
lrwxrwxrwx   1 root root   38 Jul 13  2020 serve -> ../lib/node_modules/serve/bin/serve.js
lrwxrwxrwx   1 root root   48 Aug 15  2020 serverless -> ../lib/node_modules/serverless/bin/serverless.js
lrwxrwxrwx   1 root root   48 Aug 15  2020 sls -> ../lib/node_modules/serverless/bin/serverless.js
lrwxrwxrwx   1 root root    3 Sep 30  2019 view -> vim
-rwxr-xr-x   1 root root 2.6M Mar 25  2020 vim
lrwxrwxrwx   1 root root    3 Sep 30  2019 vimdiff -> vim
-rwxr-xr-x   1 root root 2.1K Mar 25  2020 vimtutor
-rwxr-xr-x   1 root root  19K Mar 25  2020 xxd
lrwxrwxrwx   1 root root   36 Jul 15  2020 yarn -> ../lib/node_modules/yarn/bin/yarn.js
lrwxrwxrwx   1 root root   36 Jul 15  2020 yarnpkg -> ../lib/node_modules/yarn/bin/yarn.js
```

## which

`which`，列出全局命令的完整路径。

``` bash
# 当我们执行 ps 时，实际上执行的是 /usr/bin/ps
$ which ps
/usr/bin/ps

# 当我们执行 node 时，实际上执行的是 /usr/local/bin/node
$ which node
/usr/local/bin/node
```

## 作业

1. 了解 $PATH 环境变量用途
2. 了解 which 命令用法
