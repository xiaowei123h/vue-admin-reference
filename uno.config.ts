import { defineConfig } from 'unocss'
import { myPreset } from './unocss/my-preset.ts'

export default defineConfig({
  // 预设
  presets: [
    // 自己的预设
    myPreset,
  ],
  // 自定义规则
  rules: [],
  // 自定义快捷方式
  shortcuts: {}
})