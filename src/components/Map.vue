<template>
  <div class="amap-page-container" id="amap-demo1">
    <!-- <el-amap
      ref="map"
      vid="amapDemo"
      :amap-manager="AMapManager"
      :zoom="zoom"
      :plugin="plugin"
      :events="events"
      class="amap-demo"
      mapStyle="dark"
    >
    </el-amap> -->
  </div>
</template>
<script>
import { lazyAMapApiLoaderInstance } from 'vue-amap';
// eslint-disable-next-line no-undef
/* global AMap */

// 创建一个 icon
let personLoaction;
let viewInstance;
const positions = [
  [121.52218, 31.178482],
  [121.53221, 31.179026],
  [121.53204, 31.158628],
  [121.52204, 31.138631],
  [121.51211, 31.138639],
];
let flag = 0;
export default {
  name: 'amap',
  data() {
    return {
      map: {},
      Icon: {},
    };
  },
  methods: {
    getMap() {
      const marker = new AMap.Marker({
        position: [121.35782904062722, 31.198521967336713],
      });
      marker.setMap(this.map);
    },
    addPoints(data) {
      // 创建样式对象
      const styleObject = [
        {
          url: 'https://a.amap.com/jsapi_demos/static/images/mass0.png',
          anchor: new AMap.Pixel(6, 6),
          size: new AMap.Size(11, 11),
        },
        {
          url: 'https://a.amap.com/jsapi_demos/static/images/mass1.png',
          anchor: new AMap.Pixel(4, 4),
          size: new AMap.Size(7, 7),
        },
        {
          url: 'https://a.amap.com/jsapi_demos/static/images/mass2.png',
          anchor: new AMap.Pixel(3, 3),
          size: new AMap.Size(5, 5),
        },
      ];

      const massMarks = new AMap.MassMarks(
        //  'https://a.amap.com/jsapi_demos/static/citys.js',
        // 'http://47.103.63.36:8084/FtpFile/getFacilitiesPoint.json',
        [],
        {
          zIndex: 5, // 海量点图层叠加的顺序
          zooms: [5, 20], // 在指定地图缩放级别范围内展示海量点图层
          style: styleObject, // 设置样式对象
        },
      );
      massMarks.setData(data);
      massMarks.setMap(this.map);
      var marker = new AMap.Marker({ content: ' ', map: this.map });

      massMarks.on('mouseover', function (e) {
        marker.setPosition(e.data.lnglat);
        marker.setLabel({ content: e.data.name });
      });
      // massMarks.show();
      // massMarks.hide();
    },
    setPersonLocation() {
      // 将 icon 传入 marker
      personLoaction = this.createMarker(this.createLnglat());
      // 将 markers 添加到地图
      this.map.add(personLoaction);
      // personLoaction.on('mouseover', function () {
      //   personLoaction.setAnimation('AMAP_ANIMATION_NONE');
      // });
      // personLoaction.on('mouseout', function () {
      //   personLoaction.setAnimation('AMAP_ANIMATION_BOUNCE');
      // });
      // map自适应范围
      // map.setFitView();
      setInterval(function () {
        const lnglat = viewInstance.createLnglat();
        viewInstance.map.panTo(lnglat);
        personLoaction.setPosition(lnglat);
        // personLoaction.moveTo(lnglat, 100);
      }, 5000);
    },
    createMarker(lnglat) {
      return new AMap.Marker({
        position: lnglat,
        icon: viewInstance.Icon,
        offset: new AMap.Pixel(-13, -30),
        animation: 'AMAP_ANIMATION_BOUNCE',
      });
    },
    createLnglat() {
      const i = ++flag % 5;
      return new AMap.LngLat(positions[i][0], positions[i][1]);
    },
    async getFacilitiesPoint() {
      const data = await this.$Http.getFacilitiesPoint();
      this.addPoints(data);
    },
  },
  mounted: function () {
    viewInstance = this;
    lazyAMapApiLoaderInstance.load().then(() => {
      // console.log('-----');
      viewInstance.map = this.map = new AMap.Map('amap-demo1', {
        center: [121.35782904062722, 31.198521967336713],
        zoom: 14,
        mapStyle: 'amap://styles/e5456c58202cf2aaebfbf84992528316',
      });
      this.Icon = new AMap.Icon({
        size: new AMap.Size(25, 34),
        image:
          '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
        imageSize: new AMap.Size(135, 40),
        imageOffset: new AMap.Pixel(-95, -3),
      });
      viewInstance.getMap();
      viewInstance.addPoints();
      // viewInstance.setPersonLocation();
    });
    this.getFacilitiesPoint();
  },
};
</script>
<style scoped>
#amap-demo1 {
  height: 100vh;
}
</style>
