<script lang="ts" setup>
import { useScriptTag } from '@vueuse/core'

// tencent sdk url
const TENCENT_MAP_SDK_URL = 'https://map.qq.com/api/gljs?v=1.exp&key=A6DBZ-KXPLW-JKSRY-ONZF4-CPHY3-K6BL7'

const { load } = useScriptTag(TENCENT_MAP_SDK_URL)

// const map = ref(null)

async function renderMap() {
  const map = document.getElementById('map')
  await load(true);
  if (!map) return;
  // @ts-ignore
  new TMap.Map(map, {
    // @ts-ignore
    center: new TMap.LatLng(39.98412, 116.307484),
    zoom: 11,
    viewMode: '3D'
  });
}

onMounted(() => {
  renderMap();
})
</script>

<template>
  <div class="p-16">
    <el-card class="card-w">
      <div id="map" class="h-75vh"></div>
    </el-card>
  </div>
</template>