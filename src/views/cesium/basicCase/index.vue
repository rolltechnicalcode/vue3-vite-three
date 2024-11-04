<template>
  <div class="cesium-container" ref="cesiumContainer"></div>
</template>

<script setup>
import * as Cesium from 'cesium'
import Draw from './Draw' // 确保路径正确
  const cesiumContainer = ref(null)
  let viewer
  let draw

  onMounted(() => {
    // 初始化地球
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2MDBjMDViOC05NGEyLTQyY2MtOTY2Ny01NTI3MjAyOWRiZWUiLCJpZCI6MjMwODY1LCJpYXQiOjE3MjE5NjMzMTd9.YVauEhg9qLB3pUYbpXQUSza7JdJ5S4h3wzjPMUT5jmY'

    viewer = new Cesium.Viewer(cesiumContainer.value, {
      geocoder: true,
      homeButton: true, //是否显示首页位置工具
      sceneModePicker: true, //是否显示视角模式切换工具
      baseLayerPicker: true, //是否显示默认图层选择工具
      navigationHelpButton: false, //是否显示导航帮助工具
      animation: false, //是否显示动画工具
      timeline: false, //是否显示时间轴工具
      fullscreenButton: true, //是否显示全屏按钮工具
    })
    //初始化绘制方法
    draw = new Draw(viewer, {
      borderColor: Cesium.Color.RED,
      borderWidth: 2,
      material: Cesium.Color.BLUE.withAlpha(0.5),
    })
  })
</script>

<style scoped>
.cesium-container {
  width: 100%;
  height: 100%;
}
</style>
