<script lang="ts" setup>
import { useSettingsStore } from "@/store/modules/settings.ts"
import { useLayoutMode } from "@/layout/composables/useLayoutMode.ts"
import { removeLayoutsConfig } from "@/layout/composables/local-storage.ts"
import { Refresh } from "@element-plus/icons-vue"
import SelectLayoutMode from "./SelectLayoutMode.vue"

const { isLeft } = useLayoutMode()

// 使用 storeToRefs 将提取的属性保持其响应性
const {
  showTagsView,
  showLogo,
  fixedHeader,
  showFooter,
  showScreenfull,
  showSearchMenu,
  cacheTagsView,
  showSettings
} = storeToRefs(useSettingsStore())

/** 定义 switch 设置项 */
const switchSettings = {
  "显示标签栏": showTagsView,
  "显示 Logo": showLogo,
  "固定 Header": fixedHeader,
  "显示页脚": showFooter,
  "显示全屏按钮": showScreenfull,
  "显示搜索按钮": showSearchMenu,
  "显示右侧设置按钮": showSettings,
  "是否缓存标签栏": cacheTagsView
}

// 非左侧模式时，Header 都是 fixed 布局
watchEffect(() => {
  !isLeft.value && (fixedHeader.value = true)
})

/** 重置项目配置 */
function resetLayoutsConfig() {
  removeLayoutsConfig()
  location.reload()
}
</script>

<template>
  <div class="setting-container">
    <h4>布局配置</h4>
    <SelectLayoutMode />
    <el-divider />
    <h4>功能配置</h4>
    <div v-for="(settingValue, settingName, index) in switchSettings" :key="index" class="setting-item">
      <span class="setting-name">{{ settingName }}</span>
      <el-switch v-model="settingValue.value" :disabled="!isLeft && settingName === '固定 Header'" />
    </div>
    <el-button type="danger" :icon="Refresh" @click="resetLayoutsConfig">
      重 置
    </el-button>
  </div>
</template>

<style scoped>

.setting-container {
  padding: 20px;
}
.setting-item {
  font-size: 14px;
  color: var(--el-text-color-regular);
  padding: 5px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-button {
  margin-top: 40px;
  width: 100%;
}
.setting-name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>