<template>
  <SidebarMenu :menu-list="permissionStore.routes" base-path="" />
</template>

<script setup lang="ts">
import SidebarMenu from "./components/SidebarMenu.vue";
import { usePermissionStore } from "@/store";

const permissionStore = usePermissionStore();
console.log("permissionStore.routes", permissionStore.routes);
</script>

<style scoped lang="scss"></style>
