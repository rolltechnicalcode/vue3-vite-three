<template>
  <div class="basic-main">
    <div class="case-item">
      <el-divider content-position="left">基础案例</el-divider>
      <div class="examples">
        <div class="examples-item" v-for="item in 20">
          <examplesItemComp />
        </div>
      </div>
    </div>
    <div class="case-item">
      <el-divider content-position="left">基础案例</el-divider>
      <div class="examples">
        <div class="examples-item" v-for="item in 20">
          <examplesItemComp />
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import examplesItemComp from '@/components/ThreeExamples/index.vue'
</script>

<style scoped lang="scss">
.basic-main {
  .examples {
    box-sizing: border-box;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 250px);
    grid-template-rows: repeat(auto-fill, 290px);
    grid-row-gap: 5px;
    grid-column-gap: 5px;
    .examples-item{
      width: 250px;
      height: 290px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

</style>