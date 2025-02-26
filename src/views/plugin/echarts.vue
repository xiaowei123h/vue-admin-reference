<script lang="ts" setup>
import * as echarts from 'echarts/core';
import { 
  GridComponent,
  GridComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  LegendComponent,
  LegendComponentOption
 } from 'echarts/components';
import { BarChart, BarSeriesOption, PieChart, PieSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { LabelLayout } from 'echarts/features';

echarts.use([
  GridComponent,
  BarChart,
  CanvasRenderer,
  ToolboxComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout]);

type EChartsOption = echarts.ComposeOption<
  ToolboxComponentOption | LegendComponentOption | PieSeriesOption | GridComponentOption | BarSeriesOption
>;

// ResizeObserver 实例
let resizeObserver: ResizeObserver | null = null;

let chartDom: HTMLElement | null = null
let chartDom2: HTMLElement | null = null

onMounted(() => {
  // #region echarts1
  var option: EChartsOption;

  var series = [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      stack: 'a',
      name: 'a'
    },
    {
      data: [10, 46, 64, '-', 0, '-', 0],
      type: 'bar',
      stack: 'a',
      name: 'b'
    },
    {
      data: [30, '-', 0, 20, 10, '-', 0],
      type: 'bar',
      stack: 'a',
      name: 'c'
    },
    {
      data: [30, '-', 0, 20, 10, '-', 0],
      type: 'bar',
      stack: 'b',
      name: 'd'
    },
    {
      data: [10, 20, 150, 0, '-', 50, 10],
      type: 'bar',
      stack: 'b',
      name: 'e'
    }
  ];

  const stackInfo: {
    [key: string]: { stackStart: number[]; stackEnd: number[] };
  } = {};
  for (let i = 0; i < series[0].data.length; ++i) {
    for (let j = 0; j < series.length; ++j) {
      const stackName = series[j].stack;
      if (!stackName) {
        continue;
      }
      if (!stackInfo[stackName]) {
        stackInfo[stackName] = {
          stackStart: [],
          stackEnd: []
        };
      }
      const info = stackInfo[stackName];
      const data = series[j].data[i];
      if (data && data !== '-') {
        if (info.stackStart[i] == null) {
          info.stackStart[i] = j;
        }
        info.stackEnd[i] = j;
      }
    }
  }
  for (let i = 0; i < series.length; ++i) {
    const data = series[i].data as
      | number[]
      | { value: number; itemStyle: object }[];
    const info = stackInfo[series[i].stack];
    for (let j = 0; j < series[i].data.length; ++j) {
      // const isStart = info.stackStart[j] === i;
      const isEnd = info.stackEnd[j] === i;
      const topBorder = isEnd ? 20 : 0;
      const bottomBorder = 0;
      data[j] = {
        value: data[j] as number,
        itemStyle: {
          borderRadius: [topBorder, topBorder, bottomBorder, bottomBorder]
        }
      };
    }
  }

  option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: series as any
  };

  chartDom = document.getElementById('echarts1')!;
  var myChart = echarts.init(chartDom);

  option && myChart.setOption(option);
  // #endregion

  // #region echarts2
  var option2: EChartsOption;

  option2 = {
    legend: {
      top: 'bottom'
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [50, 150],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: [
          { value: 40, name: 'rose 1' },
          { value: 38, name: 'rose 2' },
          { value: 32, name: 'rose 3' },
          { value: 30, name: 'rose 4' },
          { value: 28, name: 'rose 5' },
          { value: 26, name: 'rose 6' },
          { value: 22, name: 'rose 7' },
          { value: 18, name: 'rose 8' }
        ]
      }
    ]
  };

  chartDom2 = document.getElementById('echarts2')!;
  var myChart2 = echarts.init(chartDom2);

  option2 && myChart2.setOption(option2);
  // #endregion

  // 使用 ResizeObserver 监听容器大小变化
  resizeObserver = new ResizeObserver(() => {
    myChart.resize();
    myChart2.resize();
  });
  resizeObserver.observe(chartDom);
  resizeObserver.observe(chartDom2);
});



// 在组件销毁时取消监听
onBeforeUnmount(() => {
  // @ts-ignore
  resizeObserver.unobserve(chartDom);
  
  // @ts-ignore
  resizeObserver.unobserve(chartDom2);
});
</script>

<template>
  <div class="p-16">
    <el-card class="card-w">
      <div id="echarts2" class="w-100% h-454px"></div>
    </el-card>
    <el-card class="card-w m-t-20">
      <div id="echarts1" class="w-100% h-454px"></div>
    </el-card>
  </div>
</template>