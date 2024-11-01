<template>
  <div class="box" @click="emitEvent(item)">
    <div>
      <div class="el-image image">
        <img :src="item.imgUrl" class="el-image__inner" style="object-fit: cover;">
      </div>
    </div>
    <div class="author">
      <div class="mainAuthor">
        <div class="el-image author-image">
          <img :src="item.userUrl" class="el-image__inner">
        </div>
        <span>
          {{ item.name}}
          
        </span>
      </div>
      <div class="overAuthor">
      </div>
    </div>
    <div class="name-content">
      <div class="text">
        {{ item.text }}
      </div>
      <div class="overBox">
        <div class="leftOver">
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object,
    default() {
      return {};
    },
    required: true,
  }
});

const emit = defineEmits(['child-event']);
 
const emitEvent = (item) => {
  emit('child-event', item);
};


</script>

<style scoped lang="scss">
.box {
  padding: 16px 8px 8px;
  box-sizing: border-box;
  width: 230px;
  height: 270px;
  overflow: hidden;
  box-shadow: #00000029 0 3px 6px, #0000003b 0 3px 6px;
  border-radius: 3px;
  color: #111;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
  position: relative;
  .image {
    width: 200px;
    height: 194px;
    display: flex;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    transition: all .3s;
    object-fit: cover;
    transition: transform 0.3s, box-shadow 0.3s;
    .el-image__inner {
      opacity: 1;
      vertical-align: top;
      height: 100%;
      width: 100%;
    }
    &:hover {
      box-shadow:#00000061 0 6px 12px,#0000003b 0 6px 12px; /* 添加阴影效果 */
    }
  }
  .author {
    width: 100%;
    justify-content: center;
    font-size: 13px;
    transition: all .3s;
    display: flex;
    align-items: center;
    position: relative;
    .mainAuthor {
      display: flex;
      .author-image {
        width: 16px;
        height: 16px;
        display: inline-block;
        overflow: hidden;
        position: relative;
        > img {
          height: 100%;
          width: 100%;
        }
      }
      > span {
        margin-left: 8px;
        transition: all .3s;
      }
    }
    .overAuthor {
      position: absolute;
      pointer-events: none;
      display: flex;
      width: 100%;
      justify-content: space-between;
    }
  }
  .name-content {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .text {
      font-size: 14px;
      color: #1e232e;
    }
    .overBox {
      position: absolute;
      pointer-events: none;
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>