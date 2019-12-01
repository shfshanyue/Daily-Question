const header = require('./header')

module.exports = {
  base: '/',
  title: '日问',
  description: '东坡云：事如春梦了无痕，技术积累也是如此，于是在此略作整理。浮生六记中有一句：见藐小微物，必细查其纹理，其中对技术不仅要如琢如磨如切如磋，也记录一些物外之趣。',
  head: [
    ['link', { rel: 'shortcut icon', href: '/favicon.ico', type: 'image/x-icon' }]
  ],
  themeConfig: {
    repo: 'shfshanyue/Daily-Question',
    nav: [
      { text: '主页', link: '/' },
      { text: '计算机基础', link: '/base/2' },
      { text: '前端', link: '/fe/1' },
      { text: '后端', link: '/server/6' },
      { text: 'DevOps', link: '/devops/9' },
      { text: '关于我', link: 'https://shanyue.tech/about' },
      { text: '个人服务器运维指南', link: 'https://shanyue.tech/op/' },
    ],
    sidebar: header,
    lastUpdated: 'Last Updated',
    // displayAllHeaders: true
  },
  plugins: [
    [ 
      '@vuepress/google-analytics',
      {
        'ga': 'UA-102193749-2'
      }
    ], 
    (options, ctx) => {
      return {
        name: 'archive',
        extendPageData ($page) {
          if ($page.frontmatter.keywords) {
            const meta = $page.frontmatter.meta
            $page.frontmatter.meta = meta ? [
              ...meta,
              {
                name: 'keywords',
                content: $page.frontmatter.keywords
              }
            ] : [
              {
                name: 'keywords',
                content: $page.frontmatter.keywords
              }
            ]
          }
          if (/^\/(post|code)\/.+?$/.test($page.path)) {
            $page.frontmatter.sidebar = 'auto'
          }
          if (/^\/op\/.+?$/.test($page.path)) {
            $page.frontmatter.metaTitle = `${$page.title} | 个人服务器运维指南 | 山月行`
          }
        }
      }
    }
  ]
}
