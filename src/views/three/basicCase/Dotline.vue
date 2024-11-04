<template>
  <div ref="threeContainer" class="example"></div>
</template>
<script setup>
import * as THREE from 'three';
const threeContainer = ref(null);
let camera, scene, renderer;
onMounted(() => {
  const width = threeContainer.value.clientWidth;
  const height = threeContainer.value.clientHeight;

  // 初始化场景
  scene = new THREE.Scene();

  // 网格模型Mesh其实就一个一个三角形(面)拼接构成
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array([
    0, 0, 0,
    50, 0, 0,
    50, 0, 50,

    0, 0, 0,
    0, 0, 50,
    50, 0, 50,
  ]);
  geometry.attributes.position = new THREE.BufferAttribute(vertices, 3);


  // 点渲染模式
  const material2 = new THREE.PointsMaterial({
    color: 0xffff00,
    size: 10.0 //点对象像素尺寸
  });
  const points = new THREE.Points(geometry, material2); //点模型对象
  scene.add(points);

  // 线材质对象
  const material1 = new THREE.LineBasicMaterial({
    color: 0xff0000 //线条颜色
  });
  // 创建线模型对象
  const line = new THREE.Line(geometry, material1);
  scene.add(line);

  // AxesHelper
  const axesHelper = new THREE.AxesHelper(150);
  scene.add(axesHelper);

  // 相机
  camera = new THREE.PerspectiveCamera();  //相机
  camera.position.set(200, 200, 200); //相机位置
  camera.lookAt(0, 0, 0);   //相机观察位置
 
  // 初始化渲染器
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  // 将渲染器添加到容器中
  threeContainer.value.appendChild(renderer.domElement);

  // 渲染循环
  function animate() {
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