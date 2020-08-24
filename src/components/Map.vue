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
import styleObject from '../theme/icon-style';
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
let massMarks;
export default {
  name: 'amap',
  data() {
    return {
      map: {},
      Icon: {},
      facilityPoints: [],
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
      if (!massMarks) {
        massMarks = new AMap.MassMarks(
          //  'https://a.amap.com/jsapi_demos/static/citys.js',
          // 'http://47.103.63.36:8084/FtpFile/getFacilitiesPoint.json',
          [],
          {
            zIndex: 5, // 海量点图层叠加的顺序
            zooms: [14, 20], // 在指定地图缩放级别范围内展示海量点图层
            style: styleObject(), // 设置样式对象
          },
        );
        massMarks.setMap(this.map);
        console.log('initmap');
      }
      massMarks.clear();
      massMarks.setData(data);
      // var marker = new AMap.Marker({ content: ' ', map: this.map });

      // massMarks.on('mouseover', function (e) {
      //   marker.setPosition(e.data.lnglat);
      //   marker.setLabel({ content: e.data.guid });
      // });
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
    creatBounds(x, y, x1, y1) {
      return new AMap.Bounds(new AMap.LngLat(x, y), new AMap.LngLat(x1, y1));
    },
    async getFacilitiesPoint(params) {
      const data = await this.$Http.getFacilitiesPoint({
        params: params,
      });
      console.log(data.length);
      this.facilityPoints = data;
      this.addPoints(data);
    },
    async getDiseasePosition() {
      const data = await this.$Http.getFacilitiesPoint();
      this.addPoints(data);
    },
    addMapCover() {
      new AMap.DistrictSearch({
        extensions: 'all',
        subdistrict: 0,
      }).search('长宁区', function (status, result) {
        // 外多边形坐标数组和内多边形坐标数组
        var outer = [
          new AMap.LngLat(-360, 90, true),
          new AMap.LngLat(-360, -90, true),
          new AMap.LngLat(360, -90, true),
          new AMap.LngLat(360, 90, true),
        ];
        var holes = result.districtList[0].boundaries;

        var pathArray = [outer];
        pathArray.push.apply(pathArray, holes);
        var polygon = new AMap.Polygon({
          pathL: pathArray,
          strokeColor: '#00eeff',
          strokeWeight: 3,
          strokeOpacity: 0.5,
          fillColor: '#000000',
          fillOpacity: 0.35,
        });
        polygon.setPath(pathArray);
        var polygon2 = new AMap.Polygon({
          pathL: pathArray,
          strokeColor: '#00eeef',
          strokeWeight: 10,
          strokeOpacity: 0.05,
          fillColor: '#000000',
          fillOpacity: 0.35,
        });
        polygon.setPath(pathArray);
        polygon2.setPath(pathArray);
        viewInstance.map.add(polygon2);
        viewInstance.map.add(polygon);
      });
    },
  },
  computed: {
    showMassMarks() {
      return this.$store.state.mapShowFacility;
    },
    facilityType() {
      return this.$store.state.mapMode;
    },
  },
  watch: {
    showMassMarks: function (newState, oldState) {
      if (newState) {
        if (massMarks !== undefined) {
          massMarks.show();
        } else {
          // viewInstance.getFacilitiesPoint();
        }
      } else {
        if (massMarks !== undefined) {
          massMarks.hide();
        }
      }
    },
    facilityType: function (newData) {
      console.log(newData);
      if (this.showMassMarks) {
        this.getFacilitiesPoint(this.$store.state.facilityType);
      }
    },
  },
  mounted: function () {
    viewInstance = this;
    lazyAMapApiLoaderInstance.load().then(() => {
      // console.log('-----');
      viewInstance.map = this.map = new AMap.Map('amap-demo1', {
        center: [121.387843, 31.217981],
        zoom: 14,
        mapStyle: 'amap://styles/bdb73a3499c1514a95d915c898dba7ce',
        viewMode: '3D',
        zooms: [10, 18],
      });
      // viewInstance.map.setBounds(
      //   this.creatBounds(122.602519, 32.13992, 120.083903, 30.559067),
      // );
      viewInstance.map.setLimitBounds(
        this.creatBounds(121.288666, 31.164399, 121.511139, 31.26335),
      );
      this.Icon = new AMap.Icon({
        size: new AMap.Size(32, 32),
        image:
          '//47.103.63.36:8084/FtpFile/images/%E5%A4%A7%E7%90%86%E7%9F%B3%E7%90%83.png',
        imageSize: new AMap.Size(32, 32),
        imageOffset: new AMap.Pixel(0, 0),
      });
      viewInstance.getMap();
      // viewInstance.addPoints();
      // viewInstance.setPersonLocation();
      viewInstance.addMapCover();
    });
    if (this.showMassMarks) {
      this.getFacilitiesPoint();
    }
  },
};
</script>
<style scoped>
#amap-demo1 {
  height: 100vh;
}
</style>
