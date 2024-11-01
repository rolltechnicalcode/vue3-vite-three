<template>
  <div class="home-main">
    <!-- <p>Count: {{ permissionStore.count }}</p>
    <button @click="incrementCount">Increment</button>
    <button @click="decrementCount">Decrement</button> -->
    <!-- 用户信息 -->
    <UserInfo />
    <!-- 数据卡片 -->
    <el-row :gutter="10" class="mt-5">
      <el-col :xs="24" :sm="12" :lg="6" v-for="item in visitStatsList">
        <el-card shadow="never">
          <template #header>
            <div class="flex-x-between">
              <span class="text-name">
                {{ item.title }}
              </span>
              <el-tag :type="item.tagType" size="small">{{ item.granularityLabel }}</el-tag>
            </div>
          </template>

          <div class="flex-x-between mt-2">
            <div class="flex-y-center">
              <span class="text-lg">{{ item.todayCount }}</span>
              <span class="text-xs" v-if="item.growthRate !== 0">
                <el-icon>
                  <Top v-if="item.growthRate > 0" />
                  <Bottom v-else-if="item.growthRate < 0" />
                </el-icon>
                {{ item.growthRate }}%
              </span>
            </div>
            <svg-icon :icon-class="item.icon" size="32" />
          </div>
          <div class="flex-x-between text-name mt-2">
            <span>总{{ item.title }}</span>
            <span>{{ item.totalCount }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="mt-5">
      <el-col :xs="24" :span="16">
        <!-- 访问趋势统计图 -->
        <VisitTrend id="VisitTrend" width="100%" height="360px" />
      </el-col>
      <el-col :xs="24" :span="8">
        <el-card>
          <template #header>
            <div class="flex-x-between">
              <div class="flex-y-center">
                通知公告
                <el-icon class="ml-1"><Notification /></el-icon>
              </div>
              <el-link type="primary">
                <span class="text-xs">查看更多</span>
                <el-icon class="text-xs"><ArrowRight /></el-icon>
              </el-link>
            </div>
          </template>

          <el-scrollbar height="360px">
            <div
              v-for="item in noticesList"
              :key="item.id"
              class="flex-y-center py-3"
            >
              <el-tag :type="item.tagType">{{ item.level }}</el-tag>
              <span class="text-name is-truncated">
                {{ item.title }} 
              </span>
              <el-icon class="text-sm" size="14"><View /></el-icon>
            </div>
          </el-scrollbar>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { usePermissionStore } from "@/store";

const permissionStore = usePermissionStore();

const visitStatsList = ref([
  {
    tagType: "success",
    "title": "在线用户",
    "todayCount": 0,
    "totalCount": 5,
    "growthRate": 0,
    "granularityLabel": "-",
    icon: "user"
  },
  {
    tagType: "primary",
    "title": "浏览量",
    "todayCount": 1003,
    "totalCount": 36193,
    "growthRate": 35,
    "granularityLabel": "日",
    icon: "pv"
  },
  {
    tagType: "success",
    "title": "访客数",
    "todayCount": 100,
    "totalCount": 2000,
    "growthRate": 0,
    "granularityLabel": "日",
    icon: "uv"
  },
  {
    tagType: "warning",
    "title": "IP数",
    "todayCount": 152,
    "totalCount": 3234,
    "growthRate": 20,
    "granularityLabel": "日",
    icon: "ip"
  }
])

const noticesList = ref([
  {
    "id": 10,
    "title": "v2.16.1 版本修复了 WebSocket 重复连接导致的后台线程阻塞问题，优化了通知公告。",
    tagType: 'success',
    "level": "系统升级",
    "publisherName": "系统管理员",
    "publishTime": "2024-09-30 17:30",
    "isRead": 0
  },
  {
    "id": 9,
    "title": "公司将在 10 月 15 日举办新产品发布会，敬请期待。",
    tagType: 'warning',
    "level": "公司新闻",
    "publisherName": "系统管理员",
    "publishTime": "2024-09-30 17:29",
    "isRead": 0
  },
  {
    "id": 8,
    "title": "国庆假期从 10 月 1 日至 10 月 7 日放假，共 7 天。",
    tagType: 'info',
    "level": "假期通知",
    "publisherName": "系统管理员",
    "publishTime": "2024-09-30 17:28",
    "isRead": 0
  },
  {
    "id": 7,
    "title": "最近发现一些钓鱼邮件，请大家提高警惕，不要点击陌生链接。",
    tagType: 'primary',
    "level": "安全警告",
    "publisherName": "系统管理员",
    "publishTime": "2024-09-30 17:27",
    "isRead": 0
  },
  {
    "id": 6,
    "title": "系统将于本周六凌晨 2 点进行维护，预计维护时间为 2 小时。",
    tagType: 'danger',
    "level": "系统维护",
    "publisherName": "系统管理员",
    "publishTime": "2024-09-30 17:26",
    "isRead": 0
  }
])

const incrementCount = () => {
  permissionStore.increment();
};

const decrementCount = () => {
  permissionStore.decrement();
};
</script>
<style lang="scss" scoped>
.home-main {
  height: 100%;
  background-color: #f2f3f5;
  padding: 24px;
  .items-center {
    align-items: center;
  }
  .flex {
    display: flex;
  }
  .mt-5 {
    margin-top: 20px;
  }
  .mt-2 {
    margin-top: 10px;
  }
  .flex-x-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .text-name {
    color: #909399;
  }
  .text-lg {
    font-weight: bold;
  }
  .text-xs {
    margin-left: 10px;
    color: #67c23a;
    font-size: 12px;
  }
  .flex-y-center {
    display: flex;
    align-items: center;
    font-size: 12px;
  }
  .py-3 {
    padding: 12px 0;
  }
  .is-truncated {
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0 10px;
    flex: 1 1 0%;
  }
}
</style>
