const _ = require('lodash')
const header = require('./header')
const issues = require('./issues')
const labels = require('./labels')

const issuesByNumber = _.keyBy(issues, 'number')
const labelsByName = _.keyBy(labels, 'name')
const GROUP_MAP = {
  fe: '前端',
  server: '后端',
  devops: 'devops',
  open: '开放式问题',
  base: '计算机基础'
}


const desc = '每天至少一个问题，有关前端，后端，graphql，devops，微服务以及软技能，促进个人职业成长，敲开大厂之门。'

module.exports = {
  base: '/',
  title: '大厂面试每日一题',
  description: desc,
  head: [
    ['link', { rel: 'shortcut icon', href: '/favicon.ico', type: 'image/x-icon' }],
    // 设置 Google 的 Search Console
    ['meta', { name: 'google-site-verification', content: '_rNB9Nt0ukzWmMfhXSSxCHUAeeMs24OiuhGm4QjdwXA'}]
  ],
  themeConfig: {
    repo: 'shfshanyue/Daily-Question',
    nav: [
      { text: '主页', link: '/' },
      { text: '周刊', link: '/weekly/' },
      // { text: '三年面经', link: '/interviews/2018.html' },
      { text: '大厂面经', link: '/interview.html' },
      { text: '大厂内推', link: '/infer/ali-ascp.md' },
      { text: '计算机基础', link: '/base/' },
      { text: '前端', link: '/fe/' },
      { text: '后端', link: '/server/' },
      { text: 'DevOps', link: '/devops/' },
      { text: '开放式问题', link: '/open/' },
      { text: '山月的博客', link: 'https://shanyue.tech' },
      { text: '极客时间返现', link: 'https://geek.shanyue.tech' },
    ],
    sidebar: {
      ...header,
      '/interviews/': [
        ['2017', '2017年面试记'],
        ['2018', '2018年面试记'],
        ['2019', '2019年面试记']
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
          const number = $page.path.split(/[\/\.]/g)[3]

          // 根据 Issues 设置 TDK
          if (/\d+/.test(number)) {
            const issue = _.get(issuesByNumber, number, {})
            const labels = _.flatMap(issue.labels, label => {
              if (!label) { return null }
              label = labelsByName[label.name]
              const labels = [label.alias, label.name, GROUP_MAP[label.group]]
              return labels
            }).filter(_.identity)
            const keywords = issue.title.slice(6).split(/[,，!！?？]/g)
            $page.frontmatter.meta = [{
              name: 'keywords',
              content: ['大厂面试', ...labels, ...keywords].join(',')
            }, {
              name: 'google-site-verification',
              content: '_rNB9Nt0ukzWmMfhXSSxCHUAeeMs24OiuhGm4QjdwXA'
            }]
            $page.frontmatter.description = issue.body || _.slice(_.get(issue.comment, 'body', issue.title), 0, 240).join('')
          }
        }
      }
    }
  ]
}
