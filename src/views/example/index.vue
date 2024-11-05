<template>
  <component :is="currentComponent"></component>
</template>


<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute();

// 获取路由参数
const exampleName = route.query.exampleName;
const compUrl = route.query.compUrl;

let currentComponent = ref(null);

const loadComponent = () => {
  // 使用import()函数来动态导入组件
  currentComponent.value = defineAsyncComponent(() =>
    import(`@/views/three/${exampleName}/${compUrl}.vue`)
  );
};

loadComponent();



</script>

<style scoped lang="scss"></style>