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
      },
      {
        title: '046. 大二成都期望实习',
        path: '220522'
      },
      {
        title: '047. 五年深圳期望30',
        path: '220523'
      },
      {
        title: '048. 大二北京期望实习',
        path: '220528'
      }
    ]
  },
  {
    title: '2022年6月',
    collapsable: true,
    children: [
      {
        title: '050. 十年杭州',
        path: '220612'
      }
    ]
  }
]

module.exports = {
  sidebar: {
    '/mock/': sidebar
  }
}
