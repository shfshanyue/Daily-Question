const sidebar = [
  {
    title: '打包篇',
    children: [
      {
        title: '第一章: Bundle 基础设施建设',
        children: [
          {
            title: '1. 原理与运行时分析',
            number: 729
          },
          {
            title: '2. 运行时 Chunk 加载分析',
            number: 733
          },
          {
            title: '3. 加载非JS资源: JSON与图片'
          },
          {
            title: '4. 加载非JS资源: Style'
          },
          {
            title: '5. HTML 的处理'
          },
          {
            title: '6. Hot Module Reload'
          },
          {
            title: '7. 构建性能优化'
          }
        ]
      },
      {
        title: '第二章：打包体积优化',
        children: [
          {
            title: '8. 打包体积分析'
          },
          {
            title: '9. Javascript 压缩'
          },
          {
            title: '10. Tree Shaking'
          },
          {
            title: '11. Polyfill: corejs'
          },
          {
            title: '12. browserslist 垫片体积控制'
          }
        ]
      },
      {
        title: '第三章: Bundless 基础设施建设',
        children: [
          {
            title: '13. 原理与浏览器中的 ESM',
            number: 752,
          },
          {
            title: '14. CommonJS To ESM',
            number: 753
          },
          {
            title: '15. Bundless 与生产环境'
          }
        ]
      }
    ]
  },
  {
    title: '开发篇',
    children: [
      {
        title: '第四章: npm package 开发',
        children: [
          {
            title: '16. semver 与版本管理',
            number: 534,
          },
          {
            title: '17. main/module/export 入口',
            number: 535,
          },
          {
            title: '18. dep/devDep 的区别',
            number: 521
          },
          {
            title: '19. engines 宿主环境控制',
            number: 533
          },
          {
            title: '20. script hooks 及其风险',
            number: 740
          },
          {
            title: '21. npm publish 发布第一个包',
            number: 758
          },
          {
            title: '22. lockfile 及其影响',
            number: 196,
          },
          {
            title: '23. package 中的 lockfile',
            number: 747
          }
        ]
      },
      {
        title: '第五章: 包管理工具',
        children: [
          {
            title: '24. npm cache'
          },
          {
            title: '25. node_modules 拓扑结构'
          },
          {
            title: '26. pnpm 的优势'
          }
        ]
      },
    ]
  },
  {
    title: '运维篇',
    children: [
      {
        title: '第五章: 前端质量保障',
        children: [
          {
            title: '27. CICD'
          },
          {
            title: '28. Git Hooks'
          },
          {
            title: '29. Audit'
          },
          {
            title: '30. Upgrade'
          },
          {
            title: '31. ESLint'
          },
          {
            title: '32. Package Patch'
          }
        ]
      },
      {
        title: '第六章: 前端服务部署',
        children: [
          {
            title: '33. Long Term Cache',
          },
          {
            title: '34. Chunk Spliting 与缓存优化'
          },
          {
            title: '35. Docker 部署',
            number: 749
          },
          {
            title: '36. Docker Preview 部署'
          }
        ]
      },
    ]
  }
]