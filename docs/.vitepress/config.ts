import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vue Admin Reference",
  description: "Reference site",
  themeConfig: {
    logo: { src: '/logo.png', width: 24, height: 24 },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '指引', link: '/markdown-examples' },
      {
        text: '相关链接',
        items: [
          {
            text: 'vsCode官网',
            link: 'https://code.visualstudio.com/'
          },
          {
            text: 'Vue中文文档',
            link: 'https://cn.vuejs.org/'
          },
          {
            text: 'Nodejs官网',
            link: 'https://nodejs.org/en/'
          },
          {
            text: 'Vite中文文档',
            link: 'https://cn.vitejs.dev/'
          },
          {
            text: 'VitePress文档',
            link: 'https://vitejs.cn/vitepress/'
          },
          {
            text: 'vue-router文档',
            link: 'https://router.vuejs.org/zh/'
          },
          {
            text: 'Pinia中文文档',
            link: 'https://pinia.vuejs.org/zh/'
          },
          {
            text: 'Axios中文文档',
            link: 'https://www.axios-http.cn/'
          },
          {
            text: 'TS中文文档',
            link: 'https://ts.nodejs.cn/docs/'
          },
          {
            text: 'Element plus',
            link: 'https://cn.element-plus.org/zh-CN/'
          },
        ]
      }
    ],

    sidebar: [
      {
        text: '开始',
        collapsed: false,
        items: [
          { text: '简介', link: '/markdown-examples' }
        ]
      },
      {
        text: 'VitePress',
        collapsed: false,
        items: [
          { text: '快速开始', link: '/vitepress/started' },
          { text: 'Markdown扩展', link: '/vitepress/markdown' }
        ]
      },
      {
        text: 'Git/GitHub',
        collapsed: true,
        items: [
          { text: 'GitHub生成Token', link: '/git-github/get-token' },
          // { text: 'Markdown扩展', link: '/vitepress/markdown' }
        ]
      },
      {
        text: '部署',
        collapsed: true,
        items: [
          { text: 'GitHub Pages', link: '/deploy/github-pages' },
          // { text: 'Markdown扩展', link: '/vitepress/markdown' }
        ]
      },
    ],

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xiaowei123h/vue-admin-reference.git' }
    ]
  }
})
