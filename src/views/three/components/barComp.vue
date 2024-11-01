<template>
  <div  class="bar">
    <div  class="num">
    🍀总数：170
    </div>
    <div class="gitInfo">
      <img src="https://img.shields.io/github/stars/z2586300277/three-cesium-examples?style=social" alt="GitHub stars">
      <img src="https://img.shields.io/badge/47人-贡献者-ff69b4" alt="GitHub contributors">
      <img src="https://img.shields.io/github/last-commit/z2586300277/three-cesium-examples" alt="GitHub last commit">
      <img src="https://img.shields.io/github/license/z2586300277/three-cesium-examples" alt="GitHub license">
    </div>
    <div class="el-input-group">
      <el-input
        placeholder="请输入内容"
        class="input-with-select"
      >
        <template #append>
          <el-icon class="sub-el-icon">
            <component is="Search" />
          </el-icon>
        </template>
      </el-input>
    </div>
  </div>
</template>


<script setup lang="ts">
</script>

<style scoped lang="scss">
.bar {
  height: 46px;
  width: 100%;
  box-shadow: -1px 3px 10px #0003;
  padding-left: 20px;
  padding-right: 45px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .num {
    color: #000;
    font-weight: 700;
    white-space: nowrap;
  }
  .gitInfo {
    display: flex;
    align-items: center;
    font-size: 14px;
    > img {
      margin: 0 10px;
      transition: all .3s;
      cursor: pointer;
      &:hover {
        overflow-clip-margin: content-box;
        overflow: clip;
        transform: scale(1.1);
      }
    }
  }
  .el-input-group {
    align-items: stretch;
    display: inline-flex;
    width: 250px;
    &:deep(.el-input__wrapper) {
      align-items: center;
      background-color: transparent, transparent;
      background-image: none;
      border-radius: 4px;
      box-shadow: 0 0 0 1px #4c4d4f inset;
      cursor: text;
      display: inline-flex;
      flex-grow: 1;
      justify-content: center;
      padding: 1px 11px;
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
    }
    &:deep(.el-input-group__append,
    .el-input-group__prepend) {
      align-items: center;
      background-color:#262727;
      border-radius: 4px;
      color: #909399;
      display: inline-flex;
      justify-content: center;
      min-height: 100%;
      padding: 0 20px;
      position: relative;
      white-space: nowrap;
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
    }
  }
}
</style>