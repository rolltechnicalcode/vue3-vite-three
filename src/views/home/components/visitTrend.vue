<!--  线 + 柱混合图 -->
<template>
  <el-card>
    <template #header>
      <div class="flex-x-between">
        <div class="flex-y-center">
          访问趋势
          <el-tooltip effect="dark" content="点击试试下载" placement="bottom">
            <el-icon
              class="cursor-pointer hover:color-#4080FF ml-1"
              name="el-icon-download"
              @click="handleDownloadChart"
            >
              <Download />
            </el-icon>
          </el-tooltip>
        </div>

        <el-radio-group
          v-model="dataRange"
          size="small"
          @change="handleDateRangeChange"
        >
          <el-radio-button label="近7天" :value="1" />
          <el-radio-button label="近30天" :value="2" />
        </el-radio-group>
      </div>
    </template>

    <div :id="id" :class="className" :style="{ height, width }" />
  </el-card>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
const dataRange = ref(1);
const chart: Ref<echarts.ECharts | null> = ref(null);

const props = defineProps({
  id: {
    type: String,
    default: "VisitTrend",
  },
  className: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "200px",
    required: true,
  },
  height: {
    type: String,
    default: "200px",
    required: true,
  },
});

/** 设置图表  */
const setChartOptions = (data: any) => {
  if (!chart.value) {
    return;
  }

  const options = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["浏览量(PV)", "IP"],
      bottom: 0,
    },
    grid: {
      left: "1%",
      right: "5%",
      bottom: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: data.dates,
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
        },
      },
    },
    series: [
      {
        name: "浏览量(PV)",
        type: "line",
        data: data.pvList,
        areaStyle: {
          color: "rgba(64, 158, 255, 0.1)",
        },
        smooth: true,
        itemStyle: {
          color: "#4080FF",
        },
        lineStyle: {
          color: "#4080FF",
        },
      },
      {
        name: "IP",
        type: "line",
        data: data.ipList,
        areaStyle: {
          color: "rgba(103, 194, 58, 0.1)",
        },
        smooth: true,
        itemStyle: {
          color: "#67C23A",
        },
        lineStyle: {
          color: "#67C23A",
        },
      },
    ],
  };

  chart.value.setOption(options);
};

/** 加载数据 */
const loadData = () => {
  const data = {
    "dates": [
      "2024-06-30",
      "2024-07-01",
      "2024-07-02",
      "2024-07-03",
      "2024-07-04",
      "2024-07-05",
      "2024-07-06",
      "2024-07-07"
    ],
    "pvList": [
      1751,
      5168,
      4882,
      5301,
      4721,
      4885,
      1901,
      1003
    ],
    "uvList": null,
    "ipList": [
      207,
      566,
      565,
      631,
      579,
      496,
      222,
      152
    ]
  };
  setChartOptions(data);
};

const handleDateRangeChange = () => {
  loadData();
};

/** 下载图表 */
const handleDownloadChart = () => {
  if (!chart.value) {
    return;
  }

  // 获取画布图表地址信息
  const img = new Image();
  img.src = chart.value.getDataURL({
    type: "png",
    pixelRatio: 1,
    backgroundColor: "#fff",
  });
  // 当图片加载完成后，生成 URL 并下载
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const link = document.createElement("a");
      link.download = "访问趋势.png";
      link.href = canvas.toDataURL("image/png", 0.9);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };
};

/** 窗口大小变化时，重置图表大小 */
const handleResize = () => {
  setTimeout(() => {
    if (chart.value) {
      chart.value.resize();
    }
  }, 100);
};
/** 初始化图表  */
onMounted(() => {
  chart.value = markRaw(
    echarts.init(document.getElementById(props.id) as HTMLDivElement)
  );
  loadData();

  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});

onActivated(() => {
  handleResize();
});
</script>
<style lang="scss" scoped>
.flex-x-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
