<script lang="ts" setup>
import Vcode from "vue3-puzzle-vcode";

const isShow = ref(false);

const onShow = () => {
  isShow.value = true;
};

const onClose = () => {
  isShow.value = false;
};

const onSuccess = () => {
  onClose(); // 验证成功，手动关闭模态框
};
</script>

<template>
  <div class="p-16">
    <el-card class="card-w">
      <template #header>
        <div class="card-header">
          <span class="font-medium">
            点击按钮打开图形验证码
          </span>
        </div>
      </template>

      <Vcode :show="isShow" @success="onSuccess" @close="onClose"/>
      <el-button @click="onShow" type="default">开始验证</el-button>
    </el-card>
  </div>
</template>