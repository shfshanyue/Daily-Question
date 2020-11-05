const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const axios = require('axios')

const LABELS = require('../.vuepress/labels')

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
    Authorization: `bearer ${process.env.ACCESS_TOKEN}`,
    'Content-Type': 'application/json'
  }
})

async function getIssues (after) {
  const query = `
    query ISSUES ($after: String) { 
      repository (name: "Daily-Question", owner: "shfshanyue") {
        id
        issues (first: 100, after: $after) {
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
                author {
                  login
                  url
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
  const issues = await fetch.request({
    method: 'post',
    data: {
      query,
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
                comments {
                  totalCount
                }
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
    const children = _.get(label, 'issues.nodes').map(x => [`${label.name}/${x.number}`, x.title.slice(6) + (x.comments.totalCount ? '⭐️' : '')])
    try {
      return {
        name: label.name,
        title: allLabels[label.name].alias || label.name,
        collabsable: false,
        children: [[`${label.name}/`, '目录'], ...children]
      }
    } catch (e) {
      console.log(label)
      return
    }
  }).filter(x => x)
  const groups = _.groupBy(_.sortBy(headers, 'name'), label => `/${allLabels[label.name].group}/`)
  for (const group of _.keys(groups)) {
    groups[group] = [
      ['', '目录'],
      ...groups[group]
    ]
  }
  fs.writeFileSync(path.resolve(__dirname, '../.vuepress', 'header.json'), JSON.stringify(groups, null, 2))
}

// 根据 Issue 生成 Markdown
function getIssueMd (issue) {
  const title = `# ${issue.title.slice(6)}`
  const body = issue.body && `::: tip 更多描述 \r\n ${issue.body} \r\n:::`
  const more = `::: tip Issue \r\n 欢迎在 Issue 中交流与讨论: [Issue ${issue.number}](https://github.com/shfshanyue/Daily-Question/issues/${issue.number}) \r\n:::`
  const comments = _.get(issue, 'comments.nodes', [])
  const comment = comments.length > 0 ? (_.maxBy(comments, 'reactions.totalCount') || comments[0]): ''
  const author = comment ?  `::: tip Author \r\n回答者: [${comment.author.login}](${comment.author.url}) \r\n:::` : ''
  const md = [title, body, more, author, comment.body].join('\r\n\r\n')
  return md
}

// 逻辑和 getIssueMd 有重复，最好重写...
async function generateIssues (issues) {
  const newIssues = issues.map(issue => {
    const comments = _.get(issue, 'comments.nodes', [])
    const comment = comments.length > 0 ? (_.maxBy(comments, 'reactions.totalCount') || comments[0]): ''
    labels = issue.labels.nodes
    const x = {
      ..._.omit(issue, ['comments']),
      comment,
      labels
    }
    return x
  })
  fs.writeFileSync(path.resolve(__dirname, '../.vuepress', 'issues.json'), JSON.stringify(newIssues, null, 2))
}

// 生成所有的 Markdown
async function generateMd () {
  const issues = await getIssues()
  const labels = _.keyBy(LABELS, 'name')
  const dir = path.resolve(__dirname, '..')

  await generateIssues(issues)

  // 创建目录
  for (const label of LABELS) {
    const d = path.resolve(dir, label.group, label.name)
    if (!fs.existsSync(d)) {
      fs.mkdirSync(d, {
        recursive: true
      })
    }
  }

  // 创建 category 目录
  for (const group of _.keys(GROUP_MAP)) {
    const title = `# ${GROUP_MAP[group]}常见面试题总结\n`
    const content = issues.filter(x => {
      try {
        return x.labels.nodes.some(label => labels[label.name].group === group)
      } catch (e) {
        console.log(x)
        console.log(e)
        console.log('这个 Issue 应该没有打标签')
        return true
      }
    }).map(issue => {
      const labelName = issue.labels.nodes.filter(label => labels[label.name].group === group)[0].name
      return `+ [${issue.title}](${labelName}/${issue.number}.html)`
    }).join('\n')
    const md = title + content
    fs.writeFileSync(path.resolve(dir, group, 'Readme.md'), md)
  }

  // 创建 tag 目录
  for (const label of LABELS) {
    const title = `# ${label.name}常见面试题总结\n`
    const content = issues.filter(x => {
      return x.labels.nodes.some(l => label.name === l.name)
    }).map(issue => {
      return `+ [${issue.title}](${issue.number}.html)`
    }).join('\n')
    const md = title + content
    fs.writeFileSync(path.resolve(dir, label.group, label.name, 'Readme.md'), md)
  }

  // 创建 history.md
  const historyMd = '# 互联网大厂面试题目汇总\n' + issues.map(issue => {
    try {
      return `+ [${issue.title}](../${labels[issue.labels.nodes[0].name].group}/${issue.labels.nodes[0].name}/${issue.number}.html)`
    } catch (e) {
      console.log(issue)
      throw e
    }
  }).join('\n')
  fs.writeFileSync(path.resolve(__dirname, '../weekly', 'Readme.md'), historyMd)

  for (const issue of issues) {
    const md = getIssueMd(issue)
    for (const label of issue.labels.nodes) {
      const group = labels[label.name].group
      fs.writeFileSync(path.resolve(dir, group, label.name, `${issue.number}.md`), md)
    }
  }
}

generateMd()
generateHeaders()
