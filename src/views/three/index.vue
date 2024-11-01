<template>
  <div class="three-main">
    <barComp />
    <div class="navigation-parent">
      <div class="navigation">
        <basicCase />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import barComp from './components/barComp.vue'
import basicCase from './basicCase/index.vue'
</script>

<style scoped lang="scss">
.three-main {
  height: 100%;
  .navigation-parent {
    width: 100%;
    height: calc(100% - 46px);
    overflow: auto;
    .navigation {
      width: 100%;
      height: 100%;
      padding: 15px 20px 20px;
      box-sizing: border-box;
    }
  }
}
</style>
