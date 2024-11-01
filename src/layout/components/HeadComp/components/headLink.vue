<template>
  <div class="topLink">
    <div class="drop-item" v-for="item in linkList" :key="item.name">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ item.name }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown v-if="item.downList?.length">
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="downItem in item.downList"
              :key="downItem.downName"
              @click="handleLink(downItem.url)"
            >
              {{ downItem.downName }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
const linkList = [
  {
    name: "📦Three",
    downList: [
      {
        downName: "🏡Home",
        url: "https://threejs.org/",
      },
      {
        downName: "📚Documents",
        url: "https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene",
      },
      {
        downName: "🐘Examples",
        url: "https://threejs.org/examples/#webgl_animation_keyframes",
      },
    ],
  },
  {
    name: "🌐Cesium",
    downList: [
      {
        downName: "🏡Home",
        url: "https://cesium.com/cesiumjs/",
      },
      {
        downName: "🏠中文网",
        url: "http://cesium.xin/",
      },
      {
        downName: "📚Documents",
        url: "https://cesium.com/docs/cesiumjs-ref-doc/",
      },
      {
        downName: "🐘Examples",
        url: "https://sandcastle.cesium.com/",
      },
    ],
  },
  {
    name: "📦Three",
    downList: [
      {
        downName: "📦Three",
        url: "https://github.com/mrdoob/three.js",
      },
      {
        downName: "🌐Cesium",
        url: "https://github.com/CesiumGS/cesium",
      },
      {
        downName: "⭐Join us",
        url: "https://github.com/z2586300277/three-cesium-examples",
      },
    ],
  },
];

const handleLink = (url: string) => {
  window.open(url);
};
</script>

<style scoped lang="scss">
.topLink {
  display: flex;
  .drop-item {
    margin-right: 20px;
    &:deep(.el-dropdown) {
      height: 100%;
    }
    .el-tooltip__trigger:focus {
      outline: none; // unset 这个也行
    }
    .el-dropdown-link {
      color: #cac1c1;
      font-size: 16px;
      display: flex;
      align-items: center;
    }
  }
  .link-name {
    color: #cac1c1;
    font-size: 16px;
  }
}
</style>
