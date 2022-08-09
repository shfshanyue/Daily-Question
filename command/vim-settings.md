# vim 配置

vim 的配置文件位于 `~/.vimrc`，在 Github 上也有诸多受欢迎的 `.vimrc` 配置。

+ [vim-config](https://github.com/shfshanyue/vim-config)：山月的 vim 配置
+ [amix/vimrc](https://github.com/amix/vimrc)：有可能是最受欢迎的 vim 配置

## leader

通过 `leader` 可配置诸多自定义的快捷键，我们一般先按下 `<leader>` 键，再按自定义键就可以完成快捷键操作。

编辑 `~/.vimrc`，添加以下内容，表示 `,` 为 `<leader>` 键。

``` vim
let mapleader=","
```

## map/nmap

在 `vim` 中可通过 `<leader>` 与 `map` 自定义快捷键，`nmap` 代表 `normal mode` 下的快捷键映射。

``` vim
" ,w：快速保存
nmap <leader>w :w!<cr>

" 配置 Y 与 D/C 一样可以从当前字符复制
nmap Y y$;
```

在 `vim` 中也可以打开多个窗口，通过 `<ctrl-w>` 与 `jkhl` 结合即可上下左右切换窗口，此时也可以通过快捷键简化操作。

``` vim
" 快速切换窗口
map <C-j> <C-W>j
map <C-k> <C-W>k
map <C-h> <C-W>h
map <C-l> <C-W>l
```

## swapfile

![](https://static.shanyue.tech/images/22-08-05/clipboard-2921.de469b.webp)

``` vim
" 不产生交换文件(当打开一个文件未正常关闭时会产生交换文件)
set noswapfile
```

## tab/space

``` vim
" tab == 2 space
set expandtab
set smarttab
set shiftwidth=2
set tabstop=2
```

## 作业

1. 如何不使 vim 产生交换文件
2. `leader` 键有什么作用

