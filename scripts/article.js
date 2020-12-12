const fetch = require('isomorphic-unfetch')
const fs = require('fs')
const _ = require('lodash')

const allPosts = require('../data/interview.json')

async function getPosts (cursor = '') {
  const { data, has_more, cursor: nextCursor, err_no } = await fetch('https://api.juejin.cn/recommend_api/v1/article/recommend_tag_feed', {
    headers: {
      'content-type': 'application/json',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'
    },
    body: JSON.stringify({
      cursor: cursor,
      id_type: 2,
      sort_type: 0,
      tag_ids: ["6809640404791590919"],
      limit: 5000
    }),
    method: 'POST',
  }).then(res => res.json())
  if (err_no) {
    return []
  }
  const posts = data.map(article => {
    const tag = article.tags.map(x => x.tag_name)
    const fe = [
      "React.js",
      "Node.js",
      "Vue.js",
      "HTML",
      "CSS",
      "JavaScript",
      "前端"
    ]
    const backend = [
      "后端",
      "Java",
      "算法",
      "设计模式",
      "微服务",
      "Spring",
      "后端"
    ]
    const mobile = [
      "Android",
      "IOS",
      "iOS",
    ]

    const tags = []
    if (_.intersection(fe, tag).length) {
      tags.push('前端')
    }
    if (_.intersection(backend, tag).length) {
      tags.push('后端')
    }
    if (_.intersection(mobile, tag).length) {
      tags.push('移动端')
    }
    return {
      id: article.article_id,
      star: article.article_info.digg_count,
      title: article.article_info.title,
      link: `https://juejin.cn/post/${article.article_id}`,
      tags
    }
  })
  const morePosts = []
  if (has_more) {
    morePosts = await getPosts(nextCursor)
  }
  return [...morePosts, ...posts].filter(article => article.star > 100)
}

async function main () {
  const posts = await getPosts()
  fs.writeFileSync('./data/interview.json', JSON.stringify(_.sortBy(posts, x => -1 * x.star), null, 2))
}

main().then(o => console.log('OK')).catch(e => {
  console.error(e)
  console.log('Exit')
})