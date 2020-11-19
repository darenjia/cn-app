<template>
  <div class="filter-bg">
    <div class="page-content-detail">
      <div class="box-with-border-image">
        <date-view :currentMode="1"></date-view>
        <a-spin :spinning="DataLoading">
          <div class="road-news-list">
            <!-- Nav tabs -->
            <ul class="nav">
              <li @click="tabClick(0)">
                <!-- <span class="sort-type sort-type-active sort-type1"></span> -->
                <span
                  :class="['sort-text', { 'sort-active': currentActive === 0 }]"
                  >设施巡视</span
                >
              </li>
              <li @click="tabClick(1)">
                <span
                  :class="['sort-text', { 'sort-active': currentActive === 1 }]"
                  >网格热线</span
                >
              </li>
            </ul>
            <!-- Tab panes -->
            <div class="tab-content">
              <div :class="['tab-pane', { active: currentActive === 0 }]">
                <div class="news-content">
                  <list-card
                    :listData="DiseaseInspectDataList"
                    :type="0"
                    ref="child0"
                    @clickItem="clickItem"
                  >
                  </list-card>
                </div>
              </div>
              <div :class="['tab-pane', { active: currentActive === 1 }]">
                <div class="news-content">
                  <list-card
                    :listData="DiseaseGridDataList"
                    :type="1"
                    ref="child1"
                    @clickItem="clickItem"
                  >
                  </list-card>
                </div>
              </div>
            </div>
          </div>
        </a-spin>
      </div>
      <div class="box-with-border-image">
        <h3 class="title-with-bg">
          <a href="javascript:;" class="title-text" @click="showAllYearPlan"
            >年度养护计划</a
          >
        </h3>
        <plan-bar :chartData="PlanDataList"></plan-bar>
      </div>
    </div>
    <legend-card :type="1"></legend-card>
  </div>
</template>
<script>
import DateView from '../DateView';
import ListCard from './RightListItemCard';
import mixin from '../../plugins/mixins-today';
import PlanBar from './ChartBar';
import Listener from '../../plugins/mixins-listener';
import LegendCard from '../LegendCard';

export default {
  name: 'SecondLeftPage',
  mixins: [mixin, Listener],
  components: {
    DateView,
    ListCard,
    PlanBar,
    LegendCard,
  },
  data() {
    return {
      DiseaseInspectData: [],
      DiseaseGridData: [],
      PlanData: [],
      active: 0,
      GridDataLoading: false,
      InspectDataLoading: false,
    };
  },
  computed: {
    DiseaseInspectDataList() {
      return this.DiseaseInspectData;
    },
    DiseaseGridDataList() {
      return this.DiseaseGridData;
    },
    PlanDataList() {
      return this.PlanData;
    },
    currentActive() {
      return this.active;
    },
    DataLoading() {
      return this.InspectDataLoading && this.GridDataLoading;
      // return true;
    },
  },
  methods: {
    async getDiseaseInspectData() {
      this.InspectDataLoading = true;
      console.log(this.dateRange);
      const data = await this.$Http.Road_GetRoadFacilitiesInspect({
        params: this.dateRange,
      });
      console.log('Road_GetRoadFacilitiesInspect', data, this.dateRange);
      this.DiseaseInspectData = data;
      this.InspectDataLoading = false;
    },
    async getDiseaseGridData() {
      this.GridDataLoading = true;
      const data = await this.$Http.Road_GetRoadFacilitiesGrid({
        params: this.dateRange,
      });
      console.log('Road_GetRoadFacilitiesGrid', data, this.dateRange);
      this.DiseaseGridData = data;
      this.GridDataLoading = false;
    },
    async getRoadPlanSchedule() {
      const data = await this.$Http.Road_GetRoadPlanSchedule();
      console.log('Road_GetRoadPlanSchedule', data);
      this.PlanData = data;
    },
    updateData() {
      console.log('refresh data Road.');
      this.getDiseaseInspectData();
      this.getDiseaseGridData();
      this.getRoadPlanSchedule();
    },
    startScroll() {
      this.$refs.child0.stopInterval();
      this.$refs.child1.stopInterval();
      if (this.active === 0) {
        this.$refs.child0.startInterval();
      } else {
        this.$refs.child1.startInterval();
      }
    },
    clickItem(item) {
      this.$store.commit('changeDiseaseDetail', item);
    },
    tabClick(i) {
      this.active = i;
      this.startScroll();
    },
    showAllYearPlan() {
      this.$store.commit('changeRoadPlanMonth', '0');
    },
  },
  mounted() {
    // this.updateData();
    setTimeout(() => {
      this.startScroll();
    }, 3000);
  },
};
</script>
<style lang="less" scoped>
.news-content {
  height: 346px;
}
.title-with-bg::after {
  margin-left: 46px;
}
.title-with-bg::before {
  margin-left: -144px;
}
.road-news {
  padding: 4px 0px;
  .road-news-list {
    margin-top: 10px;
  }
}

.tab-pane {
  display: none;
}
.active {
  display: block;
}
.nav {
  padding-inline-start: 0px;
  width: 100%;
  li {
    list-style: none;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    position: relative;
    width: 50%;
    padding: 0px 20px;
    margin-top: 8px;
    span {
      color: #fff;
      display: block;
      width: 100%;
      font-size: 16px;
      text-align: center;
      cursor: pointer;
    }
    .sort-type {
      bottom: 0px;
      height: 1px;
      left: 0px;
      z-index: -1;
      transition: all 0.3s;
    }
    .sort-type-active {
      height: 40px;
    }
    .sort-active {
      background-image: url('../../assets/img/tab_active_bg.png');
      background-size: 100% 100%;
    }
    .sort-text {
      position: absolute;
      top: 0px;
      left: 0px;
    }
  }
}

.sort-type1 {
  background: linear-gradient(
    to top,
    rgba(72, 227, 247, 1),
    rgba(72, 227, 247, 0.1),
    rgba(72, 227, 247, 0),
    rgba(72, 227, 247, 0)
  );
}

.title-with-bg {
  z-index: 999;
}
.title-text {
  color: #d6a20d;
  cursor: pointer;
}
</style>
