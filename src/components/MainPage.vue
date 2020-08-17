<template>
  <div>
    <div>
      <div class="content-main">
        <Map></Map>
        <!-- <div class="map-container"></div> -->
        <div
          :class="[
            IsHideRank ? 'statistic1-hide' : '',
            'statistic1',
            'boxall',
            'statistic-box',
          ]"
        >
          <div class="filter-bg">
            <!-- <statistic-table-four :theme="theme"></statistic-table-four> -->
            <!-- <statistic-table-two :theme="theme"></statistic-table-two> -->
            <mini-statistic-line
              :title="'人员出勤统计图'"
            ></mini-statistic-line>
            <mini-statistic-smooth
              :title="'人员出勤统计图'"
            ></mini-statistic-smooth>
          </div>
          <div class="boxfoot"></div>
        </div>
        <div
          :class="[
            IsHideRank ? 'statistic1-hide' : '',
            'statistic2',
            'boxall',
            'statistic-box',
          ]"
        >
          <div class="filter-bg">
            <!-- <statistic-table-one :theme="theme"></statistic-table-one> -->
            <!-- <statistic-table-three :theme="theme"></statistic-table-three> -->
            <!-- <mini-statistic-pie :title="'设施统计图'"></mini-statistic-pie> -->
            <mini-statistic-bar :title="'事故统计图'"></mini-statistic-bar>
            <mini-statistic-line2 :title="'设施统计图'"></mini-statistic-line2>
          </div>
          <div class="boxfoot"></div>
        </div>
        <div
          :class="[
            IsHideRank ? 'statistic3-hide' : '',
            'statistic3',
            'boxall',
            'statistic-box',
          ]"
        >
          <div class="filter-bg">
            <rank-list :title="'病害标段排行'" :type="'facility'"></rank-list>
            <!-- <statistic-table-four></statistic-table-four> -->
            <rank-list :title="'考核分数排行'" :type="'disease'"></rank-list>
          </div>
          <!-- <statistic-table-two></statistic-table-two> -->
          <div class="boxfoot"></div>
        </div>
        <div
          :class="[
            IsHideRank ? 'statistic3-hide' : '',
            'statistic4',
            'boxall',
            'statistic-box',
          ]"
        >
          <div class="filter-bg">
            <rank-list :title="'病害类型排行'" :type="'road'"></rank-list>
            <rank-list :title="'病害道路排行'" :type="'disease'"></rank-list>
          </div>
          <div class="boxfoot"></div>
        </div>
        <div
          :class="['detail-content', 'boxall', { 'show-detail': !IsHideRank }]"
        >
          <detail-card />
          <div class="boxfoot"></div>
        </div>
        <div class="setting"><setting-view /></div>
      </div>
    </div>
    <div class="header">
      <page-header></page-header>
      <statistic-header></statistic-header>
    </div>
  </div>
</template>
<script>
import Map from './Map.vue';
import StatisticHeader from './StatisticHeader';
import PageHeader from './PageHeader';
import RankList from './RankingList';
import DetailCard from './DetailCard';
import StatisticTableOne from './StatisticTableOne';
import StatisticTableTwo from './StatisticTableTwo';
import StatisticTableThree from './StatisticTableThree';
import StatisticTableFour from './StatisticTableFour';
import MiniStatisticBar from './MiniStatisticBar';
import MiniStatisticPie from './MiniStatisticPie';
import MiniStatisticSmooth from './MiniStatisticSmooth';
import MiniStatisticLine from './MiniStatisticLine';
import MiniStatisticLine2 from './MiniStatisticLine2';
import SettingView from './SettingView';

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
    // eslint-disable-next-line vue/no-unused-components
    StatisticTableOne,
    // eslint-disable-next-line vue/no-unused-components
    StatisticTableTwo,
    // eslint-disable-next-line vue/no-unused-components
    StatisticTableThree,
    // eslint-disable-next-line vue/no-unused-components
    StatisticTableFour,
    StatisticHeader,
    PageHeader,
    RankList,
    DetailCard,
    MiniStatisticBar,
    // eslint-disable-next-line vue/no-unused-components
    MiniStatisticPie,
    MiniStatisticSmooth,
    MiniStatisticLine,
    // eslint-disable-next-line vue/no-unused-components
    MiniStatisticLine2,
    SettingView,
  },
  mounted() {},
  computed: {
    IsHideRank: function () {
      return !this.$store.state.showRankList;
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
.map-bg {
  width: 100%;
  float: left;
  top: 0px;
  position: absolute;
}
.statistic1 {
  bottom: 0px;
  left: 0px;
  transition: all ease 0.2s;
}
.statistic2 {
  bottom: 0px;
  left: 21%;
  transition: all ease 0.2s;
}
.statistic3 {
  bottom: 0px;
  right: 0px;
  transition: all ease 0.2s;
}
.statistic4 {
  bottom: 0px;
  right: 21%;
  transition: all ease 0.2s;
}
.statistic-box {
  position: absolute;
  width: 20%;
  height: 70%;
  margin: 10px;
}

.detail-content {
  width: 25%;
  bottom: 0px;
  position: absolute;
  top: 85px;
  right: 10px;
  bottom: 10px;
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
.show-detail {
  display: none;
}

.header {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
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
  // position: relative;
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
</style>
