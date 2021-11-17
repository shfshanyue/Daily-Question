const issues = require('../data/issues.json')

const sidebar = {
  "/base/": [
    [
      "",
      "目录"
    ],
    {
      "name": "algorithm",
      "title": "简单算法",
      "collabsable": false,
      "children": []
    },
    {
      "name": "data-structure",
      "title": "数据结构",
      "collabsable": false,
      "children": []
    },
    {
      "name": "network",
      "title": "计算机网络",
      "collabsable": false,
      "children": []
    },
    {
      "name": "os",
      "title": "操作系统",
      "collabsable": false,
      "children": []
    },
    {
      "name": "http",
      "title": "http 相关",
      "collabsable": false,
      "children": []
    },
    {
      "name": "linux",
      "title": "linux",
      "collabsable": false,
      "children": []
    },
    {
      "name": "shell",
      "title": "shell",
      "collabsable": false,
      "children": []
    },
    {
      "name": "git",
      "title": "git 相关",
      "collabsable": false,
      "children": []
    },
    {
      "name": "vim",
      "title": "vim",
      "collabsable": false,
      "children": []
    }
  ],
  "/server/": [
    [
      "",
      "目录"
    ],
    {
      "name": "server",
      "title": "后端基础",
      "collabsable": false,
      "children": []
    },
    {
      "name": "micro-service",
      "title": "微服务",
      "collabsable": false,
      "children": []
    },
    {
      "name": "db",
      "title": "数据库",
      "collabsable": false,
      "children": []
    },
    {
      "name": "redis",
      "title": "redis",
      "collabsable": false,
      "children": []
    },
    {
      "name": "爬虫",
      "title": "爬虫",
      "collabsable": false,
      "children": []
    },
    {
      "name": "serverless",
      "title": "serverless",
      "collabsable": false,
      "children": []
    },
    {
      "name": "c",
      "title": "C语言",
      "collabsable": false,
      "children": []
    },
    {
      "name": "graphql",
      "title": "GraphQL",
      "collabsable": false,
      "children": []
    }
  ],
  "/fe/": [
    [
      "",
      "目录"
    ],
    {
      "name": "html",
      "title": "html",
      "collabsable": false,
      "children": []
    },
    {
      "name": "css",
      "title": "css",
      "collabsable": false,
      "children": []
    },
    {
      "name": "dom",
      "title": "浏览器 DOM API",
      "collabsable": false,
      "children": []
    },
    {
      "name": "js",
      "title": "javascript",
      "collabsable": false,
      "children": []
    },
    {
      "name": "ts",
      "title": "typescript",
      "collabsable": false,
      "children": []
    },
    {
      "name": "regexp",
      "title": "简单正则",
      "collabsable": false,
      "children": []
    },
    {
      "name": "code",
      "title": "高频手写代码",
      "collabsable": false,
      "children": []
    },
    {
      "name": "react",
      "title": "React",
      "collabsable": false,
      "children": []
    },
    {
      "name": "vue",
      "title": "Vue",
      "collabsable": false,
      "children": []
    },
    {
      "name": "webpack",
      "title": "webpack",
      "collabsable": false,
      "children": []
    },
    {
      "name": "前端工程化",
      "title": "前端工程化",
      "collabsable": false,
      "children": []
    },
    {
      "name": "perf",
      "title": "性能优化",
      "collabsable": false,
      "children": []
    },
    {
      "name": "node",
      "title": "nodejs",
      "collabsable": false,
      "children": []
    }
  ],
  "/devops/": [
    [
      "",
      "目录"
    ],
    {
      "name": "devops",
      "title": "devops",
      "collabsable": false,
      "children": []
    },
    {
      "name": "docker",
      "title": "docker",
      "collabsable": false,
      "children": []
    },
    {
      "name": "k8s",
      "title": "k8s",
      "collabsable": false,
      "children": []
    }
  ],
  "/open/": [
    [
      "",
      "目录"
    ],
    {
      "name": "open",
      "title": "开放式问题",
      "collabsable": false,
      "children": []
    }
  ]
}

function generateSiebar () {
  const labelSidebar = Object.values(sidebar).flat()
  labelSidebar.forEach(sidebar => {
    if (sidebar.children) {
      const children = issues.filter(x => {
        return x.labels.nodes.some(l => sidebar.name === l.name)
      }).map((x, i) => {
        return [
          `${sidebar.name}/${x.number}`,
          `${i}. ${x.title.slice(6)}`
        ]
      })
      sidebar.children = children
    }
  })
  return sidebar
}

exports.generateSiebar = generateSiebar
