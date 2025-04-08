<script lang="ts" setup>
import FcDesigner from '@form-create/designer'
defineOptions({
  name: 'formCreate'
})

const designer = ref(null)

const config = {
  fieldReadonly: false
}
</script>

<template>
  <div class="p-16">
    <el-card class="card-w">
      <fc-designer ref="designer" :config="config" height="calc(100vh - 240px)" />
    </el-card>
  </div>
</template>