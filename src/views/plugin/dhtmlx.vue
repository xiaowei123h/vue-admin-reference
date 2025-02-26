<script lang="ts" setup>
import { gantt } from 'dhtmlx-gantt'
import type { Task } from 'dhtmlx-gantt'
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'
import { Folder } from "@element-plus/icons-vue"

const ganttTasks: Task[] = [
  {
    id: 11,
    text: 'Soybean 架构设计',
    type: 'project',
    progress: 0,
    open: true,
    start_date: new Date('2024-01-10 00:00'),
    duration: 12,
    parent: 0
  },
  {
    id: 12,
    text: '测试版本',
    start_date: new Date('2024-03-20 00:00'),
    type: 'project',
    duration: 5,
    render: 'split',
    parent: '11',
    progress: 0,
    open: true
  },
  {
    id: 99,
    text: '测试版本1 发布',
    start_date: new Date('2024-03-20 00:00'),
    end_date: new Date('2024-03-25 00:00'),
    parent: '12',
    progress: 0,
    open: true
  },
]

onMounted(() => {
  const div = document.querySelector('div')
  // @ts-ignore
  const computedStyle = window.getComputedStyle(div)

  // 适配移动端，移动端只显示任务名
  if (Number(computedStyle.width.replace("px", "")) < 650) {
    gantt.config.columns = [
      { name: "text", label: "任务名", width: 100 }, // 只显示任务名称
      { name: "add", label: "", width: 40 }, // 空列，用于显示添加任务按钮
    ]
  }

  // 设置中文
  gantt.i18n.setLocale('cn')

  gantt.init('dhtmlx-gantt')

  gantt.parse({data: ganttTasks})
})
</script>

<template>
  <div class="p-16">  
    <el-card class="card-w h-100%">
      <div id="dhtmlx-gantt" class="h-100%"></div>
    </el-card>
  </div>
</template>

<style scoped>
:deep(.el-card__body) {
  height:100%
}
</style>

