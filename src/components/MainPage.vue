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
          <!-- <statistic-table-one></statistic-table-one> -->
          <rank-list :title="'病害类型排行'" :list="rankList"></rank-list>
          <!-- <statistic-table-three></statistic-table-three> -->
          <rank-list :title="'病害道路排行'" :list="rankList"></rank-list>
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
          <div class="bg">
              <rank-list :title="'病害标段排行'" :list="rankList"></rank-list>
              <!-- <statistic-table-four></statistic-table-four> -->
              <rank-list :title="'考核分数排行'" :list="rankList"></rank-list>
          </div>
          <!-- <statistic-table-two></statistic-table-two> -->
          <div class="boxfoot"></div>
        </div>
        <div
          :class="['detail-content', 'boxall', { 'show-detail': !IsHideRank }]"
        >
          <detail-card />
          <div class="boxfoot"></div>
        </div>
      </div>
    </div>
    <div class="header">
      <page-header></page-header>
      <statistic-header></statistic-header>
    </div>
  </div>
</template>
<script>
import Map from "./Map.vue";
// import StatisticTableOne from "./components/StatisticTableOne";
// import StatisticTableTwo from "./components/StatisticTableTwo";
// import StatisticTableThree from "./components/StatisticTableThree";
// import StatisticTableFour from "./components/StatisticTableFour";
import StatisticHeader from "./StatisticHeader";
import PageHeader from "./PageHeader";
import RankList from "./RankingList";
import DetailCard from "./DetailCard";

export default {
  name: "app",
  data() {
    return {
      rankList: [
        { name: 1, total: 50 },
        { name: 2, total: 48 },
        { name: 3, total: 40 },
      ],
      RankState: true,
    };
  },
  components: {
    Map,
    // StatisticTableOne,
    // StatisticTableTwo,
    // StatisticTableThree,
    // StatisticTableFour,
    StatisticHeader,
    PageHeader,
    RankList,
    DetailCard,
  },
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
@primaryColor: #06095d;
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
  bottom: 10px;
  left: 0px;
  transition: all ease 0.2s;
}
.statistic3 {
  bottom: 0px;
  right: 0px;
  transition: all ease 0.2s;
}
.statistic4 {
  bottom: 10px;
  right: 0px;
  transition: all ease 0.2s;
}
.statistic-box {
  position: absolute;
  width: 25%;
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
  border: 1px solid rgba(25, 186, 139, 0.17);
  background: rgba(255, 255, 255, 0.04) url("../assets/img/line.png");
  background-size: 100% auto;
  margin-bottom: 0.15rem;
}
.boxall:before,
.boxall:after {
  position: absolute;
  width: 1.1rem;
  height: 1.1rem;
  content: "";
  border-top: 2px solid #02a6b5;
  top: 0;
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
  content: "";
  border-bottom: 2px solid #02a6b5;
  bottom: 0;
}
.show-detail {
  display: none;
}
// .bg:after {
//   content: "";
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: #808080;
//   filter: blur(20px);
//   z-index: 2;
// }
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
</style>
