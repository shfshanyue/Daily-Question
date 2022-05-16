const sidebar = [
  ['', '须知'],
  {
    title: '2022年5月',
    collapsable: true,
    children: [
      {
        title: '043. 四年广州期望21',
        path: '220510'
      },
      {
        title: '044. 两年广州期望14',
        path: '220511'
      },
      {
        title: '045. 大三重庆期望实习',
        path: '220518'
      }
    ]
  },
]

module.exports = {
  sidebar: {
    '/mock/': sidebar
  }
}
