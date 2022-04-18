const once = require('lodash/once')

const sidebar = [
  {
    title: '打包篇',
    collapsable: false, 
    children: [
      {
        title: '第一章: 打包器的资源处理',
        description: '以打包器的视角而言，一切皆是模块，那像 Rollup、Webpack 这样的构建工具，是如何将 Javascript、CSS、HTML 作为模块处理的呢？作为构建工具，如何提升构建速度呢？',
        children: [
          {
            title: '模块化方案',
            number: 475,
            b: 'BV1hU4y1T7yn'
          },
          {
            title: 'AST 及其应用',
            number: 756,
            b: 'BV1gb4y1B7Jk'
          },
          {
            title: '原理与运行时分析',
            number: 729,
            code: 'https://github.com/shfshanyue/node-examples/blob/master/engineering/webpack/cjs/example/main.js',
            b: 'BV1o44y1Y7Zs'
          },
          {
            title: '运行时 Chunk 加载分析',
            number: 733,
            code: 'https://github.com/shfshanyue/node-examples/blob/master/engineering/webpack/code-spliting/build.js',
            b: 'BV1k44y1h7DW'
          },
          {
            title: '加载非JS资源: JSON与图片',
            number: 736,
            code: 'https://github.com/shfshanyue/mini-code/tree/master/code/json-loader',
            b: 'BV1FS4y1971G'
          },
          {
            title: '加载非JS资源: Style',
            number: 737,
            code: 'https://github.com/shfshanyue/node-examples/tree/master/engineering/webpack/style',
            b: 'bv1Wr4y1X7mY'
          },
          {
            title: '将脚本注入 HTML 的处理',
            number: 735,
            code: 'https://github.com/shfshanyue/mini-code/tree/master/code/html-webpack-plugin',
            b: 'BV1rY411p7vc'
          },
          {
            title: 'Hot Module Reload',
            number: 79,
            code: 'https://github.com/shfshanyue/node-examples/tree/master/engineering/webpack/hmr',
            b: 'BV1R341147T3'
          },
          {
            title: '构建性能优化',
            number: 738,
          }
        ]
      },
      {
        title: '第二章: 打包体积优化',
        description: '在网站性能优化中，最重要的一条是首屏时间优化，而更少的资源，意味着更少的网络负载及更快的网站打开速度。',
        children: [
          {
            title: '打包体积分析',
            number: 755
          },
          {
            title: 'Javascript 压缩',
            number: 138,
            b: 'BV1U3411s7Y1'
          },
          {
            title: 'Tree Shaking',
            number: 87,
            b: 'BV1wF41167eb',
            code: 'https://github.com/shfshanyue/node-examples/tree/master/engineering/webpack/tree-shaking'
          },
          {
            title: 'Polyfill: corejs',
            number: 734
          },
          {
            title: 'browserslist 垫片体积控制',
            number: 757
          }
        ]
      },
      {
        title: '第三章: Bundless 基础设施建设',
        description: '随着浏览器对 ESM 的原生支持，Vite 如此的打包器也顺势而生，那 Bundless 有哪些优缺点与注意事项呢？',
        children: [
          {
            title: '原理与浏览器中的 ESM',
            number: 752,
            b: 'BV1Ga411k7Fc',
            code: 'https://github.com/shfshanyue/node-examples/tree/master/engineering/esm/importmap'
          },
          {
            title: 'CommonJS To ESM',
            number: 753,
            b: 'BV1mq4y1q7Cb',
            code: 'https://github.com/shfshanyue/node-examples/tree/master/engineering/rollup/esm'
          },
          {
            title: 'Bundless 与生产环境',
            number: 758
          }
        ]
      }
    ]
  },
  {
    title: '开发篇',
    collapsable: false, 
    children: [
      {
        title: '第四章: npm package 开发',
        description: '开发一个包，对于前端工程化可以得到一个很好的实践。',
        children: [
          {
            title: 'semver 与版本管理',
            number: 534,
            b: 'BV1d44y1E7zj'
          },
          {
            title: 'main/module/exports 入口',
            number: 535,
            code: 'https://github.com/shfshanyue/node-examples/tree/master/engineering/package/exportmap',
            b: 'BV1jZ4y1X7Pc'
          },
          {
            title: 'dep/devDep 的区别',
            number: 521,
            code: 'https://github.com/shfshanyue/node-examples/tree/master/engineering/package/devdep',
            b: 'BV1HM4y1c7ta'
          },
          {
            title: 'engines 宿主环境控制',
            number: 533,
            code: 'https://github.com/shfshanyue/node-examples/tree/master/engineering/package/engines'
          },
          {
            title: 'script hooks 及其风险',
            number: 740
          },
          {
            title: 'npm publish 发布第一个包',
            number: 754
          },
          {
            title: 'lockfile 及其影响',
            number: 196,
            b: 'BV1qL4y1J7bA'
          },
          {
            title: 'package 中的 lockfile',
            number: 747,
            b: 'BV1em4y1X7mD'
          }
        ]
      },
      {
        title: '第五章: 包管理工具',
        description: '从 npm，到 yarn，再到 pnpm，装包速度及装包体积都有了极大的提升，关于 npm 的诸多陷阱也得到了了解决，比如幽灵依赖与 npm scripts hook 较高的风险',
        children: [
          {
            title: 'npm cache',
            number: 759
          },
          {
            title: 'node_modules 拓扑结构',
            number: 746
          },
          {
            title: 'pnpm 的优势',
            number: 751,
            b: 'BV1Sb4y1t7Qr',
            code: 'https://github.com/shfshanyue/node-examples/tree/master/engineering/package/topology-dup'
          }
        ]
      },
    ]
  },
  {
    title: '运维篇',
    collapsable: false, 
    children: [
      {
        title: '第五章: 前端质量保障',
        description: '在前端质量保障工程中，在 Git Hooks、CI 中结合 Lint、Test、SizeLimit 等操作进行拦截，可以一定程度上保证项目代码质量',
        children: [
          {
            title: 'CICD',
            number: 748
          },
          {
            title: 'Git Hooks',
            number: 741
          },
          {
            title: 'Audit',
            number: 742
          },
          {
            title: 'Upgrade',
            number: 745
          },
          {
            title: 'ESLint',
            number: 744
          },
          {
            title: 'Package Patch',
            number: 760,
            b: 'BV1dq4y127GA'
          }
        ]
      },
      {
        title: '第六章: 前端服务部署',
        description: '随着前端工程化及 devops 的发展，前端部署也逐渐简单方便，比如通过构建后带有 hash 的文件可作持久缓存，代码分割又避免了一行代码的更改使整个网站资源的缓存都失效的问题。',
        children: [
          {
            title: 'Long Term Cache',
            number: 81
          },
          {
            title: 'Chunk Spliting 与缓存优化',
            number: 761
          },
          {
            title: 'Docker 部署',
            number: 749,
            b: 'BV18T4y1R72R',
          },
          {
            title: 'Docker Preview 部署',
            number: 762
          }
        ]
      },
    ]
  }
]

function getItems () {
  return sidebar.map(x => x.children?.map(x => x.children)).flat(10)
}

function _generateSidebar () {
  const items = getItems()
  let i = 1
  for (const item of items) {
    item.path = item.number.toString()
    item.title = `${i++}. ${item.title}`
  }
  return {
    '/engineering/': [
      ['', '开篇词'],
      ...sidebar
    ]
  }
}

module.exports = {
  sidebar,
  getItems,
  generateSidebar: once(_generateSidebar)
}
