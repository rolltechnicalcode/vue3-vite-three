<template>
  <div class="map">
    <div class="olMap" ref="rootMap"></div>
  </div>
</template>
 
<script setup>
import 'ol/ol.css';
import { Map, View, Feature } from "ol";
import { Polygon, MultiPolygon } from "ol/geom";
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import { defaults as defaultControls } from "ol/control";
import {
  Style,
  Stroke
} from "ol/style";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import jxProvince from './js/jxProvince.json'

const rootMap = ref(null);
let myMap = ref(null);
const viewCenter = [116.11552620102348, 27.834031408000037];
let provinceLayer = ref([]);
const provinceFeatures = jxProvince.features;

onMounted(() => {
  initMap();
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
      // maxZoom: 18,
      // minZoom: 7.6,
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
  // this.onClickEvent();
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