<template>
  <el-menu
    ref="menuRef"
    :collapse="isCollapse"
    :default-active="currentRoute.path"
    background-color="rgb(0 0 0 / 20%)"
    text-color="#bfcbd9"
    active-text-color="#4080ff"
    :unique-opened="false"
    :collapse-transition="false"
    @open="handleOpen"
    @close="handleClose"
  >
    <SidebarMenuItem
      v-for="route in menuList"
      :key="route.path"
      :item="route"
      :base-path="getFullPath(route.path)"
    />
  </el-menu>
</template>

<script lang="ts" setup>
import path from "path-browserify"; // 第三方库
import { isExternal } from "@/utils/index"; // 工具函数
import SidebarMenuItem from "./SidebarMenuItem.vue";
import { useRoute } from "vue-router";

const currentRoute = useRoute();

// 定义组件 props
const props = defineProps({
  menuList: {
    type: Array<any>,
    required: true,
    default: () => [],
  },
  basePath: {
    type: String,
    required: true,
  },
});

const isCollapse = ref(false);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
/**
 * 获取完整路径
 * @param routePath 路由路径 /user
 * @returns 完整的路径
 */
function getFullPath(routePath: string) {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }
  return path.resolve(props.basePath, routePath); // 父路径 + 子路径
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
