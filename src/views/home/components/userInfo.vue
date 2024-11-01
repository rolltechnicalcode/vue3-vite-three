<template>
  <el-card>
    <el-row class="space-between">
      <el-col :span="18" :xs="24">
        <div class="left-user">
          <img
            class="rounded-full"
            src="@/assets/images/user-full.gif"
          />
          <div>
            <p>系统管理员！</p>
            <p class="text-gray">
              今日天气晴朗，气温在15℃至25℃之间，东南风。
            </p>
          </div>
        </div>
      </el-col>
      <el-col :span="6" :xs="24">
        <div class="flex-around">
          <el-statistic
            v-for="item in statisticData"
            :key="item.key"
            :value="item.value"
          >
            <template #title>
              <div class="items-center flex">
                <svg-icon :icon-class="item.iconClass" size="20px" />
                <span class="text">{{ item.title }}</span>
              </div>
            </template>
            <template v-if="item.suffix" #suffix>/100</template>
          </el-statistic>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
import { usePermissionStore } from "@/store";
const permissionStore = usePermissionStore();

// 右上角数量
const statisticData = ref([
  {
    value: 99,
    iconClass: "message",
    title: "消息",
    key: "message",
  },
  {
    value: 50,
    iconClass: "todo",
    title: "待办",
    suffix: "/100",
    key: "upcoming",
  },
  {
    value: 10,
    iconClass: "project",
    title: "项目",
    key: "project",
  },
]);

</script>
<style lang="scss" scoped>
.space-between {
  justify-content: space-between;
  .left-user {
    display: flex;
    align-items: center;
    .rounded-full {
      width: 80px;
      height: 80px;   
      margin-right: 20px; 
      border-radius: 50%;
    }
    .text-gray {
      color: #9ca3af;
      font-size: 12px;
      line-height: 20px;
    }
  }
  .flex-around {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .text {
      margin-left: 5px;
      font-size: 16px;
    }
  }
}
</style>
