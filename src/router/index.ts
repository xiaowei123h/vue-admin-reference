import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from "vue-router"

const Layout = () => import('@/layout/index.vue')

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard.vue"),
        name: "Dashboard",
        meta: {
          title: "首页",
          svgIcon: "dashboard1",
          affix: true
        }
      }
    ]
  },
  {
    path: '/element',
    component: Layout,
    meta: {
      title: 'Element Plus',
      elIcon: "Eleme",
      alwaysShow: true,
    },
    children: [
      {
        path: "element-table",
        component: () => import("@/views/elementPlus/elementTable.vue"),
        name: "ElementTable",
        meta: {
          title: "Table表格",
          svgIcon: "table",
        }
      }
    ]
  },
  {
    path: '/plugin-light',
    component: Layout,
    meta: {
      title: '轻量插件',
      svgIcon: "plugin-light",
      alwaysShow: true,
    },
    children: [
      {
        path: "plugin-watermark",
        component: () => import("@/views/plugin/watermark.vue"),
        name: "watermark",
        meta: {
          title: "水印",
          svgIcon: "watermark",
        }
      },
      {
        path: "plugin-barcode",
        component: () => import("@/views/plugin/barcode.vue"),
        name: "barcode",
        meta: {
          title: "条形码",
          svgIcon: "barcodesvg",
        }
      },
      {
        path: "plugin-excel",
        component: () => import("@/views/plugin/excel.vue"),
        name: "excel",
        meta: {
          title: "Excel导出",
          svgIcon: "excel",
        }
      },
      {
        path: "plugin-typeit",
        component: () => import("@/views/plugin/typeit.vue"),
        name: "typeit",
        meta: {
          title: "打字机",
          svgIcon: "typeit",
        }
      },
      {
        path: "plugin-markdown",
        component: () => import("@/views/plugin/markdown.vue"),
        name: "markdown",
        meta: {
          title: "MD编辑器",
          svgIcon: "markdown",
        }
      },
      {
        path: "plugin-editor",
        component: () => import("@/views/plugin/editor.vue"),
        name: "editor",
        meta: {
          title: "富文本编辑器",
          svgIcon: "editor",
        }
      },
      {
        path: "plugin-pdf",
        component: () => import("@/views/plugin/pdf.vue"),
        name: "pdf",
        meta: {
          title: "pdf在线预览",
          svgIcon: "pdf",
        }
      },
      {
        path: "plugin-guide",
        component: () => import("@/views/plugin/guide.vue"),
        name: "guide",
        meta: {
          title: "引导页",
          svgIcon: "guide",
        }
      },
      {
        path: "plugin-verify",
        component: () => import("@/views/plugin/verify.vue"),
        name: "verify",
        meta: {
          title: "图形验证码",
          svgIcon: "verify",
        }
      },
      // {
      //   path: "plugin-draggable",
      //   component: () => import("@/views/plugin/draggable.vue"),
      //   name: "draggable",
      //   meta: {
      //     title: "拖拽",
      //     svgIcon: "draggable",
      //   }
      // },
      {
        path: "plugin-mint",
        component: () => import("@/views/plugin/mint.vue"),
        name: "mint",
        meta: {
          title: "敏感词过滤",
          svgIcon: "mint",
        }
      },
      {
        path: "plugin-pinyin",
        component: () => import("@/views/plugin/pinyin.vue"),
        name: "pinyin",
        meta: {
          title: "汉语拼音",
          svgIcon: "pinyin",
        }
      },
    ]
  },
  {
    path: '/plugin',
    component: Layout,
    meta: {
      title: '插件示例',
      svgIcon: "plugin",
      alwaysShow: true,
    },
    children: [
      {
        path: "plugin-antvg6",
        component: () => import("@/views/plugin/antvg6.vue"),
        name: "antvg6",
        meta: {
          title: "AntV G6",
          svgIcon: "antv",
        }
      },
      {
        path: "plugin-echarts",
        component: () => import("@/views/plugin/echarts.vue"),
        name: "echarts",
        meta: {
          title: "Echarts",
          svgIcon: "echarts",
        }
      },
      {
        path: "plugin-vchart",
        component: () => import("@/views/plugin/vchart.vue"),
        name: "vchart",
        meta: {
          title: "VChart",
          svgIcon: "vcharts",
        }
      },
      {
        path: "plugin-dhtmlx",
        component: () => import("@/views/plugin/dhtmlx.vue"),
        name: "dhtmlx",
        meta: {
          title: "dhtmlx甘特图",
          svgIcon: "dhtmlx",
        }
      },
      {
        path: "plugin-vtable",
        component: () => import("@/views/plugin/vtable.vue"),
        name: "vtable",
        meta: {
          title: "vtable甘特图",
          svgIcon: "vtable",
        }
      },
      {
        path: "plugin-map",
        component: () => import("@/views/plugin/map.vue"),
        name: "map",
        meta: {
          title: "地图",
          svgIcon: "map",
        }
      },
      {
        path: "plugin-mindmap",
        component: () => import("@/views/plugin/mindmap.vue"),
        name: "mindmap",
        meta: {
          title: "思维导图",
          svgIcon: "mindmap",
        }
      },
      {
        path: "plugin-formCreate",
        component: () => import("@/views/plugin/formCreate.vue"),
        name: "formCreate",
        meta: {
          title: "表单生成器",
          svgIcon: "formCreate",
        }
      },
      {
        path: "plugin-threejs",
        component: () => import("@/views/plugin/threejs.vue"),
        name: "threejs",
        meta: {
          title: "Threejs",
          svgIcon: "threejs",
        }
      },
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login.vue'),
    name: 'Login',
    meta: {
      hidden: true
    }
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/views/error/404.vue'),
    meta: {
      hidden: true
    }
  }
]

// 动态路由
export const dynamicRoutes: RouteRecordRaw[] = [
  {
    path: '/permission',
    component: Layout,
    redirect: "/permission/permission-first",
    name: 'permission',
    meta: {
      title: '权限',
      svgIcon: "permission",
      alwaysShow: true,
      roles: ['admin', 'some']
    },
    children: [
      {
        path: 'permission-first',
        component: () => import('@/views/permission/permissionFirst.vue'),
        name: 'permissionFirst',
        meta: {
          title: '权限子菜单一',
          svgIcon: "admin",
          roles: ['admin']
        }
      },
      {
        path: 'permission-second',
        component: () => import('@/views/permission/permissionSecond.vue'),
        name: 'permissionSecond',
        meta: {
          title: '权限子菜单二',
          svgIcon: "admin",
          roles: ['admin']
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  // 页面滚动行为
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

export default router

