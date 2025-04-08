<script lang="ts" setup>
import draggable from 'vuedraggable'

const gridLists = reactive<Array<Object>>([
  { grid: "cn", num: 1 },
  { grid: "cn", num: 2 },
  { grid: "cn", num: 3 },
  { grid: "cn", num: 4 },
  { grid: "cn", num: 5 },
  { grid: "cn", num: 6 },
  { grid: "cn", num: 7 },
  { grid: "cn", num: 8 },
  { grid: "cn", num: 9 }
]);
</script>

<template>
  <div class="p-16">
    <el-card class="card-w">
      <draggable
        v-model="gridLists"
        class="grid-container"
        item-key="grid"
        animation="300"
        chosenClass="chosen"
        forceFallback="true"
      >
        <template #item="{ element }">
          <div :class="'item' + ' ' + 'item-' + element.num">
            {{ element.num }}
          </div>
        </template>
      </draggable>
    </el-card>
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-rows: 33.3% 33.3% 33.3%;
  grid-template-columns: 33.3% 33.3% 33.3%;
}
.item {
  font-size: 2em;
  line-height: 100px;
  text-align: center;
  cursor: move;
  border: 1px solid #e5e4e9;
}
/* .item-1 {
  background-color: aqua;
}
.item-2 {
  background-color: rgb(197, 183, 51);
}
.item-3 {
  background-color: rgb(0, 255, 64);
}
.item-4 {
  background-color: rgb(255, 0, 170);
}
.item-5 {
  background-color: rgb(255, 30, 0);
}
.item-6 {
  background-color: rgb(14, 15, 15);
}
.item-7 {
  background-color: rgb(16, 196, 91);
}
.item-8 {
  background-color: rgb(96, 57, 122);
}
.item-9 {
  background-color: rgb(89, 223, 189);
} */
</style>