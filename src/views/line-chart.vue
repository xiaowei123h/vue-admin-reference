<script lang="ts" setup>
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
]);

// ResizeObserver 实例
let resizeObserver: ResizeObserver | null = null;
let chartDom: HTMLElement | null = null

onMounted(() => {
  chartDom = document.getElementById('line-chart');
  var myChart = echarts.init(chartDom);
  var option;

  // prettier-ignore
  const data = [["2025-06-05", 116], ["2025-06-06", 129], ["2025-06-07", 135], ["2025-06-08", 86], ["2025-06-09", 73], ["2025-06-10", 85], ["2025-06-11", 73], ["2025-06-12", 68], ["2025-06-13", 92], ["2025-06-14", 130], ["2025-06-15", 245], ["2025-06-16", 139], ["2025-06-17", 115], ["2025-06-18", 111], ["2025-06-19", 309], ["2025-06-20", 206], ["2025-06-21", 137], ["2025-06-22", 128], ["2025-06-23", 85], ["2025-06-24", 94], ["2025-06-25", 71], ["2025-06-26", 106], ["2025-06-27", 84], ["2025-06-28", 93], ["2025-06-29", 85], ["2025-06-30", 73], ["2025-07-01", 83], ["2025-07-02", 125], ["2025-07-03", 107], ["2025-07-04", 82], ["2025-07-05", 44], ["2025-07-06", 72], ["2025-07-07", 106], ["2025-07-08", 107], ["2025-07-09", 66], ["2025-07-10", 91], ["2025-07-11", 92], ["2025-07-12", 113], ["2025-07-13", 107], ["2025-07-14", 131], ["2025-07-15", 111], ["2025-07-16", 64], ["2025-07-17", 69], ["2025-07-18", 88], ["2025-07-19", 77], ["2025-07-20", 83], ["2025-07-21", 111], ["2025-07-22", 57], ["2025-07-23", 55], ["2025-07-24", 60]];
  const dateList = data.map(function (item) {
    return item[0];
  });
  const valueList = data.map(function (item) {
    return item[1];
  });
  option = {
    // Make gradient line here
    visualMap: [
      {
        show: false,
        type: 'continuous',
        seriesIndex: 0,
        min: 0,
        max: 400
      },
      {
        show: false,
        type: 'continuous',
        seriesIndex: 1,
        dimension: 0,
        min: 0,
        max: dateList.length - 1
      }
    ],
    title: [
      {
        left: 'center',
        text: '下载量'
      },
      {
        top: '55%',
        left: 'center',
        text: '注册量'
      }
    ],
    tooltip: {
      trigger: 'axis'
    },
    xAxis: [
      {
        data: dateList
      },
      {
        data: dateList,
        gridIndex: 1
      }
    ],
    yAxis: [
      {},
      {
        gridIndex: 1
      }
    ],
    grid: [
      {
        bottom: '60%'
      },
      {
        top: '60%'
      }
    ],
    series: [
      {
        type: 'line',
        showSymbol: false,
        data: valueList
      },
      {
        type: 'line',
        showSymbol: false,
        data: valueList,
        xAxisIndex: 1,
        yAxisIndex: 1
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
    <div id="line-chart" class="w-100% h-350px"></div>
  </el-card>
</template>