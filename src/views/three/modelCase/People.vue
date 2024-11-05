<template>
  <div ref="threeContainer" class="example"></div>
  <div class="pos">
      <div id="Idle" class="bu">休息</div>
      <div id="Run" class="bu" style="margin-left: 10px;">跑步</div>
      <div id="Walk" class="bu" style="margin-left: 10px;">走路</div>
  </div>
</template>
<script setup>
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import model from './model.js';
const threeContainer = ref(null);
let camera, scene, renderer;
onMounted(() => {
  console.log('初始化加载');
  
  const width = threeContainer.value.clientWidth;
  const height = threeContainer.value.clientHeight;

  // 初始化场景
  scene = new THREE.Scene();
  scene.add(model);
  
  
  //辅助观察的坐标系AxesHelper
  const axesHelper = new THREE.AxesHelper(100);
  scene.add(axesHelper);
  // 添加一个辅助网格地面
  const gridHelper = new THREE.GridHelper(30, 25, 0x004444, 0x004444);
  scene.add(gridHelper);

  //光源设置
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(100, 60, 50);
  scene.add(directionalLight);
  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambient);

  
  //相机
  camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
  camera.position.set(7, 3,3);
  camera.lookAt(0, 0, 0);

  // WebGL渲染器设置
  renderer = new THREE.WebGLRenderer({
      antialias: true, //开启优化锯齿
  });
  renderer.setPixelRatio(window.devicePixelRatio); //防止输出模糊
  renderer.setSize(width, height);
  // 将渲染器添加到容器中
  threeContainer.value.appendChild(renderer.domElement);

  // 渲染循环
  function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
  
const controls = new OrbitControls(camera, renderer.domElement);
});
</script>
 
<style scoped lang="scss">
.example {
  width: 100%;
  height: 100%;
}
.bu {
  background: rgba(255, 255, 255, 0.05);
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  display: inline-block;
  border-radius: 30px;
}

.bu:hover {
  cursor: pointer;
}

.pos {
  position: absolute;
  left: 50%;
  margin-left: -90px;
  bottom: 100px;
}
</style>