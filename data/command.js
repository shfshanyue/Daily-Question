const sidebar = [
  ['', '开篇词'],
  ['train', '训练营'],
  {
    title: '远程连接',
    collapsable: true,
    children: [
      {
        title: 'ssh',
        path: 'ssh',
      },
      {
        title: 'ssh 隧道',
        path: 'ssh-l'
      },
      {
        title: 'rsync',
        path: 'rsync'
      },
    ]
  },
  {
    title: '文件操作',
    collapsable: true,
    children: [
      {
        title: 'cd/ls',
        path: 'cd'
      },
      {
        title: 'stat',
        path: 'stat',
      },
      {
        title: 'user',
        path: 'user',
      },
      {
        title: 'chown',
        path: 'chmod',
      },
      {
        title: 'cat',
        path: 'cat'
      },
      {
        title: 'glob',
        path: 'glob'
      },
      {
        title: 'brace',
        path: 'brace'
      },
      {
        title: 'find',
        path: 'find'
      }
    ]
  },
  {
    title: 'shell 操作',
    collapsable: true,
    children: [
      {
        title: 'env',
        path: 'env'
      },
      {
        title: '$path',
        path: 'path'
      },
      {
        title: 'zsh/ohmyzsh',
        path: 'zsh'
      },
      {
        title: 'shortcut',
        path: 'shortcut'
      },
      {
        title: 'auto complete',
        path: 'auto-complete'
      },
    ]
  },
  {
    title: '文件编辑',
    collapsable: true,
    children: [
      {
        title: 'vim 模式与切换',
        path: 'vim-mode'
      },
      {
        title: 'vim 快速移动',
        path: 'vim-move'
      },
      {
        title: 'vim 配置指南',
        path: 'vim-settings'
      },
      {
        title: 'vim 插件必备',
        path: 'vim-plugin'
      },
      {
        title: 'tmux 分屏',
        path: 'tmux'
      },
      {
        title: 'tmux 配置',
        path: 'tmux-settings'
      }
    ]
  },
  {
    title: '系统调试',
    collapsable: true,
    children: [
      {
        title: 'curl',
        path: 'curl'
      },
      {
        title: 'dig',
        path: 'dig'
      },
      {
        title: 'nc',
        path: 'nc'
      },
      {
        title: 'ss',
        path: 'ss'
      },
      {
        title: 'top',
        path: 'top'
      },
      {
        title: 'strace/ltrace',
        path: 'strace'
      },
      {
        title: 'pidstat',
        path: 'pidstat'
      }
    ]
  }
]

module.exports = {
  sidebar: {
    '/command/': sidebar
  }
}
