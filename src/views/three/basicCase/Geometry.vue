<template>
  <div ref="threeContainer" class="example"></div>
</template>
<script setup>
import * as THREE from 'three';
const threeContainer = ref(null);
let camera, scene, renderer, cube;
onMounted(() => {
  const width = threeContainer.value.clientWidth;
  const height = threeContainer.value.clientHeight;
 
  // 初始化相机
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 5;
 
  // 初始化场景
  scene = new THREE.Scene();
 
  // 创建几何体 - 立方体
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
 
  // 初始化渲染器
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  // 将渲染器添加到容器中
  threeContainer.value.appendChild(renderer.domElement);
 
  // 渲染循环
  function animate() {
    requestAnimationFrame(animate);
 
    // 旋转立方体
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
 
    renderer.render(scene, camera);
  }
 
  animate();
});
</script>
 
<style>
.example {
  width: 100%;
  height: 100%;
}
</style>