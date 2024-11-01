<template>
  <div class="wh-full layout-main">
    <div class="fixed-header">
      <HeadComp />
    </div>
    <div class="layout-body">
      <div class="layout-menu">
        <Sidebar />
      </div>
      <div class="layout-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeadComp from "./components/HeadComp/index.vue";
import Sidebar from "./components/Sidebar/index.vue";
</script>

<style scoped lang="scss">
.layout-main {
  height: 100vh;
  .fixed-header {
    height: 64px;
  }
  .layout-body {
    height: calc(100vh - 64px);
    display: flex;
    .layout-menu {
      width: 200px;
      background-color: #304156;
    }
    .layout-content {
      flex: 1;
    }
  }
}
</style>
