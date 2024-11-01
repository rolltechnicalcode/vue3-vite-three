<template>
  <div class="head-main">
    <div class="left-svg">
      <headTitle />
    </div>
    <div class="center-link">
      <headLink />
    </div>
    <div class="right-menu">
      <headMenu />
    </div>
  </div>
</template>

<script setup lang="ts">
import headTitle from "./components/headTitle.vue";
import headLink from "./components/headLink.vue";
import headMenu from "./components/headMenu.vue";
</script>

<style scoped lang="scss">
.head-main {
  height: 100%;
  display: flex;
  width: 100vw;
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #071228;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  /* border-bottom: 1px solid #636871; */
  box-shadow: 0 1px 1px #131212b3;
  .left-svg {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .right-menu {
    height: 100%;
  }
}
</style>
