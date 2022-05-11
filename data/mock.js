const sidebar = [
  ['', '须知'],
  {
    title: '2022年5月',
    collapsable: true,
    children: [
      {
        title: '043. 四年广州',
        path: '220510'
      }
    ]
  },
]

module.exports = {
  sidebar: {
    '/mock/': sidebar
  }
}
