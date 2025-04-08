<script lang="ts" setup>
import Mint from "mint-filter";

defineOptions({
  name: "Mint"
});

// 自定义敏感词字典
const words = ["脑残", "废物", "白痴", "三八", "智障"];

const modelValue = ref();
const mint = new Mint(words);

function onInput() {
  modelValue.value = mint.filter(modelValue.value).text;
}
</script>

<template>
  <div class="p-16">
    <el-card class="card-w">
      <div class="flex m-10-0">
        <span>自定义敏感词</span>
        <el-tag
          v-for="(word, index) in words"
          :key="index"
          type="warning"
          class="m-0-8"
          effect="dark"
          round
        >
          {{ word }}
        </el-tag>
      </div>
      <el-input v-model="modelValue" @input="onInput" />
      <p class="mt-2">{{ modelValue }}</p>
    </el-card>
  </div>
</template>