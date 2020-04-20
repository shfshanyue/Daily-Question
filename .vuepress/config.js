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
  title: '日问',
  description: desc,
  head: [
    ['link', { rel: 'shortcut icon', href: '/favicon.ico', type: 'image/x-icon' }]
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
      '/infer/': [
        {
          "name": "阿里",
          "title": "阿里",
          "collabsable": false,
          "children": [
            [
              "ali-ascp",
              "供应链平台事业部"
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
          const number = $page.path.split(/[\/\.]/g)[3]
          if (/\d+/.test(number)) {
            const issue = _.get(issuesByNumber, number, {})
            const labels = _.flatMap(issue.labels, label => {
              if (!label) { return null }
              label = labelsByName[label.name]
              const labels = [label.alias, label.name, GROUP_MAP[label.group]]
              return labels
            }).filter(_.identity)
            $page.frontmatter.meta = [{
              name: 'keywords',
              content: ['大厂面试', '每日一题', ...labels].join(',')
            }]
            $page.frontmatter.description = issue.body | _.slice(_.get(issue.comment, 'body', desc), 0, 240) 
          }
        }
      }
    }
  ]
}
