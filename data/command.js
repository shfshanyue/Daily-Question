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
        title: 'user',
        path: 'user',
      },
      {
        title: 'stat',
        path: 'stat',
      },
      {
        title: 'chown',
        path: 'chmod',
      },
      {
        title: 'ln',
        path: 'ln',
      },
      {
        title: 'cat',
        path: 'cat'
      },
      {
        title: 'pipe',
        path: 'pipe'
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
    collapsable: false,
    children: [
      {
        title: 'zsh/ohmyzsh',
        path: 'zsh'
      },
      {
        title: 'shortcut-key',
        path: 'shortcut-key'
      },
      {
        title: 'env',
        path: 'env'
      },
      {
        title: 'export',
        path: 'export'
      },
      {
        title: '$PATH',
        path: 'path'
      },
      {
        title: 'quote',
        path: '引号与括号'
      },
      {
        title: '数组与字典',
        path: 'array'
      },
      {
        title: 'if 与 for',
        path: 'forif'
      },
      {
        title: '函数',
        path: 'function'
      },
    ]
  },
  {
    title: '文件编辑',
    collapsable: false,
    children: [
      {
        title: 'vim 模式',
        path: 'vim-mode'
      },
      {
        title: 'vim 移动',
        path: 'vim-move'
      },
      {
        title: 'vim 配置',
        path: 'vim-settings'
      },
      {
        title: 'vim 插件',
        path: 'vim-plugin'
      },
      {
        title: 'tmux 分屏',
        path: 'tmux'
      },
      {
        title: 'tmux 命令',
        path: 'tmux-command'
      },
      {
        title: 'tmux 配置',
        path: 'tmux-settings'
      }
    ]
  },
  {
    title: '系统调试',
    collapsable: false,
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
