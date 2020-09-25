<template>
  <div class="filter-bg">
    <div class="page-content-detail">
      <div class="road-news">
        <date-view :currentMode="1"></date-view>
        <div class="road-news-list">
          <!-- Nav tabs -->
          <ul class="nav nav-pills nav-justified" role="tablist">
            <li role="presentation" class="active">
              <a href="#home" aria-controls="home" role="tab" data-toggle="tab"
                >设施巡视</a
              >
            </li>
            <li role="presentation">
              <a
                href="#profile"
                aria-controls="profile"
                role="tab"
                data-toggle="tab"
                >网格热线</a
              >
            </li>
          </ul>

          <!-- Tab panes -->
          <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="home">
              <div class="news-content">
                <list-card :listData="DiseaseInspectDataList" :type="0">
                </list-card>
              </div>
            </div>
            <div role="tabpanel" class="tab-pane" id="profile">
              <div class="news-content">
                <list-card :listData="DiseaseGridDataList" :type="1">
                </list-card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h4 class="plan-title">年度养护计划</h4>
        <plan-bar :chartData="PlanDataList"></plan-bar>
      </div>
    </div>
  </div>
</template>
<script>
import DateView from '../DateView';
import ListCard from './RightListItemCard';
import mixin from '../../plugins/mixins-today';
import PlanBar from './ChartBar';

export default {
  name: 'SecondLeftPage',
  mixins: [mixin],
  components: {
    DateView,
    ListCard,
    PlanBar,
  },
  data() {
    return {
      DiseaseInspectData: [],
      DiseaseGridData: [],
      PlanData: [],
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
  },
  methods: {
    async getDiseaseInspectData() {
      console.log(this.dateRange);
      const data = await this.$Http.Road_GetRoadFacilitiesInspect({
        params: this.dateRange,
      });
      console.log('Road_GetRoadFacilitiesInspect', data, this.dateRange);
      this.DiseaseInspectData = data;
    },
    async getDiseaseGridData() {
      const data = await this.$Http.Road_GetRoadFacilitiesGrid({
        params: this.dateRange,
      });
      console.log('Road_GetRoadFacilitiesGrid', data, this.dateRange);
      this.DiseaseGridData = data;
    },
    async getRoadPlanSchedule() {
      const data = await this.$Http.Road_GetRoadPlanSchedule();
      console.log('Road_GetRoadPlanSchedule', data);
      this.PlanData = data;
    },
    updateData() {
      this.getDiseaseInspectData();
      this.getDiseaseGridData();
      this.getRoadPlanSchedule();
    },
    click(item) {},
    over() {},
    leave() {},
  },
  mounted() {
    // this.updateData();
  },
};
</script>
<style lang="less" scoped>
.news-content {
  height: 360px;
}
.plan-title {
  color: #fff;
}
.road-news {
  padding: 4px 0px;
  .road-news-list {
    margin-top: 10px;
  }
}
.tab-content {
  margin-top: 20px;
}
.nav-pills > li.active > a:after {
  content: '';
  position: absolute;
  top: 40px;
  left: 50%;
  margin-left: -5px;
  border: 10px solid transparent;
  border-top-color: #6676ff;
}
</style>
