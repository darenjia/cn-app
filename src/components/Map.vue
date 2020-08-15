<template>
  <div class="amap-page-container">
    <el-amap
      ref="map"
      vid="amapDemo"
      :amap-manager="AMapManager"
      :center="center"
      :zoom="zoom"
      :plugin="plugin"
      :events="events"
      class="amap-demo"
      mapStyle="dark"
    >
    </el-amap>
 
  </div>
</template>
<script>
import { AMapManager } from "vue-amap";
export default {
  name: "amap",
  data() {
    return {
      AMapManager,
      zoom: 12,
      center: [121.59996, 31.197646],
      events: {
        init: (o) => {
          console.log(o.getCenter());
          console.log(this.$refs.map.$$getInstance());
          o.getCity((result) => {
            console.log(result);
          });
        },
        moveend: () => {},
        zoomchange: () => {},
        click: (e) => {
          alert("map clicked" + e);
        },
      },
      plugin: [
        "ToolBar",
        {
          pName: "MapType",
          defaultType: 0,
          events: {
            init(o) {
              console.log(o);
            },
          },
        },
      ],
    };
  },
  methods: {
    getMap() {
      // amap vue component
      console.log(AMapManager._componentMap);
      // gaode map instance
      console.log(AMapManager._map);
    },
  },
};
</script>
<style scoped>
.amap-demo{
  height: 100vh;
}
</style>