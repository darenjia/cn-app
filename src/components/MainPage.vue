<template>
  <div>
    <div class="content-main">
      <Map></Map>
      <div class="header">
        <page-header></page-header>
      </div>
      <transition name="slide-left">
        <router-view class="statistic1 statistic-box" name="left"></router-view>
      </transition>
      <transition name="slide-right"
        ><router-view
          class="statistic3 statistic-box"
          name="right"
        ></router-view
      ></transition>

      <!-- <router-view
        :class="['detail-content', { 'hide-detail': !isShowPointDetail }]"
        name="center"
      ></router-view> -->
      <div
        :class="[
          'detail-content',
          {
            'hide-detail': !isShowPointDetail,
            'detail-content-big': detailMode === 1,
          },
        ]"
      >
        <detail-card></detail-card>
      </div>

      <div class="setting"><setting-view /></div>
      <!-- <div class="legend">
        <legend-card></legend-card>
      </div> -->
    </div>
  </div>
</template>
<script>
import Map from './Map.vue';
import PageHeader from './header/PageHeader';
import SettingView from './SettingView';
import minxins from '../plugins/mixins';
import DetailCard from './first/DetailCard';

export default {
  name: 'app',
  mixins: [minxins],
  openMqTT: true,
  data() {
    this.theme = this.$ChartTheme;
    return {
      RankState: true,
    };
  },
  components: {
    Map,
    PageHeader,
    SettingView,
    DetailCard,
  },
  created() {
    const tab = this.$store.state.tabMode;
    const path = parseInt(this.$route.name);
    if (path !== tab) {
      this.$store.commit('changeTabMode', path - 1);
    }
  },
  computed: {
    isShowRank: function () {
      return this.$store.state.showRankList;
    },
    isShowStatistic() {
      return this.$store.state.showStatisticGraph;
    },
    isShowPointDetail() {
      return this.$store.state.showPointDetail;
    },
    detailMode() {
      return this.$store.state.detailMode;
    },
  },
  methods: {
    changeRankShow: function () {
      this.RankState = !this.RankState;
    },
    receiveMessageSuccess() {
      this.$store.commit('changeUpdateDataFlag');
    },
  },
};
</script>

<style lang="less" scoped>
.statistic1 {
  left: 0px;
}
.statistic2 {
  left: 21%;
}
.statistic3 {
  right: 0px;
}
.statistic4 {
  right: 21%;
}
.statistic-box {
  position: absolute;
  width: 384px;
  margin: 0px 10px;
  bottom: 0px;
  top: 50%;
  height: 800px;
  margin-top: -345px;
  transition: all ease 0.2s;
}

.detail-content {
  width: 300px;
  bottom: 0px;
  position: absolute;
  top: 50%;
  margin-top: -245px;
  right: 22%;
  height: 600px;
  //margin-right: 22%;
  //   background: @primaryColor;
}
.detail-content-big {
  right: 0;
  left: 0;
  width: 50%;
  // transform: translateX(50%);
  margin-left: 25%;
}
.boxall {
  //   border: 1px solid rgba(25, 186, 139, 0.17);
  background: url('../assets/img/line.png');
  background-size: 100% auto;
  margin-bottom: 0.15rem;
}
.boxall:before,
.boxall:after {
  position: absolute;
  width: 1.1rem;
  height: 1.1rem;
  content: '';
  border-top: 2px solid #02a6b5;
  top: 0;
  z-index: 2;
}
.boxall:before,
.boxfoot:before {
  border-left: 2px solid #02a6b5;
  left: 0;
}
.boxall:after,
.boxfoot:after {
  border-right: 2px solid #02a6b5;
  right: 0;
}
.boxfoot {
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
}
.boxfoot:before,
.boxfoot:after {
  position: absolute;
  width: 1.1rem;
  height: 1.1rem;
  content: '';
  border-bottom: 2px solid #02a6b5;
  bottom: 0;
}
.hide-detail {
  display: none;
}

.header {
  width: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
}
.first-row {
  margin-top: 80px;
}
.content-header {
  position: absolute;
}
.content-main {
  overflow: hidden;
  height: 100%;
  width: 100%;
}
.map-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
}
.statistic1-hide {
  left: -40%;
  // width: 0px;
  // height: 0px;
  display: none;
}

.statistic3-hide {
  right: -40%;
  // width: 0px;
  // height: 0px;
  display: none;
}
.setting {
  position: absolute;
  bottom: 2px;
  left: 50%;
  margin-left: -40px;
  width: 80px;
  height: 36px;
}
.legend {
  position: absolute;
  bottom: 2px;
  right: 20%;
  width: 100px;
  height: 100px;
}
.statistic-header {
  position: absolute;
  top: 120px;
  width: 50%;
  left: 50%;
  margin-left: -25%;
}
</style>
