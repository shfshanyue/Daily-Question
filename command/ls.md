# 文件系统中的目录

## cd

`cd`，change directory，切换当前工作目录。

除指定目录外，还有以下特殊目录。

+ `.`: 当前工作目录。
+ `..`: 父级工作目录。
+ `/`: 根目录。
+ `~`: home 目录，即当前的用户目录，同时也可用环境变量 `$HOME` 表示。假设当前用户为 shanyue，则 ~ 目录为 `/Users/shanyue` (mac系统)。

另外，`cd -` 为进入上一次的工作目录，如同 `git checout -` 切回上次的分支一样。

``` bash
$ cd ~
$ cd -
$ cd $HOME
```

除 `cd` 外，有一个拥有强大功能切换目录的小工具 [autojump](https://github.com/wting/autojump/blob/master/bin/autojump.bash)。

`autojump` 需要进行手动下载。

``` bash
# 切换至含有 foo 子字符串的某个目录
$ j foo
```

> Q: 你知道 autojump 原理吗，你可以写出来一个 `autojump` 命令行小工具吗？

## pwd

`pwd`，print working directory，打印当前工作目录。

``` bash
# 打印当前路径，该目录为 react 源码内容
$ pwd
/Users/shanyue/Documents/react
```

## ls

`ls`，列出某个工作目录的内容。

`ls` 单指令不会列出以 `.` 开头的文件，比如 `.git`、 `.babelrc`、`.eslintrc` 均不会默认显示。**而使用 `-a`，将会把所有文件列出。**

在日常工作中，常使用 `ls -lah` 列出工作目录内容。

``` bash
# -l: 使用长列表格式
# -a: 列出所有文件，包括以 . 开头的文件
# -h: 以可读的形式表示文件体积，比如 100M
$ ls -lah
total 2176
drwxr-xr-x    36 shanyue  staff   1.1K  6 10 15:45 .
drwx------@  242 shanyue  staff   7.6K  5 29 09:37 ..
drwxr-xr-x     3 shanyue  staff    96B  6 10 15:45 .circleci
drwxr-xr-x     3 shanyue  staff    96B  6 10 15:45 .codesandbox
-rw-r--r--     1 shanyue  staff   294B  5 22  2021 .editorconfig
-rw-r--r--     1 shanyue  staff   759B  6 10 15:45 .eslintignore
-rw-r--r--     1 shanyue  staff   8.4K  6 10 15:45 .eslintrc.js
drwxr-xr-x    14 shanyue  staff   448B  6 10 15:45 .git
-rw-r--r--     1 shanyue  staff    12B  5 22  2021 .gitattributes
drwxr-xr-x     6 shanyue  staff   192B  9  8  2021 .github
-rw-r--r--     1 shanyue  staff   881B  6 10 15:45 .gitignore
-rw-r--r--     1 shanyue  staff   7.6K  5 22  2021 .mailmap
-rw-r--r--     1 shanyue  staff     9B  6 10 15:45 .nvmrc
-rw-r--r--     1 shanyue  staff   546B  6 10 15:45 .prettierignore
-rw-r--r--     1 shanyue  staff   363B  5 22  2021 .prettierrc.js
-rw-r--r--     1 shanyue  staff     3B  5 22  2021 .watchmanconfig
-rw-r--r--     1 shanyue  staff    42K  5 22  2021 AUTHORS
-rw-r--r--     1 shanyue  staff   198K  6 10 15:45 CHANGELOG.md
-rw-r--r--     1 shanyue  staff   3.5K  5 22  2021 CODE_OF_CONDUCT.md
-rw-r--r--     1 shanyue  staff   216B  5 22  2021 CONTRIBUTING.md
-rw-r--r--     1 shanyue  staff   1.1K  5 22  2021 LICENSE
-rw-r--r--     1 shanyue  staff   5.1K  6 10 15:45 README.md
-rw-r--r--     1 shanyue  staff   1.5K  6 10 15:45 ReactVersions.js
-rw-r--r--     1 shanyue  staff   400B  5 22  2021 SECURITY.md
-rw-r--r--     1 shanyue  staff   671B  9  2  2021 appveyor.yml
-rw-r--r--     1 shanyue  staff   1.0K  5 22  2021 babel.config.js
drwxr-xr-x     6 shanyue  staff   192B  9  4  2021 build
drwxr-xr-x     2 shanyue  staff    64B  9  4  2021 build2
-rw-r--r--     1 shanyue  staff   7.5K  6 10 15:45 dangerfile.js
drwxr-xr-x    23 shanyue  staff   736B  6 10 15:45 fixtures
-rw-r--r--     1 shanyue  staff   220B  5 22  2021 netlify.toml
drwxr-xr-x  1426 shanyue  staff    45K  9  2  2021 node_modules
-rw-r--r--     1 shanyue  staff   7.2K  6 10 15:45 package.json
drwxr-xr-x    39 shanyue  staff   1.2K  6 10 15:45 packages
drwxr-xr-x    22 shanyue  staff   704B  9  2  2021 scripts
-rw-r--r--     1 shanyue  staff   733K  6 10 15:45 yarn.lock
```

那在 `ls` 每一行都代表什么信息？在下一节内容讲述。

> Q: 如何配置颜色区分目录和文件呢，见下截图。
>
> ![](https://static.shanyue.tech/images/22-06-10/clipboard-5898.571b6c.webp)

## tree

`tree`，以树状图的形式列出文件。

该命令需要手动下载。

``` 
# macos
$ brew install tree

# centos
$ yum install tree
```

可通过 `-L` 指定层级，平常工作可使用以下指令。

``` bash
# -a: 列出所有文件
# -F: 对目录末尾添加 /，对可执行文件末尾添加 *
# -L: 指定层级
$ tree packages/react-dom -aF -L 2
packages/react-dom
|-- README.md
|-- client.js
|-- index.classic.fb.js
|-- index.experimental.js
|-- index.js
|-- index.modern.fb.js
|-- index.stable.js
|-- npm/
|   |-- client.js
|   |-- index.js
|   |-- profiling.js
|   |-- server.browser.js
|   |-- server.js
|   |-- server.node.js
|   |-- test-utils.js
|   `-- unstable_testing.js
|-- package.json
|-- server.browser.js
|-- server.js
|-- server.node.js
|-- src/
|   |-- __tests__/
|   |-- client/
|   |-- events/
|   |-- server/
|   |-- shared/
|   `-- test-utils/
|-- test-utils.js
|-- unstable_testing.classic.fb.js
|-- unstable_testing.experimental.js
|-- unstable_testing.js
|-- unstable_testing.modern.fb.js
`-- unstable_testing.stable.js

8 directories, 25 files
```