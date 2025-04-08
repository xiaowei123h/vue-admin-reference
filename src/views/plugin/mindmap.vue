<script lang="ts" setup>
import mindmap from 'vue3-mindmap'
import 'vue3-mindmap/dist/style.css'

const data = [{
  "name":"如何学习D3",
  "children": [
    {
      "name":"预备知识",
      "children": [
        { "name":"HTML & CSS" },
        { "name":"JavaScript" },
      ]
    },
    {
      "name":"安装",
      "collapse": true,
      "children": [ { "name": "折叠节点" } ]
    },
    { "name":"进阶", "left": true },
  ]
}]

</script>

<template>
  <div class="p-16">
    <el-card class="card-w h-75vh">
      <mindmap v-model="data" :zoom="true" :edit="true" :fit-btn="true" :add-node-btn="true" :timetravel="true" :ctm="true"></mindmap>
    </el-card>
  </div>
</template>

<style scoped>
:deep(.el-card__body) {
  height:100%
}
</style>