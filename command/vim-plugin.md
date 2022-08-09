# vim 插件推荐

通过前序文章，已经可以很好地通过 `vim` 来编辑文件。

但是，如何需要直接使用 vim 来直接编写项目，还需要诸多插件。

+ [vim-config](https://github.com/shfshanyue/vim-config)：山月的 vim 配置
+ [amix/vimrc](https://github.com/amix/vimrc)：有可能是最受欢迎的 vim 配置

## [pathogen](https://github.com/tpope/vim-pathogen)

用以管理 vim 插件。

以下配置 vim 插件路径为 `~/.vim-config/plugins/`，以后将插件下载在该目录即可。

``` vim
" 配置 runtimepath
set rtp+=~/.vim-config/plugins/vim-pathogen

call pathogen#infect('~/.vim-config/plugins/{}')
call pathogen#helptags()
```

## [nerdtree](https://github.com/scrooloose/nerdtree)

`nerdtree`，文件目录管理器

+ `,nn` 切换文件管理器窗口，类似于sublime的 `Command + k + b`
+ `,nf` 定位当前文件的位置

在文件管理窗口

+ `ma` 新建文件或文件夹
+ `md` 删除文件或文件夹
+ `I` 切换隐藏文件显示状态
+ `i` 打开水平面板
+ `s` 打开垂直面板

## [ctrlp.vim](https://github.com/kien/ctrlp.vim)

`ctrlp`，类似于 `vscode` 的 `<Ctrl-p>`

+ `<c-p>` 在当前项目下查找文件
+ `,b` 在buffer中查找文件
+ `,f` 在最近打开文件中查找

在ctrlp窗口中，`<c-j>` 和 `<c-k>` 控制上下移动。

## [ag.vim](https://github.com/rking/ag.vim)

查找关键字，类似于sublime的 `Command + Shift + f`

+ `Ag key *.js` 在特定文件下查找关键字

> Tip：首先需要安装 Ag 命令，即 [the_silver_searcher](https://github.com/ggreer/the_silver_searcher)

## [vim-commentary](https://github.com/tpope/vim-commentary)

注释命令

+ `:gcc` 注释当前行，类似于sublime的 `<c-/>`

## [vim-fugitive](https://github.com/tpope/vim-fugitive)

git扩展

+ `:Gblame` 查看当前行的归属
+ `:Gdiff` 查看与工作区文件的差异
+ `:Gread` 相当于 `git checkout -- file`
+ `:Gwrite` 相当于 `git add file`

## [emmet-vim](https://github.com/mattn/emmet-vim)

+ `<c-y>,` 类似于sublime的 `<c-e>`

### [delimitMate](https://github.com/Raimondi/delimitMate)

括号，引号自动补全。

## [vim-colors-solarized](https://github.com/altercation/vim-colors-solarized)

可更改配置文件中 background 为 `dark` 和 `light` 切换主题

