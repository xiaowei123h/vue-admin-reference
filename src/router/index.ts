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
          svgIcon: "dashboard",
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
    path: '/plugin',
    component: Layout,
    meta: {
      title: '插件示例',
      svgIcon: "plugin",
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
          svgIcon: "barcode",
        }
      }
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

