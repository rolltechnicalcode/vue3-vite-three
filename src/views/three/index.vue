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
          <!-- 模型案例 -->
          <div class="case-item">
            <el-divider content-position="left">模型案例</el-divider>
            <div class="examples">
              <div class="examples-item" v-for="item in modelList">
                <examplesItemComp :item="item" @child-event="onChildEvent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import barComp from './components/barComp.vue'
import examplesItemComp from '@/components/ThreeExamples/index.vue'

const basicList = ref<any>([
  {
    imgUrl: '/views/three/basicCase/Dotline.jpg',
    name: '太阳Code',
    text: '点线创建',
    exampleName: 'basicCase',
    compUrl: "Dotline",
  },
  {
    imgUrl: '/views/three/basicCase/Geometry.jpg',
    name: '太阳Code',
    text: '几何体创建',
    exampleName: 'basicCase',
    compUrl: "Geometry",
  }
])
const modelList = ref<any>([
  {
    imgUrl: '/views/three/modelCase/People.jpg',
    name: '太阳Code',
    text: '人模型加载',
    exampleName: 'modelCase',
    compUrl: "People",
    // exampleUrl: '/example/People'
  }
])

const onChildEvent = (data: any) => {
  console.log("点击：", data)
  if(data.compUrl) {
    let newUrl = router.resolve({
      path: "/example",
      query: {
        exampleName: data.exampleName,
        compUrl: data.compUrl,
        wdds: data.wdds
      },
    });
    // 路由跳转
    window.open(newUrl.href, "_blank");
    // window.open(data.compUrl)
  }
  
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
