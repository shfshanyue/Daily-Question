const sidebar = [
  ['', '开篇词'],
  {
    title: '极简部署',
    collapsable: true,
    children: [
      {
        title: '第一章: 手写最简静态资源服务器',
        path: 'simple-intro'
      },
      {
        title: '第二章: 基于docker部署极简版',
        path: 'simple-docker',
      },
      {
        title: '第三章: 基于nginx镜像部署及学习',
        path: 'simple-nginx',
      }
    ]
  },
  {
    title: '单页部署',
    collapsable: true,
    children: [
      {
        title: '第四章: docker缓存优化及多阶段构建',
        path: 'cra-docker',
      },
      {
        title: '第五章: nginx 配置及长期缓存优化',
        path: 'cra-route'
      },
    ]
  },
  {
    title: '对象存储',
    collapsable: true,
    children: [
      {
        title: '第六章: 将静态资源部署在 OSS/CDN',
        path: 'oss'
      },
      {
        title: '第七章: 静态资源上传时间与空间优化',
        path: 'oss-rclone'
      },
    ]
  },
  {
    title: '服务编排',
    collapsable: true,
    children: [
      {
        title: '第八章: 服务网关 traefik 搭建',
        path: 'traefik'
      },
      {
        title: '第九章: 前端应用域名配置',
        path: 'traefik-domain'
      },
    ]
  },
  {
    title: '持续集成',
    collapsable: true,
    children: [
      {
        title: '第十章: CICD 简介与自动部署',
        path: 'ci-intro'
      },
      {
        title: '十一章: 质量保障实践',
        path: 'ci-ci'
      },
      {
        title: '十二章: CI 中的缓存',
        path: 'ci-cache'
      },
      {
        title: '十三章: CI 中的环境变量',
        path: 'ci-env'
      },
      {
        title: '十四章: 构建功能分支测试环境',
        path: 'ci-preview'
      },
    ]
  },
  {
    title: '云原生篇',
    collapsable: true,
    children: [
      {
        title: '十五章: k8s 简单概念介绍与部署',
        path: 'k8s-intro'
      },
    ]
  }
]

module.exports = {
  sidebar: {
    '/deploy/': sidebar
  }
}
