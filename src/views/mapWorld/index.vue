<template>
  <div class="map">
    <div class="olMap" ref="rootMap"></div>
  </div>
</template>
 
<script setup>
import 'ol/ol.css';
import { Map, View, Feature } from "ol";
import { Point, Polygon, MultiPolygon } from "ol/geom";
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import { defaults as defaultControls } from "ol/control";
import {
  Icon,
  Style,
  Stroke,
  Fill,
  Text
} from "ol/style";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import jxProvince from './js/jxProvince.json'
import MapIcon from "@/assets/images/map-icon.png";

const rootMap = ref(null);
let myMap = ref(null);
const viewCenter = [116.11552620102348, 27.834031408000037];
let provinceLayer = ref([]);
const provinceFeatures = jxProvince.features;

// 市区坐标
const marketPoint = [
  {
    name: "南昌市",
    code: 360100,
    count: 10,
    point: [116.02610062345879, 28.62934338703662],
  },
  {
    name: "景德镇市",
    code: 360200,
    count: 5,
    point: [117.24747695826355, 29.245939313546423],
  },
  {
    name: "萍乡市",
    code: 360300,
    count: 15,
    point: [113.92280903265085, 27.596563438034618],
  },
  {
    name: "九江市",
    code: 360400,
    count: 22,
    point: [115.73218786955243, 29.384092356190678],
  },
  {
    name: "新余市",
    code: 360500,
    count: 33,
    point: [114.93308542277694, 27.855951626170388],
  },
  {
    name: "鹰潭市",
    code: 360600,
    count: 65,
    point: [117.1155424408796, 28.22659542328873],
  },
  {
    name: "赣州市",
    code: 360700,
    count: 78,
    point: [115.40519015670739, 25.817654446210287],
  },
  {
    name: "吉安市",
    code: 360800,
    count: 11,
    point: [114.94619277548702, 27.011063704246165],
  },
  {
    name: "宜春市",
    code: 360900,
    count: 80,
    point: [115.11199327884891, 28.39280666328979],
  },
  {
    name: "抚州市",
    code: 361000,
    count: 46,
    point: [116.49147359000693, 27.50737955832136],
  },
  {
    name: "上饶市",
    code: 361100,
    count: 59,
    point: [117.88238826135124, 28.68747181269533],
  },
]
// 市区图层
let marketLayer = ref([]);

onMounted(() => {
  initMap();
  addMarketLayer();
});

const initMap = () => {
  const TIANDI_KEY = "4671f80f5cee88ecbc8e69ca8e8b8a8b";
  console.log('开始加载地图');
  
  // 图层集合
  let layers = [
    // 影像底图
    new TileLayer({
      source: new XYZ({
        url: `http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TIANDI_KEY}`,
      }),
    }),
    // 影像标记
    new TileLayer({
      source: new XYZ({
        url: `http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TIANDI_KEY}`,
      }),
    }),
  ];
  myMap.value = new Map({
    layers: layers,
    target: rootMap.value,
    view: new View({
      projection: "EPSG:4326",
      center: viewCenter,
      maxZoom: 18,
      minZoom: 7.6,
      zoom: 7.6,
    }),
    controls: defaultControls({
      zoom: false,
      rotate: false,
      attribution: false,
    }),
  });
  addArea();
}

// 设置区域
const addArea = () => {
  console.log('开始绘制', provinceFeatures);
  
  // this.cancelHighlight();
  // 销毁图层
  myMap.value.removeLayer(provinceLayer.value);
  provinceLayer.value = [];
  if (provinceFeatures.length == 0) {
    return false;
  }
  // 设置区描边-图层
  let features = [];
  provinceFeatures.forEach((item, index) => {
    if (index === 0 && item.selectShow) return;
    let lineData3 = item;
    let routeFeature3 = "";
    if (lineData3.geometry.type == "MultiPolygon") {
      routeFeature3 = new Feature({
        geometry: new MultiPolygon(lineData3.geometry.coordinates),
      });
    } else if (lineData3.geometry.type == "Polygon") {
      routeFeature3 = new Feature({
        geometry: new Polygon(lineData3.geometry.coordinates),
      });
    }
    console.log("地区：", item);
    routeFeature3.setStyle(
      new Style({
        // text: new Text({
        //   text: item.properties.name,
        //   fill: new Fill({ color: "#000" }),
        //   stroke: new Stroke({ color: "#fff", width: 2 }),
        //   font: "12px Calibri",
        // }),
        stroke: new Stroke({
          //边界宽度
          width: 3, //边界颜色
          color: "#00dcf5",
        }),
        zIndex: 11,
      })
    );
    features.push(routeFeature3);
  });
  provinceLayer.value = new VectorLayer({
    source: new VectorSource({
      features: features,
    }),
  });
  // 添加图层
  myMap.value.addLayer(provinceLayer.value);
  // 添加点击事件
  onClickEvent();
}

const onClickEvent = () => {
  // 当你需要取消点击事件的监听时，可以这样做：
  myMap.value.un("singleclick", handleMapClick, this);
  // ===== 监听地图单击事件 =====
  myMap.value.on("singleclick", handleMapClick, this);
}

const handleMapClick = (e) => {
  let feature = myMap.value.forEachFeatureAtPixel(
    e.pixel,
    (feature) => feature
  );
  let { coordinate } = e;
  if (feature) {
    //添加要素
    // var point = new Feature({
    //   geometry: new Point(coordinate),
    // });
    console.log(coordinate, "点击：", feature);
    if (feature.values_.onClick) {
      feature.values_.onClick();
    }
    // this.vectorLayer.addFeature(point);
  } else {
    console.log("click the map get coordinate", coordinate.join());
  }
}

// 绘制市区图层
const addMarketLayer = () => {
  console.log('绘制市区图层');
  // 先市区图层
  marketLayer.value.forEach((item) => {
    myMap.value.removeLayer(item);
  });
  marketLayer.value = [];
  marketPoint.forEach(item => {
    let itemFeature = new Feature({
      geometry: new Point(item.point), // 市区所在位置
      //名称属性
      name: `${item.count || 0}\n项目数量\n${
        item.name || "无"
      }`,
      onClick: () => {
        roamMap(item);
      },
    });
    itemFeature.setStyle(
      createMarketStyle(itemFeature)
    );
    marketLayer.value.push(
      new VectorLayer({
        source: new VectorSource({
          features: [itemFeature],
        }),
      })
    );
  })
  console.log('将市区图层添加到地图', marketLayer);
  // 将市区图层添加到地图
  marketLayer.value.forEach((item) => {
    // 添加图层
    myMap.value.addLayer(item);
    console.log('添加图层', item);
  });
}

// 市区的样式
const createMarketStyle = (feature) => {
  //返回一个样式
  return new Style({
    //把点的样式换成ICON图标
    image: new Icon({
      //控制标注图片和文字之间的距离
      anchor: [0.5, 60],
      //标注样式的起点位置
      anchorOrigin: "center",
      //X方向单位：分数
      anchorXUnits: "fraction",
      //Y方向单位：像素
      anchorYUnits: "pixels",
      //偏移起点位置的方向
      offsetOrigin: "center",
      //透明度
      opacity: 1,
      //图片路径
      src: MapIcon,
      scale: 0.6,
    }),
    //文本样式
    text: new Text({
      // 位置
      textAlign: "center",
      // 基准线
      textBaseline: "ideographic",
      // 文字样式
      font: "bold 14px 微软雅黑",
      // 文本内容
      text: `${feature.get("name")}`,

      fill: new Fill({
        //填充样式
        color: "#ffffff",
      }),
      backgroundFill: new Fill({
        // 填充背景
        color: "rgba(13,14,14, 0.6)",
      }),
      padding: [5, 5, 5, 5],
      zIndex: 1,
    }),
  });
}

// 漫游
const roamMap = (item) => {
  const view = myMap.value.getView();
  view.animate({
    center: item.point,
    zoom: 10,
  });
}


</script>

<style scoped lang="scss">
.map {
  width: 100%;
  height: 100%;
  .olMap {
    width: 100%;
    height: 100%;
  }
}
</style>