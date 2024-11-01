<template>
  <div class="menu-list">
    <div
      class="menu-item"
      :class="pitchName === 'three' ? 'is-active' : ''"
      @click="onPitch('three')"
    >
      Three.js案例
    </div>
    <div
      class="menu-item"
      :class="pitchName === 'cesium' ? 'is-active' : ''"
      @click="onPitch('cesium')"
    >
      Cesium.js案例
    </div>
    <div class="menu-item github-img" @click="handleLink('https://github.com')">
      <img src="@/assets/images/github.png" />
    </div>
  </div>
</template>

<script setup lang="ts">
const pitchName = ref("three");

const onPitch = (val: string) => {
  pitchName.value = val;
};
const handleLink = (url: string) => {
  window.open(url);
};
</script>

<style scoped lang="scss">
.menu-list {
  height: 100%;
  display: flex;
  align-items: center;
  .menu-item {
    margin-left: 20px;
    height: 100%;
    display: flex;
    padding: 0 10px;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: rgb(0, 0, 0, 0.6);
    }
  }
  .is-active {
    border-bottom: 2px solid #fff;
    color: #fff;
  }
  .github-img {
    padding: 0;
    > img {
      width: 36px;
      height: 36px;
      transition: all 0.3s;
      &:hover {
        transform: scale(1.2); /* 鼠标悬停时放大1.1倍 */
      }
    }
  }
}
</style>
