<script lang="ts" setup>
import DashboardChart from './dashboard-chart.vue'
import LineChart from './line-chart.vue'
import { useDevice } from "@/layout/composables/useDevice.ts"

const { isMobile } = useDevice()

const gap = computed(() => (isMobile.value ? 0 : 16))

const router = useRouter()

function navigateTo(routeName: any) {
  router.push({ name: routeName })
}
</script>

<template>
  <div class="p-16">
    <!-- 欢迎卡片 -->
    <el-card class="card-w">
      <div class="flex" :class="isMobile ? 'd-c' : ''">
        <div class="h-100px">
          <img src="@/assets/images/welcome.png" class="h-100%">
        </div>
        <div>
          <div class="welcome-title f-20" :class="isMobile ? 'm-0-0-15-15' : 'm-20-0-15-15'">欢迎使用Reference</div>
          <div class="welcome-description m-l-15 f-14">
            本系统集成了多种功能模块，包括表格展示、数据可视化、插件应用等，帮助您高效管理后台数据。
          </div>
        </div>
      </div>
    </el-card>

    <el-card class="card-w m-t-20">
      <el-row :gutter="16">
        <el-col :lg="6" :md="12" :sm="24" class="m-8-0">
          <div @click="navigateTo('map')" class="access-card p-12-15-20-15" style="background: linear-gradient(to bottom right, #ec4786, #b955a4);">
            <div class="f-16">地图</div>
            <div class="flex-b m-t-20">
              <SvgIcon name="map" class="f-25"/>
              <div class="flex-e">
                <div class="enter m-r-10">进入</div>
                <SvgIcon name="enter" class="f-32"/>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6" :md="12" :sm="24" class="m-8-0">
          <div @click="navigateTo('echarts')" class="access-card p-12-15-20-15" style="background: linear-gradient(to bottom right, #865ec0, #5144b4);">
            <div class="f-16">图表</div>
            <div class="flex-b m-t-20">
              <SvgIcon name="echarts" class="f-32"/>
              <div class="flex-e">
                <div class="enter m-r-10">进入</div>
                <SvgIcon name="enter" class="f-32"/>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6" :md="12" :sm="24" class="m-8-0">
          <div @click="navigateTo('editor')" class="access-card p-12-15-20-15" style="background: linear-gradient(to bottom right, #56cdf3, #719de3);">
            <div class="f-16">编辑器</div>
            <div class="flex-b m-t-20">
              <SvgIcon name="editor" class="f-32"/>
              <div class="flex-e">
                <div class="enter m-r-10">进入</div>
                <SvgIcon name="enter" class="f-32"/>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="6" :md="12" :sm="24" class="m-8-0">
          <div @click="navigateTo('barcode')" class="access-card p-12-15-20-15" style="background: linear-gradient(to bottom right, #fcbc25, #f68057);">
            <div class="f-16">条形码</div>
            <div class="flex-b m-t-20">
              <SvgIcon name="barcodesvg" class="f-32"/>
              <div class="flex-e">
                <div class="enter m-r-10">进入</div>
                <SvgIcon name="enter" class="f-32"/>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-row :gutter="gap" class="m-t-20">
      <el-col :lg="14" :sm="24" class="m-b-16">
        <el-card class="card-w">
          <line-chart></line-chart>
        </el-card>
      </el-col>
      <el-col :lg="10" :sm="24" class="m-b-16">
        <el-card class="card-w">
          <dashboard-chart></dashboard-chart>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.access-card {
  background-color: green;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  color: #fff;
}

.access-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.2);
}

.enter {
  line-height: 32px;
}
</style>