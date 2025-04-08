<script lang="ts" setup>
import { html } from "pinyin-pro";

defineOptions({
  name: "Pinyin"
});
</script>

<template>
  <div class="p-16">
    <el-card class="card-w">
      <p v-html="html('带 音 调')" />
      <p class="m-t-5" v-html="html('不 带 音 调', { toneType: 'none' })" />
      <p class="m-t-5 custom" v-html="html('自 定 义 样 式')" />
    </el-card>
  </div>
</template>

<style scoped>
.custom :deep(.py-chinese-item) {
  /* 汉字的样式 */
  color: #409eff;
}

.custom :deep(.py-pinyin-item) {
  /* 拼音的样式 */
  color: #f56c6c;
}
</style>