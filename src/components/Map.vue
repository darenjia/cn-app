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
import diseaseStyleObject from '../theme/disease-icon-style';
// eslint-disable-next-line no-undef
/* global AMap */
/* global Loca */

// 创建一个 icon
let personLoaction;
let viewInstance;
let massMarks;
let diseaseMassMarks;
let heatmap;
let lineLayer;
let polygonLayer;
let overlay;
// var colors = [
//   '#07E8E4',
//   '#1f78b4',
//   '#b2df8a',
//   '#33a02c',
//   '#fb9a99',
//   '#e31a1c',
//   '#fdbf6f',
//   '#ff7f00',
// ];
const colors = ['#E6688A', '#70B0Bf', '#FDD775', '#8DBE6E', '#4b5966'];
export default {
  name: 'amap',
  data() {
    return {
      map: {},
      Icon: {},
      facilityPoints: [],
      showMassMark: false,
    };
  },
  methods: {
    setMap(data) {
      // if (!pointLayer) {
      //   pointLayer = new Loca.PointCloudLayer({
      //     map: viewInstance.map,
      //   });
      //   pointLayer.setOptions({
      //     style: {
      //       opacity: 0.8,
      //       radius: 0.9,
      //       color: 'rgba(42, 167, 184, 1)',
      //     },
      //   });
      // }
      // pointLayer.setData(data, {
      //   lnglat: 'lnglat',
      // });
      // pointLayer.render();
      const mapData = [];
      for (const key in data) {
        mapData.push({
          lng: data[key].lnglat[0],
          lat: data[key].lnglat[1],
        });
      }
      if (!heatmap) {
        heatmap = new AMap.Heatmap(this.map, {
          radius: 3, // 给定半径
          opacity: [0, 0.8],
          gradient: {
            0.2: '#ffd89b',
            0.3: '#DCC496',
            0.5: '#A4A48f',
            // 0.7: '#466E81',
            0.7: '#678186',
            1.0: '#19547b',
          },
          zooms: [14, 17],
        });
      }
      heatmap.setDataSet({
        data: mapData,
      });
    },
    addPoints(data) {
      this.showPoint();
      console.log('加载points', data.length);
      this.setMap(data);
      if (!massMarks) {
        massMarks = new AMap.MassMarks(
          //  'https://a.amap.com/jsapi_demos/static/citys.js',
          // 'http://47.103.63.36:8084/FtpFile/getFacilitiesPoint.json',
          [],
          {
            zIndex: 5, // 海量点图层叠加的顺序
            zooms: [18, 20], // 在指定地图缩放级别范围内展示海量点图层
            style: styleObject(), // 设置样式对象
          },
        );
        massMarks.setMap(this.map);
        // console.log('initmap');
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
    addDiseasePoints(data) {
      if (!diseaseMassMarks) {
        diseaseMassMarks = new AMap.MassMarks(
          //  'https://a.amap.com/jsapi_demos/static/citys.js',
          // 'http://47.103.63.36:8084/FtpFile/getFacilitiesPoint.json',
          [],
          {
            zIndex: 10, // 海量点图层叠加的顺序
            zooms: [14, 20], // 在指定地图缩放级别范围内展示海量点图层
            style: diseaseStyleObject(), // 设置样式对象
          },
        );
        diseaseMassMarks.setMap(this.map);
        diseaseMassMarks.on('click', function (e) {
          viewInstance.showPointDetail(e.data.guid);
        });
      }
      diseaseMassMarks.clear();
      diseaseMassMarks.setData(data);
      // var marker = new AMap.Marker({ content: ' ', map: this.map });

      // massMarks.show();
      // massMarks.hide();
      // for (const key in data) {
      //   const point = data[key];
      //   this.map.add(this.createMarker(this.createLnglat(point.lnglat)));
      // }
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
    addPolyline(data) {
      console.log('加载line', data.length);
      this.addLineLayer(data);
      // data.forEach(element => {
      //   viewInstance.overlay.addOverlay(
      //     viewInstance.createLine(
      //       viewInstance.createLnglatArray(element.lnglat),
      //     ),
      //   );
      // });
      // this.overlay.show();
    },
    addPolygon(data) {
      console.log('加载polygon', data.length);
      this.addPolygonLayer(data);
      // data.forEach(element => {
      //   viewInstance.overlay.addOverlay(
      //     viewInstance.createPolygon(
      //       viewInstance.createLnglatArray(element.lnglat),
      //     ),
      //   );
      // });
      // this.overlay.show();
    },
    createMarker(lnglat) {
      return new AMap.Marker({
        position: lnglat,
        icon: viewInstance.creatIcon(),
        offset: new AMap.Pixel(0, 0),
        animation: 'AMAP_ANIMATION_DROP',
        zIndex: 9999,
      });
    },
    creatIcon() {
      return new AMap.Icon({
        size: new AMap.Size(24, 24),
        image: '/image/images/icon_location3.png',
        imageSize: new AMap.Size(24, 24),
      });
    },
    createLine(lnglats) {
      return new AMap.Polyline({
        path: lnglats,
        strokeColor: '#fff',
        strokeWeight: 1,
        lineJoin: 'round',
      });
    },
    createPolygon(lnglats) {
      return new AMap.Polygon({
        path: lnglats,
        strokeColor: '#fff',
        strokeWeight: 0.5,
        lineJoin: 'round',
        fillColor: '#fff',
        fillOpacity: 0.5,
      });
    },
    hidePolylineLayer() {
      if (lineLayer !== undefined) {
        lineLayer.hide();
      }
    },
    hidePolygonLayer() {
      if (polygonLayer !== undefined) {
        polygonLayer.hide();
      }
    },
    hidePoint() {
      if (massMarks !== undefined) {
        massMarks.hide();
      }
      if (heatmap !== undefined) {
        heatmap.hide();
      }
    },
    showPolyline() {
      if (lineLayer) {
        lineLayer.show();
      }
      this.hidePolygonLayer();
      this.hidePoint();
    },
    showPolygon() {
      if (polygonLayer) {
        polygonLayer.show();
      }
      this.hidePolylineLayer();
      this.hidePoint();
    },
    showPoint() {
      if (massMarks !== undefined) {
        massMarks.show();
      }
      if (heatmap !== undefined) {
        heatmap.show();
      }
      this.hidePolylineLayer();
      this.hidePolygonLayer();
    },
    createLnglatArray(lnglats) {
      const array = [];
      for (const key in lnglats) {
        array.push(this.createLnglat(lnglats[key]));
      }
      return array;
    },
    createLnglat(lnglat) {
      return new AMap.LngLat(lnglat[0], lnglat[1]);
    },
    createLnglats(x, y) {
      return new AMap.LngLat(x, y);
    },
    creatBounds(x, y, x1, y1) {
      return new AMap.Bounds(new AMap.LngLat(x, y), new AMap.LngLat(x1, y1));
    },
    addCurrentPoint(lnglat) {
      overlay.clearOverlays();
      const marker = this.createMarker(lnglat);
      marker.on('click', function (e) {
        viewInstance.showPointDetail(viewInstance.diseaseGuid);
      });
      overlay.addOverlay(marker);
    },
    showPointDetail(guid) {
      this.$store.commit('changePointDetail', guid);
    },
    async getDiseaseDetailInfo(id) {
      const data = await this.$Http.getDiseaseDetailInfo({
        params: { PatrolPointGuid: id },
      });
      if (data[0]) {
        const pos = data[0].tempgaodexy.split(',');
        console.log(data[0].tempgaodexy);
        this.addCurrentPoint(
          this.createLnglats(parseFloat(pos[1]), parseFloat(pos[0])),
        );
      }
    },
    async getFacilitiesPoint(params) {
      const data = await this.$Http.getFacilitiesPoint({
        params: params,
      });
      // this.facilityPoints = data;
      if (data.length > 0) {
        this.addPoints(data);
      } else {
        this.getFacilitiesLine(params);
      }
    },
    async getFacilitiesLine(params) {
      const data = await this.$Http.getFacilitiesLine({
        params: params,
      });
      if (data.length > 0) {
        this.addPolyline(data);
      } else {
        this.getFacilitiesArea(params);
      }
    },
    async getFacilitiesArea(params) {
      const data = await this.$Http.getFacilitiesArea({
        params: params,
      });
      if (data.length > 0) {
        this.addPolygon(data);
      }
    },
    async getDiseasePosition(params) {
      const data = await this.$Http.getDiseasePosition({ params: params });
      console.log('getDiseasePosition', data.length);
      this.addDiseasePoints(data);
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
    addLineLayer(lines) {
      // 点类型图层
      this.showPolyline();
      if (!lineLayer) {
        lineLayer = new Loca.LineLayer({
          map: viewInstance.map,
        });
        lineLayer.setOptions({
          style: {
            borderWidth: 3,
            opacity: 1,
            color: function (v) {
              var id = v.value.style;
              var len = colors.length;
              return colors[id % len];
            },
          },
        });
      }
      lineLayer.setData(lines, {
        lnglat: 'lnglat',
      });

      lineLayer.render();
    },
    addPolygonLayer(polylines) {
      // 点类型图层
      this.showPolygon();
      if (!polygonLayer) {
        polygonLayer = new Loca.PolygonLayer({
          map: viewInstance.map,
        });
        polygonLayer.setOptions({
          style: {
            borderWidth: 3,
            opacity: 1,
            color: function (v) {
              var id = v.value.style;
              var len = colors.length;
              return colors[id % len];
            },
          },
        });
      }
      polygonLayer.setData(polylines, {
        lnglat: 'lnglat',
      });

      polygonLayer.render();
    },
  },
  computed: {
    // showMassMarks() {
    //   return this.showMassMark;
    // },
    showFacility() {
      return this.$store.state.mapShowFacility;
    },
    showDiseaseMassMarks() {
      return this.$store.state.mapShowDisease;
    },
    facilityType() {
      return this.$store.state.mapMode;
    },
    diseaseType() {
      return this.$store.state.diseaseType;
    },
    diseaseGuid() {
      return this.$store.state.currentPointGuid;
    },
  },
  watch: {
    showFacility: function (newState, oldState) {
      this.showMassMark = newState;
      if (!newState) {
        this.hidePolygonLayer();
        this.hidePolylineLayer();
      }
    },
    showMassMark: function (newState, oldState) {
      if (!newState) {
        this.hidePoint();
      }
    },
    showDiseaseMassMarks: function (newState, oldState) {
      if (newState) {
        if (diseaseMassMarks !== undefined) {
          diseaseMassMarks.show();
        } else {
          // viewInstance.getFacilitiesPoint();
        }
      } else {
        if (diseaseMassMarks !== undefined) {
          diseaseMassMarks.hide();
        }
      }
    },
    facilityType: function (newData) {
      if (this.showFacility) {
        this.getFacilitiesPoint(this.$store.state.facilityType);
      }
    },
    diseaseType: function (newData) {
      if (this.showDiseaseMassMarks) {
        this.getDiseasePosition(newData);
      }
    },
    diseaseGuid: function (newData) {
      if (newData !== '') {
        this.getDiseaseDetailInfo(newData);
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
        viewMode: '2D',
        zooms: [10, 18],
        features: ['bg', 'road', 'building'], //,
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
      // viewInstance.addPoints();
      // viewInstance.setPersonLocation();
      viewInstance.addMapCover();
      overlay = new AMap.OverlayGroup();
      overlay.setMap(this.map);
      const jsUrl =
        'https://webapi.amap.com/loca?key=39cd02837fed49ae1be5cbc914d86b26&v=1.3.2'; // JS地址
      const jqueryJs = decodeURIComponent(jsUrl);
      const oscript = document.createElement('script');
      oscript.src = jqueryJs;
      document.head.appendChild(oscript);
    });
  },
};
</script>
<style scoped>
#amap-demo1 {
  height: 100vh;
}
</style>
