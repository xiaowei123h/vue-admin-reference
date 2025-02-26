<script setup lang="ts">
import * as echarts from 'echarts/core';
import { TooltipComponent } from 'echarts/components';
import { GaugeChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TooltipComponent, GaugeChart, CanvasRenderer]);

// ResizeObserver 实例
let resizeObserver: ResizeObserver | null = null;
let chartDom: HTMLElement | null = null

onMounted(() => {
  chartDom = document.getElementById('dashboard');
  var myChart = echarts.init(chartDom);
  var option;

  option = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
    },
    series: [
      {
        name: 'Pressure',
        type: 'gauge',
        progress: {
          show: true
        },
        detail: {
          valueAnimation: true,
          formatter: '{value}'
        },
        data: [
          {
            value: 60,
            // name: 'SCORE'
          }
        ]
      }
    ]
  };

  option && myChart.setOption(option);

  // 使用 ResizeObserver 监听容器大小变化
  resizeObserver = new ResizeObserver(() => {
    myChart.resize();
  });
  // @ts-ignore
  resizeObserver.observe(chartDom);

})

// 在组件销毁时取消监听
onBeforeUnmount(() => {
  // @ts-ignore
  resizeObserver.unobserve(chartDom);
})
</script>

<template>
  <el-card class="card-w">
    <div id="dashboard" class="h-350px w-100%"></div>
  </el-card>
</template>
