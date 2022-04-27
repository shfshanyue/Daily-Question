const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const prettier = require('prettier')

const LABELS = require('../data/labels')
const labels = _.keyBy(LABELS, 'name')
const issues = require('../data/issues.json')
const meta = require('../data/meta.json')
const { getItems } = require('../data/engineering')

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

function generateEngineeringIssueMd (issue) {
  const frontmatter = `---
title: "${issue.title.slice(6)} | 前端工程化三十八讲"
---
  `
  const title = `# ${issue.title.slice(6)}`
  const body = issue.body && `::: tip 更多描述 \r\n ${issue.body} \r\n::: `
  const more = `::: tip Issue \r\n 欢迎在 Gtihub Issue 中回答或反馈问题: [Issue ${issue.number}](https://github.com/shfshanyue/Daily-Question/issues/${issue.number}) \r\n:::`
  const comment = _.maxBy(_.get(issue, 'comments.nodes', []).filter(comment => {
    return _.get(comment, 'author.login') === 'shfshanyue'
  }), x => x.star.totalCount)
  const bilibili = issue.b ? `::: tip 视频讲解\r\n<iframe src="//player.bilibili.com/player.html?bvid=${issue.b}" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="allowfullscreen" style="width: 100%;aspect-ratio: 4 / 3;margin: 1rem 0;"></iframe>\r\n:::` : ''
  const code = issue.code ? `::: tip Code\r\n可点击此处查看[示例或实践代码](${issue.code})\r\n:::` : ''
  const md = [frontmatter, title, body, more, code, bilibili, comment?.body || ''].join('\n\n')
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

  const engineeringItems = getItems().map(x => x.number)
  const engineeringItemsById = _.keyBy(getItems(), x => x.number)

  for (const issue of issues) {
    const md = generateIssueMd(issue)
    for (const label of issue.labels.nodes) {
      const group = labels[label.name].group
      files.push([path.resolve(dir, group, label.name, `${issue.number}.md`), md])
    }
    if (engineeringItems.includes(issue.number)) {
      issue.b = engineeringItemsById[issue.number].b
      issue.code = engineeringItemsById[issue.number].code
      const md = generateEngineeringIssueMd(issue)
      files.push([path.resolve(dir, 'engineering', `${issue.number}.md`), md])
    }
  }

  const format = content => prettier.format(content, { parser: 'markdown' })

  for (const file of files) {
    // 138 先不用做格式化
    fs.writeFileSync(file[0], file[0].includes('138') ? file[1] : format(file[1]))
  }
}

generateMd()
