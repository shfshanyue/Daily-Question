const header = require('./header')

module.exports = {
  base: '/',
  title: '日问',
  description: '勤学如春起之苗，不见其增，日有所长；辍学如磨刀之石，不见其损，日有所亏。',
  head: [
    ['link', { rel: 'shortcut icon', href: '/favicon.ico', type: 'image/x-icon' }]
  ],
  themeConfig: {
    repo: 'shfshanyue/Daily-Question',
    nav: [
      { text: '主页', link: '/' },
      { text: '周刊', link: '/weekly/' },
      { text: '三年面经', link: '/interviews/2018.html' },
      { text: '计算机基础', link: '/base/' },
      { text: '前端', link: '/fe/' },
      { text: '后端', link: '/server/' },
      { text: 'DevOps', link: '/devops/' },
      { text: '开放式问题', link: '/open/' },
      { text: '我的博客', link: 'https://shanyue.tech' },
      { text: '个人服务器运维指南', link: 'https://shanyue.tech/op/' },
    ],
    sidebar: {
      ...header,
      '/interviews/': [
        ['2017', '2017年面试记'],
        ['2018', '2018年面试记'],
        ['2019', '2019年面试记']
      ],
      '/weekly/': [
        ['', '所有历史'],
        ['week1', '全栈周刊第一期'],
        ['week2', '全栈周刊第二期'],
        ['week3', '全栈周刊第三期'],
        ['week4', '全栈周刊第四期'],
      ]
    },
    lastUpdated: 'Last Updated',
    // displayAllHeaders: true
  },
  plugins: [
    [ 
      '@vuepress/google-analytics',
      {
        'ga': 'UA-102193749-3'
      }
    ], 
    (options, ctx) => {
      return {
        name: 'archive',
        async additionalPages () {
          return [
            {
              path: '/',
              frontmatter: {
                home: true,
                heroText: '日问',
                heroImage: './logo.png',
                tagline: '山月的全栈进阶之路',
                actionText: '历史记录  →',
                actionLink: '/weekly/',
                features: [{
                  title: '全栈',
                  details: '见其广，知其深'
                }, {
                  title: '每日一题',
                  details: '勤学如春起之苗，不见其增，日有所长'
                }, {
                  title: '积累',
                  details: '不积跬步，无以至千里'
                }],
                footer: '暮从碧山下，山月随人归。却顾所来径，苍苍横翠微。'
              }
            }
          ]
        },
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
