const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const axios = require('axios')

const LABELS = [
  {
    name: 'open',
    alias: '开放式问题',
    group: 'open'
  },
  {
    name: 'node',
    group: 'fe'
  },
  {
    name: 'db',
    alias: '数据库',
    group: 'server'
  },
  {
    name: 'network',
    alias: '计算机网络',
    group: 'base'
  },
  {
    name: 'html',
    group: 'fe'
  },
  {
    name: 'js',
    group: 'fe'
  },
  {
    name: 'css',
    group: 'fe'
  },
  {
    name: 'server',
    alias: '后端基础',
    group: 'server'
  },
  {
    name: 'linux',
    group: 'base'
  },
  {
    name: 'git',
    group: 'base'
  },
  {
    name: 'devops',
    group: 'devops'
  },
  {
    name: 'react',
    group: 'fe'
  },
  {
    name: 'vue',
    group: 'fe'
  },
  {
    name: 'k8s',
    group: 'devops'
  },
  {
    name: 'redis',
    group: 'server'
  },
  {
    name: 'http',
    group: 'base'
  },
  {
    name: 'docker',
    group: 'devops'
  },
  {
    name: 'vim',
    group: 'base'
  },
  {
    name: 'algorithm',
    alias: '算法与数据结构',
    group: 'base'
  },
  {
    name: 'os',
    alias: '操作系统',
    group: 'base'
  },
  {
    name: 'graphql',
    group: 'server',
  },
  {
    name: 'micro-service',
    alias: '微服务',
    group: 'server'
  },
  {
    name: 'webpack',
    group: 'fe'
  },
  {
    name: '前端工程化',
    group: 'fe'
  }
]

const GROUP_MAP = {
  fe: '前端',
  server: '后端',
  devops: 'devops',
  open: '开放式问题',
  base: '计算机基础'
}

const ISSUES_QUERY = `
  query ISSUES ($after: String) { 
    repository (name: "Daily-Question", owner: "shfshanyue") {
      id
      issues (first: 100, after: $after, states: OPEN) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          number
          title
          body
          comments (first: 10) {
            nodes {
              id
              body
              reactions (content: THUMBS_UP) {
                totalCount
              }
            }
          }
          labels (first: 5) {
            nodes {
              id
              name
            }
          }
        }
      }
    }
  }
`

const fetch = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    'X-Custom-Header': 'foobar',
    Authorization: `bearer ${process.env.ACCESS_TOKEN}`,
    'Content-Type': 'application/json'
  }
})

async function getIssues (after) {
  const issues = await fetch.request({
    method: 'post',
    data: {
      query: ISSUES_QUERY,
      variables: {
        after
      }
    }
  }).then(data => {
    return data.data.data.repository.issues
  })
  let moreIssues = []
  if (issues.pageInfo.hasNextPage) {
    moreIssues = await getIssues(issues.pageInfo.endCursor)
  }
  return ([...issues.nodes, ...moreIssues]).filter(issue => issue.title.startsWith('【Q'))
}

getIssues().then(issues => {
  const labels = _.keyBy(LABELS, 'name')
  return issues.map(issue => {
    const comments = issue.comments.nodes
    return {
      ..._.omit(issue, 'comments'),
      comment: _.maxBy(comments, 'reactions.totalCount') || comments[0] || null,
      labels: issue.labels.nodes.map(label => {
        return {
          ...label,
          group: labels[label.name].group,
          alias: labels[label.name].alias
        }
      })
    }
  })
}).then(issues => {
  fs.writeFileSync(path.resolve(__dirname, '../.vuepress', 'issues.json'), JSON.stringify(issues, null, 2))
}).catch(e => {
  console.log(e)
  process.exit(1)
})
