<template>
  <div>
    <div class="content-main">
      <Map></Map>
      <div class="header">
        <page-header></page-header>
      </div>
      <div class="statistic-header">
        <statistic-header></statistic-header>
      </div>
      <!-- <div class="map-container"></div> -->
      <div
        :class="[
          isShowStatistic ? '' : 'statistic1-hide',
          'statistic3',
          'statistic-box',
        ]"
      >
        <div class="filter-bg">
          <statistic-disease-detail></statistic-disease-detail>
        </div>
      </div>
      <div
        :class="[
          isShowStatistic ? '' : 'statistic1-hide',
          'statistic1',
          'statistic-box',
        ]"
      >
        <div class="filter-bg">
          <statistic-facility-detail></statistic-facility-detail>
        </div>
      </div>
      <div
        :class="[
          isShowRank ? '' : 'statistic3-hide',
          'statistic3',
          'statistic-box',
        ]"
      >
        <div class="filter-bg">
          <rank-list :title="'病害标段排行'" :type="'facility'"></rank-list>
          <!-- <statistic-table-four></statistic-table-four> -->
          <rank-list :title="'考核分数排行'" :type="'disease'"></rank-list>
        </div>
        <!-- <statistic-table-two></statistic-table-two> -->
      </div>
      <div
        :class="[
          isShowRank ? '' : 'statistic3-hide',
          'statistic1',
          'statistic-box',
        ]"
      >
        <div class="filter-bg">
          <rank-list :title="'病害类型排行'" :type="'road'"></rank-list>
          <rank-list :title="'病害道路排行'" :type="'disease'"></rank-list>
        </div>
      </div>
      <div :class="['detail-content', { 'hide-detail': !isShowPointDetail }]">
        <detail-card />
      </div>
      <div class="setting"><setting-view /></div>
      <div class="legend">
        <legend-card></legend-card>
      </div>
    </div>
  </div>
</template>
<script>
import Map from './Map.vue';
import StatisticHeader from './header/StatisticHeader';
import PageHeader from './header/PageHeader';
import RankList from './RankingList';
import DetailCard from './DetailCard';
import StatisticFacilityDetail from './StatisticFacilityDetail';
import SettingView from './SettingView';
import StatisticDiseaseDetail from './StatisticDiseaseDetail';
import LegendCard from './LegendCard';

export default {
  name: 'app',
  data() {
    this.theme = this.$ChartTheme;
    return {
      RankState: true,
    };
  },
  components: {
    Map,
    StatisticHeader,
    PageHeader,
    RankList,
    DetailCard,
    StatisticFacilityDetail,
    SettingView,
    StatisticDiseaseDetail,
    LegendCard,
  },
  mounted() {},
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
  },
  methods: {
    changeRankShow: function () {
      this.RankState = !this.RankState;
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
  width: 20%;
  margin: 0px 10px;
  bottom: 0px;
  top: 50%;
  height: 800px;
  margin-top: -345px;
  transition: all ease 0.2s;
}

.detail-content {
  width: 45%;
  bottom: 0px;
  position: absolute;
  top: 150px;
  left: 50%;
  margin-left: -20%;
  bottom: 45px;
  //   background: @primaryColor;
  transition: all ease 0.2s 0.2s;
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
