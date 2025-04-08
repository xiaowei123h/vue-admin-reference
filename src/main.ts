import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 路由侧边栏标题图标单个注册
import { Eleme } from "@element-plus/icons-vue"
import SvgIcon from "~virtual/svg-component"

import '@/assets/styles/index.css'

import App from './App.vue'
import router from './router'
import store from './store'

import { installPermissionDirective } from "@/common/permission-directive"
import './permission'
import 'virtual:uno.css'

import * as THREE from 'three'

const app = createApp(App)

// 路由图标
app.component("Eleme", Eleme)

app.use(ElementPlus)
app.use(router)
app.use(store)

// 自定义权限指令
installPermissionDirective(app)

// 注册 SvgIcon 组件
app.component("SvgIcon", SvgIcon)

app.config.globalProperties.$THREE = THREE

app.mount('#app')

