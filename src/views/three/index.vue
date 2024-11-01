<template>
  <div class="three-main">
    <barComp />
    <div class="navigation-parent">
      <div class="navigation">
        <div class="basic-main">
          <!-- 基础案例 -->
          <div class="case-item">
            <el-divider content-position="left">基础案例</el-divider>
            <div class="examples">
              <div class="examples-item" v-for="item in basicList">
                <examplesItemComp :item="item" @child-event="onChildEvent" />
              </div>
            </div>
          </div>
          <!-- 高级案例 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import barComp from './components/barComp.vue'
import examplesItemComp from '@/components/ThreeExamples/index.vue'

const basicList = ref<any>([
  {
    imgUrl: 'https://z2586300277.github.io/three-cesium-examples/threeExamples/basic/modelLoad.jpg',
    userUrl: 'https://z2586300277.github.io/three-cesium-examples/files/author/z2586300277.png',
    name: '太阳Code',
    text: '几何体创建',
    exampleUrl: ''
  }
])

const onChildEvent = (data: any) => {
  console.log("点击：", data)
  // 路由跳转
  window.open('/example')
}


</script>

<style scoped lang="scss">
.three-main {
  height: 100%;
  .navigation-parent {
    width: 100%;
    height: calc(100% - 46px);
    overflow: auto;
    .navigation {
      width: 100%;
      height: 100%;
      padding: 15px 20px 20px;
      box-sizing: border-box;
      .basic-main {
        .examples {
          box-sizing: border-box;
          width: 100%;
          display: grid;
          grid-template-columns: repeat(auto-fill, 250px);
          grid-template-rows: repeat(auto-fill, 290px);
          grid-row-gap: 5px;
          grid-column-gap: 5px;
          .examples-item{
            width: 250px;
            height: 290px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }
}
</style>
