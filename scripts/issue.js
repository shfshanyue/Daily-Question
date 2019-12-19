const argv = require('yargs').argv
const _ = require('lodash')

const issues = require('../.vuepress/issues.json')

const issuesById = _.keyBy(issues, 'number')
const flatIssues = _.flatMap(issues, issue => _.map(issue.labels, label => _.omit({ ...issue, label }, '')))
const issuesByLabel = _.groupBy(flatIssues, 'label.name')
const issuesByGroup = _.groupBy(flatIssues, 'label.group')

function getComment (comment) {
  if (comment) {
    const author = `By Author [${comment.author.login}](${comment.author.url})\n\n`
    const commentBody = comment.body.replace(/\n#/g, '\n##')
    return author + commentBody
  }
}

function getIssueMd (issue) {
  const title = `## ${issue.title}`
  const body = issue.body && `<blockquote> 更多描述: ${issue.body} </blockquote>`
  const more = `> 在 Issue 中交流与讨论: [答案解析](https://github.com/shfshanyue/Daily-Question/issues/${issue.number})`
  const comment = getComment(issue.comment)
  const md = _.compact([title, body, more, comment]).join('\n\n')
  return md
}

function getIssuesMd (issues) {
  return issues.map(issue => getIssueMd(issue)).join('\n\n')
}

function main() {
  if (argv.n) {
    const n = String(argv.n)
    const ids = _.includes(n, '-') ? _.range(...n.split('-')) : n.split(',')
    const md = getIssuesMd(_.map(ids, id => _.get(issuesById, id)))
    console.log(md)
  }
  if (argv.label) {
    const issues = issuesByLabel[argv.label]
    const md = getIssuesMd(issues)
    console.log(md)
  }
}

main()
