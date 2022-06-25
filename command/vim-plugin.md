# vim 插件推荐

## [nerdtree](https://github.com/scrooloose/nerdtree)

<img width="600" src="https://raw.githubusercontent.com/shfshanyue/op-note/master/assets/vim-nerdtree.gif" loading="lazy">

`nerdtree`，文件目录管理器

+ `,nn` 切换文件管理器窗口，类似于sublime的 `Command + k + b`
+ `,nf` 定位当前文件的位置

在文件管理窗口

+ `ma` 新建文件或文件夹
+ `md` 删除文件或文件夹
+ `I` 切换隐藏文件显示状态

## [ctrlp.vim](https://github.com/kien/ctrlp.vim)

<img width="600" src="https://raw.githubusercontent.com/shfshanyue/op-note/master/assets/vim-ctrlp.gif" loading="lazy">

`ctrlp`，类似于 `vscode` 的 `<Ctrl-p>`

+ `<c-p>` 在当前项目下查找文件
+ `,b` 在buffer中查找文件
+ `,f` 在最近打开文件中查找

在ctrlp窗口中，`<c-j>` 和 `<c-k>` 控制上下移动。

### [ag.vim](https://github.com/rking/ag.vim)

<img width="600" src="https://raw.githubusercontent.com/shfshanyue/op-note/master/assets/vim-ag.gif" loading="lazy">

查找关键字，类似于sublime的 `Command + Shift + f`

+ `Ag key *.js` 在特定文件下查找关键字

注：首先需要安装 [the_silver_searcher](https://github.com/ggreer/the_silver_searcher)

### [vim-commentary](https://github.com/tpope/vim-commentary)

注释命令

+ `:gcc` 注释当前行，类似于sublime的 `<c-/>`

### [vim-fugitive](https://github.com/tpope/vim-fugitive)

<img width="600" src="https://raw.githubusercontent.com/shfshanyue/op-note/master/assets/vim-git.gif" loading="lazy">

git扩展

+ `:Gblame` 查看当前行的归属
+ `:Gdiff` 查看与工作区文件的差异
+ `:Gread` 相当于 `git checkout -- file`
+ `:Gwrite` 相当于 `git add file`

### [emmet-vim](https://github.com/mattn/emmet-vim)

+ `<c-y>,` 类似于sublime的 `<c-e>`

### [delimitMate](https://github.com/Raimondi/delimitMate)

括号，引号自动补全

### [vim-colors-solarized](https://github.com/altercation/vim-colors-solarized)

<img width="600" src="https://raw.githubusercontent.com/shfshanyue/op-note/master/assets/vim-dark.png" loading="lazy">

可更改配置文件中 background 为 `dark` 和 `light` 切换主题