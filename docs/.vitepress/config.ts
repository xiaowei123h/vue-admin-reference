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
          {
            text: 'Vercel官网',
            link: 'https://vercel.com/'
          },
          {
            text: 'cloudflare官网',
            link: 'https://www.cloudflare-cn.com/'
          },
          {
            text: '稀土掘金',
            link: 'https://juejin.cn/user/3639844967033508'
          },
        ]
      }
    ],

    sidebar: [
      {
        text: '开始',
        collapsed: false,
        items: [
          { text: '简介', link: '/introduce' }
        ]
      },
      {
        text: 'VitePress',
        collapsed: false,
        items: [
          { text: '使用', link: '/vitepress/vitepress-started' },
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
          { text: 'Vercel', link: '/deploy/vercel' },
          { text: 'Cloudflare Pages', link: '/deploy/cloudflare-pages' },
          { text: 'Netlify（推荐）', link: '/deploy/netlify' }
        ]
      },
      {
        text: 'Icon',
        collapsed: true,
        items: [
          { text: '使用', link: '/icon/icon-started' },
          { text: 'SVG组件管理插件', link: '/icon/unplugin-svg-component' },
        ]
      },
      {
        text: 'CSS样式',
        collapsed: true,
        items: [
          { text: 'UnoCSS', link: '/css/unocss' },
        ]
      },
      {
        text: 'Element Plus',
        collapsed: true,
        items: [
          { text: '细节', link: '/element/element-details' },
          { text: 'Table Demo', link: '/element/table-demo' },
        ]
      },
      {
        text: '插件示例',
        collapsed: true,
        items: [
          { text: '水印', link: '/plugin/plugin-watermark' },
          { text: '条形码', link: '/plugin/plugin-barcode' },
        ]
      },
      {
        text: 'Vue',
        collapsed: true,
        items: [
          { text: 'v-permission', link: '/vue/v-permission' },
        ]
      },
      {
        text: 'TS',
        collapsed: true,
        items: [
          { text: '细节', link: '/ts/ts-details' },
        ]
      },
      {
        text: '请求',
        collapsed: true,
        items: [
          { text: '细节', link: '/request/request-details' },
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

    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    skipToContentLabel: '跳转到内容',
    returnToTopLabel: '回到顶部',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xiaowei123h/vue-admin-reference.git' }
    ]
  }
})
