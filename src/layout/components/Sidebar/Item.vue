<script lang="ts" setup>
import { isExternal } from "@/utils/validate.ts"
import path from "path-browserify"
import Link from "./Link.vue"
import type { RouteRecordRaw } from "vue-router"

interface Props {
  item: RouteRecordRaw
  basePath?: string
}

const props = withDefaults(defineProps<Props>(), {
  basePath: ""
})


// 是否始终显示根菜单
const alwaysShowRootMenu = computed(() => props.item.meta?.alwaysShow)

// 显示的子菜单
const showingChildren = computed(() => props.item.children?.filter(child => !child.meta?.hidden) ?? [])

// 显示的子菜单数量
const showingChildNumber = computed(() => showingChildren.value.length)


// 唯一的子菜单项
const theOnlyOneChild = computed(() => {
  const number = showingChildNumber.value
  switch (true) {
    case number > 1:
      return null
    case number === 1:
      return showingChildren.value[0]
    default:
      return { ...props.item, path: "" }
  }
})

// 解析路径
function resolvePath(routePath: string) {
  switch (true) {
    case isExternal(routePath):
      return routePath
    case isExternal(props.basePath):
      return props.basePath
    default:
      return path.resolve(props.basePath, routePath)
  }
}

let itemChildrenNum = 0
if (props.item) {
  if (props.item.children) {
    itemChildrenNum = props.item.children.length ? props.item.children.length : 0
  }
}
</script>

<template>
  <template v-if="(!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children) || (itemChildrenNum == 0 && theOnlyOneChild)">
    <Link v-if="theOnlyOneChild.meta" :to="resolvePath(theOnlyOneChild.path)">
      <el-menu-item :index="resolvePath(theOnlyOneChild.path)">
        <SvgIcon v-if="theOnlyOneChild.meta.svgIcon" :name="theOnlyOneChild.meta.svgIcon" class="svg-icon" />
        <component v-else-if="theOnlyOneChild.meta.elIcon" :is="theOnlyOneChild.meta.elIcon" class="el-icon" />
        <template v-if="theOnlyOneChild.meta.title" #title>
          <span class="title">{{ theOnlyOneChild.meta.title }}</span>
        </template>
      </el-menu-item>
    </Link>
  </template>
  <el-sub-menu v-else :index="resolvePath(props.item.path)" teleported>
    <template #title>
      <SvgIcon v-if="props.item.meta?.svgIcon" :name="props.item.meta.svgIcon" class="svg-icon" />
      <component v-else-if="props.item.meta?.elIcon" :is="props.item.meta.elIcon" class="el-icon" />
      <span v-if="props.item.meta?.title" class="title">{{ props.item.meta.title }}</span>
    </template>
    <template v-if="props.item.children">
      <Item
        v-for="child in showingChildren"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </template>
  </el-sub-menu>
</template>

<style scoped>
.svg-icon {
  min-width: 1em;
  margin-right: 12px;
  font-size: 18px;
}
.el-icon {
  width: 1em !important;
  margin-right: 12px !important;
  font-size: 18px;
}
.title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>