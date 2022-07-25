# Linux 技能实战

## 注意

**命令行训练最好在 linux 下完成。**

windows 可用 wsl/[cygwin](http://www.cygwin.com/install.html) 进行替代。wsl 安装教程见 [Ubuntu on WSL
](https://ubuntu.com/wsl)。cygwin 安装教程见 [Installing and Updating Cygwin Packages](http://www.cygwin.com/install.html)。

mac 可使用自带终端，但是部分命令行有使用差异，比如 `stat`、`sed` 等，而且更不支持 `pidstat`。

## 资料

+ [命令行的艺术](https://github.com/jlevy/the-art-of-command-line/blob/master/README-zh.md)
+ [explainshell](http://explainshell.com/)

## 手册

养成查看 linux 手册的习惯，对于一条不熟悉的命令，可以先通过 `man` 以及 `--help` 过一遍帮助手册。

甚至在开始之前可以通读 `man bash` 或者 [bash 官方文档](https://www.gnu.org/software/bash/manual/bash.html)

## 作业


## 必要性

Linux 技能对于前端，还是后端，都是十分必要的。

1. 环境变量。在前后端项目中都可能有一个文件 `.env` 用以设置环境变量，它是怎么工作的呢？
1. 链接。在 pnpm 中，结合软链接与硬链接大幅降低了装包的体积，它是如何做到的？
1. 全局命令行工具。在 nodejs/python/go 中都可以开发全局可执行命令，开发一个全局命令的原理是什么？
1. 端口检测。在 vue/react/next 等脚手架的开发环境，如果启动时发生端口冲突，则会重开一个端口，此种原理如何？
1. fs。在 nginx 中我们得知 last-modified 是根据 mtime 生成，那如何获得静态资源的 mtime 呢？
1. vim。如果需要在测试服务器部署测试环境，那在 linux 中使用 vim 操作必不可少。
1. tmux。如何在个人服务器启动自己服务，过了一分钟，ssh 断开，服务挂掉，这应该如何处理？
1. 内存监控。在写 Node.js 时，他人常说 Node.js 写服务更消耗内存，那如何监听到某个 Node.js 服务的 内存占用情况呢？
1. 当打开一个 URL 时发生了什么。此时有一些发生在 http/dns/tcp 协议的一些事情，我们如何通过相关命令监控这一过程呢？


