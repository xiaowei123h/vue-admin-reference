<script lang="ts" setup>
import intro from "intro.js";
import "intro.js/minified/introjs.min.css";

type GuideStep = {
  element: string | HTMLElement;
  title: string;
  intro: string;
  position: "left" | "right" | "top" | "bottom";
};

defineOptions({
  name: "Guide"
});

let GUIDE_STEPS: Partial<GuideStep>[] | undefined = undefined

onMounted(() => {
  GUIDE_STEPS = [
    {
      // .layout-logo-container 引导位置
      element: document.querySelector(".layout-logo-container") as
        | string
        | HTMLElement,
      title: "项目名称和Logo",
      intro: "您可以在这里设置项目名称和Logo",
      position: "left"
    },
    {
      element: document.querySelector(".search-menu") as
        | string
        | HTMLElement,
      title: "搜索菜单",
      intro: "您可以在这里搜索想要查看的菜单",
      position: "left"
    },
    {
      element: document.querySelector(".screen-full") as
        | string
        | HTMLElement,
      title: "全屏",
      intro: "您可以在这里进行全屏切换",
      position: "left"
    },
    {
      element: document.querySelector(".layout-setting") as
        | string
        | HTMLElement,
      title: "系统配置",
      intro: "您可以在这里查看系统配置",
      position: "left"
    },
    {
      element: document.querySelector(".tags-view-container") as
        | string
        | HTMLElement,
      title: "多标签页",
      intro: "这里是您访问过的页面的历史",
      position: "bottom"
    }
  ] as Partial<GuideStep>[];
})

const onGuide = () => {
  intro()
    .setOptions({
      steps: GUIDE_STEPS
    })
    .start();
};

const tourOpen = ref(false);

const onTour = () => {
  tourOpen.value = true;
};
</script>

<template>
  <div class="p-16">
    <el-card class="card-w">
      <template #header>
        <div class="card-header">
          <span class="font-medium">
            引导页常用于引导式介绍项目的基本功能或亮点
          </span>
        </div>
      </template>
      <el-button @click="onGuide"> 打开引导页 (intro.js) </el-button>
      <el-button @click="onTour"> 打开引导页 (el-tour) </el-button>

      <el-tour v-model="tourOpen">
        <el-tour-step
          v-for="step in GUIDE_STEPS"
          :key="step.title"
          :target="() => step.element"
          :title="step.title"
          :description="step.intro"
          :placement="step.position"
        />
      </el-tour>
    </el-card>
  </div>
</template>