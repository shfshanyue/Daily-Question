const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const prettier = require('prettier')

const LABELS = require('../data/labels')
const labels = _.keyBy(LABELS, 'name')
const issues = require('../data/issues.json')
const meta = require('../data/meta.json')

const GROUP_MAP = {
  fe: '前端',
  server: '后端',
  devops: 'devops',
  open: '开放式问题',
  base: '计算机基础'
}

// 根据 Issue 生成 Markdown
function generateIssueMd (issue) {
  const description = _.get(meta, issue.number)
  const frontmatter = `
---
title: "${issue.title} | ${issue.labels.nodes.map(x => x.name).join(',')}高频面试题"
description: "${description ? description.description + ' ' + (description.keyword || '') : issue.title} 字节跳动面试题、阿里腾讯面试题、美团小米面试题。"
---
  `
  const title = `# ${issue.title.slice(6)}`
  const body = issue.body && `::: tip 更多描述 \r\n ${issue.body} \r\n::: `
  const more = `::: tip Issue \r\n 欢迎在 Gtihub Issue 中回答此问题: [Issue ${issue.number}](https://github.com/shfshanyue/Daily-Question/issues/${issue.number}) \r\n:::`
  const comments = _.get(issue, 'comments.nodes', []).map(comment => {
    const author = comment && comment.author ? `::: tip Author \r\n回答者: [${comment.author.login}](${comment.author.url}) \r\n:::` : ''
    const body = comment.body
    return `${author}\n\n${body}`
  })
  const md = [frontmatter, title, body, more, ...comments].join('\n\n')
  return md
}

function generateCatagoryReadme (group, issues) {
  const title = `# ${GROUP_MAP[group]}常见面试题总结\n`
  const content = issues.map(issue => {
    const labelName = issue.labels.nodes.find(label => labels[label.name].group === group).name
    return `+ [${issue.title}](${labelName}/${issue.number}.html)`
  }).join('\n')
  const md = title + content
  fs.writeFileSync(path.resolve(group, 'Readme.md'), md)
}

function generateLabelReademe (label, issues) {
  const title = `# ${label.name}常见面试题总结\n`
  const content = issues.filter(x => {
    return x.labels.nodes.some(l => label.name === l.name)
  }).map(issue => {
    return `+ [${issue.title}](${issue.number}.html)`
  }).join('\n')
  const md = title + content
  fs.writeFileSync(path.resolve(label.name, 'Readme.md'), md)
}

// 生成所有的 Markdown
async function generateMd () {
  const labels = _.keyBy(LABELS, 'name')
  const files = []
  const dir = path.resolve(__dirname, '..')

  // 创建目录
  for (const label of LABELS) {
    const d = path.resolve(dir, label.group, label.name)
    if (!fs.existsSync(d)) {
      fs.mkdirSync(d, {
        recursive: true
      })
    }
  }

  for (const issue of issues) {
    const md = generateIssueMd(issue)
    for (const label of issue.labels.nodes) {
      const group = labels[label.name].group
      files.push([path.resolve(dir, group, label.name, `${issue.number}.md`), md])
    }
  }

  const format = content => prettier.format(content, { parser: 'markdown' })

  for (const file of files) {
    fs.writeFileSync(file[0], format(file[1]))
  }
}

generateMd()
