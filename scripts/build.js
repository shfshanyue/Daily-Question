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
    name: 'micro service',
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

const fetch = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    'X-Custom-Header': 'foobar',
    Authorization: 'bearer c6e242721eff8c5639751a2adfec13add93e0ac0',
    'Content-Type': 'application/json'
  }
})

function getIssues () {
  const query = `
    query ISSUES { 
      repository (name: "Daily-Question", owner: "shfshanyue") {
        id
        issues (first: 100) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            id
            number
            title
            body
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
  return fetch.request({
    method: 'post',
    data: { query }
  }).then(data => {
    return data.data.data.repository.issues.nodes.filter(issue => issue.title.startsWith('【Q'))
  })
}

function getLables () {
  const query = `
    query LABLES { 
      repository (name: "Daily-Question", owner: "shfshanyue") {
        id
        labels (first: 100) {
          nodes {
            id
            name
            issues (first: 100, states: OPEN) {
              nodes {
                id
                number
                title
              }
            }
          }
        }
      }
    }
  `

  return fetch.request({
    method: 'post',
    data: { query }
  }).then(data => {
    return data.data.data.repository.labels.nodes
  })
}

async function generateHeaders () {
  const labels = await getLables()
  const allLabels = _.keyBy(LABELS, 'name')
  const headers = _.map(labels, label => {
    return {
      name: label.name,
      title: allLabels[label.name].alias || label.name,
      collabsable: false,
      children: _.get(label, 'issues.nodes').map(x => ['${label.name}-${x.number}', x.title.slice(6)])
    }
  })
  const groups = _.groupBy(_.sortBy(headers, 'name'), label => `/${allLabels[label.name].group}/`)
  fs.writeFileSync(path.resolve(__dirname, '../.vuepress', 'header.json'), JSON.stringify(groups, null, 2))
}

async function generateMd () {
  const issues = await getIssues()
  const labels = _.keyBy(LABELS, 'name')
  const dir = path.resolve(__dirname, '..')
  for (const group of _.keys(GROUP_MAP)) {
    const d = path.resolve(dir, group)
    if (!fs.existsSync(d)) {
      fs.mkdirSync(d)
    }
  }
  const allIssues = _.keyBy(_.map(issues, issue => _.pick(issue, ['title', 'number'])), 'number')
  fs.writeFileSync(path.resolve(__dirname, '../.vuepress', 'issues.json'), JSON.stringify(allIssues, null, 2))
  for (const issue of issues) {
    const body = issue.body && `::: tip 更多描述 \r\n ${issue.body} \r\n:::`
    const md = `# ${issue.title}\r\n\r\n${body}`
    for (const label of issue.labels.nodes) {
      const group = labels[label.name].group
      fs.writeFileSync(path.resolve(dir, group, `${label.name}-${issue.number}.md`), md)
    }
  }
}

generateMd()
generateHeaders()
