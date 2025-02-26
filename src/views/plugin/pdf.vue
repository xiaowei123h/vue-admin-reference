<script lang="ts" setup>
import pdf from 'vue-pdf-embed'
</script>

<template>
  <div class="p-16">
    <el-card class="card-w">
      <pdf source="/sample.pdf"></pdf>
    </el-card>
  </div>
</template>