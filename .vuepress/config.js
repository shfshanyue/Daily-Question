const _ = require('lodash')
const { generateSiebar } = require('./header')
const { generateSidebar: generateESidebar} = require('../data/engineering')

module.exports = {
  base: '/',
  title: '大厂面试题每日一题',
  description: '每天至少一个前端面试题，并附以答案及讨论。有关前端，后端，graphql，devops，微服务以及软技能，促进个人职业成长，敲开大厂之门。每天五分钟，半年大厂中',
  head: [
    ['link', { rel: 'shortcut icon', href: '/favicon.ico', type: 'image/x-icon' }],
    // 设置 Google 的 Search Console
    ['meta', { name: 'google-site-verification', content: '_rNB9Nt0ukzWmMfhXSSxCHUAeeMs24OiuhGm4QjdwXA' }]
  ],
  shouldPrefetch: () => false,
  bundler: '@vuepress/bundler-vite',
  themeConfig: {
    repo: 'shfshanyue/Daily-Question',
    nav: [
      { text: '主页', link: '/' },
      // { text: '周刊', link: '/weekly/' },
      { text: '前端工程化三十八讲', link: '/engineering/' },
      { text: '计算机基础', link: '/base/' },
      { text: '前端面试基础', link: '/fe/' },
      { text: '高级前端面试', link: '/server/' },
      {
        text: '更多面试题',
        items: [
          { text: 'DevOps', link: '/devops/' },
          { text: '开放式问题', link: '/open/' },
          { text: '大厂内推', link: '/infer/ali-ascp.md' },
          { text: '各地求职', link: '/job/chengdu.html' },
          { text: '面试路线图', link: '/roadmap/code.html' },
        ]
      },
      { text: '面经大全', link: '/interview.html' },
      { text: 'Apifox', link: 'https://www.apifox.cn?utm_source=shanyue-question' },
      // { text: '极客时间返现', link: 'https://geek.shanyue.tech' },
    ],
    sidebar: {
      ...generateSiebar(),
      ...generateESidebar(),
      '/job/': [
        ['chengdu', '成都大厂'],
      ],
      '/roadmap/': [
        ['code', '手写代码'],
      ],
      '/interviews/': [
        ['2017', '2017年面试记'],
        ['2018', '2018年面试记'],
        ['2019', '2019年面试记'],
        ['2020', '2020年面试记'],
        ['meituan', '2020美团面试记'],
        ['fe', '2020年整理前端面试资料'],
        ['2021-01-04', '2020裸辞面试记'],
        ['2021-01-27', '2021年初面试记'],
      ],
      '/infer/': [
        {
          "name": "头条",
          "title": "头条",
          "collabsable": false,
          "children": [
            [
              "toutiao-media-arch",
              "字节跳动-视频架构-前端"
            ],
            [
              "toutiao-dsp",
              "字节跳动-海外广告-前端"
            ]
          ]
        },
        {
          "name": "阿里",
          "title": "阿里",
          "collabsable": false,
          "children": [
            [
              "ali-ascp",
              "供应链-平台事业部"
            ]
          ]
        },
        {
          "name": "腾讯",
          "title": "腾讯",
          "collabsable": false,
          "children": [
            [
              "tencent-csig",
              "腾讯-CSIG-智慧零售-前端"
            ],
            [
              "tencent-tme",
              "腾讯-音乐-TME研发部-前端"
            ]
          ]
        }
      ],
      '/weekly/': [
        ['', '所有历史'],
        ['week1', '全栈周刊第一期'],
        ['week2', '全栈周刊第二期'],
        ['week3', '全栈周刊第三期'],
        ['week4', '全栈周刊第四期'],
        ['week5', '全栈周刊第五期'],
        ['week6', '全栈周刊第六期'],
        ['week7', '全栈周刊第七期'],
        ['week8', '全栈周刊第八期'],
        ['week9', '全栈周刊第九期'],
        ['week10', '全栈周刊第十期']
      ]
    },
    lastUpdated: 'Last Updated',
    // displayAllHeaders: true
  },
  plugins: [
    [
      'sitemap', {
        hostname: 'https://q.shanyue.tech'
      },
    ],
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
                heroText: '互联网大厂面试每日一题',
                heroImage: 'logo.png',
                tagline: '山月的全栈进阶之路',
                actionText: '历史记录  →',
                actionLink: '/engineering/',
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
      }
    }
  ]
}
