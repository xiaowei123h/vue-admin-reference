<script lang="ts" setup>
import Vditor from 'vditor'
import 'vditor/dist/index.css'

onMounted(() => {
  const vditor = new Vditor('md-editor', {
    minHeight: 400,
    theme: 'classic',
    icon: 'material',
    cache: { enable: false }
  })
})
</script>

<template>
  <div class="p-16">
    <el-card class="card-w">
      <div id="md-editor"></div>
    </el-card>
  </div>
</template>