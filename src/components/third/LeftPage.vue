<template>
  <div class="filter-bg">
    <div class="pager-content-detail">
      <div class="all-data">
        <number-card></number-card>
        <div class="plan-statistic">
          <h3>本月养护计划</h3>
          <ul v-if="RoadArea.length > 0">
            <li v-for="(item, index) in RoadArea" :key="index" class="plan">
              <div class="plan-box">
                <div class="plan-num">{{ item.nums }}</div>
                <div class="plan-type">{{ item.type }}</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="plan-detail">
          <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="first">
              <div class="news-content">
                <list-item-card :listData="PlanData[0].roads"></list-item-card>
              </div>
            </div>
            <div role="tabpanel" class="tab-pane" id="second">
              <div class="news-content">
                <list-item-card :listData="PlanData[1].roads"></list-item-card>
              </div>
            </div>
            <div role="tabpanel" class="tab-pane" id="third">
              <div class="news-content"></div>
            </div>
            <div role="tabpanel" class="tab-pane" id="fourth">
              <div class="news-content"></div>
            </div>
          </div>
          <ul class="nav nav-pills nav-justified" role="tablist">
            <li role="presentation" class="active">
              <a
                href="#first"
                aria-controls="first"
                role="tab"
                data-toggle="tab"
                >一标段</a
              >
            </li>
            <li role="presentation">
              <a
                href="#second"
                aria-controls="second"
                role="tab"
                data-toggle="tab"
                >二标段</a
              >
            </li>
            <li role="presentation">
              <a
                href="#third"
                aria-controls="third"
                role="tab"
                data-toggle="tab"
                >三标段</a
              >
            </li>
            <li role="presentation">
              <a
                href="#fourth"
                aria-controls="fourth"
                role="tab"
                data-toggle="tab"
                >四标段</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NumberCard from '../NumberCard';
import ListItemCard from './ListItemCard';
export default {
  components: {
    NumberCard,
    ListItemCard,
  },
  name: 'SecondLeftPage',
  data() {
    return {
      allData: [],
      detailData: [],
      planDetailData: [],
    };
  },
  computed: {
    RoadCount() {
      return this.allData;
    },
    RoadDetailCount() {
      const array = this.allData.concat();
      array.shift();
      return array;
    },
    RoadArea() {
      return this.detailData;
    },
    PlanData() {
      return this.planDetailData;
    },
  },
  mounted() {
    this.getAllData();
    this.getDetailData();
    this.getPlanDetailData();
  },
  methods: {
    async getAllData() {
      const data = await this.$Http.Road_GetRoadCount();
      this.allData = data;
      console.log('Road_GetRoadCount', data);
    },
    async getPlanDetailData() {
      const data = await this.$Http.Road_GetRoadCountByMonthPlan();
      this.planDetailData = data;
      console.log('Road_GetRoadCountByMonthPlan', data);
    },
    async getDetailData() {
      const data = await this.$Http.Sewer_GetSewerFacilitiesByMonth();
      this.detailData = data;
      console.log('Sewer_GetSewerFacilitiesByMonth', data);
    },
  },
};
</script>
<style lang="less" scoped>
.all-data {
  color: #fff;
  h3 {
    color: #fff;
  }
}
.plan-statistic {
  border: 1px solid #333333;
  padding: 10px;
  .plan {
    list-style: none;
    position: relative;
    display: inline-block;
    .plan-box {
      text-align: center;
      width: 120px;
      height: 120px;
      border: 1px solid #eee;
      border-radius: 50%;
      margin: 10px;
      position: relative;
      .plan-num {
        font-size: 20px;
        font-weight: 700;
        line-height: 80px;
      }
      .plan-num:after {
        content: '';
        position: absolute;
        width: 80%;
        height: 1px;
        top: 62px;
        left: 12px;
        background-color: wheat;
      }
      .plan-type {
        margin-top: -10px;
      }
    }
  }
}
.plan-detail {
  border: 1px solid #333333;
}
.news-content {
  height: 400px;
}
.nav-pills > li.active > a,
.nav-pills > li.active > a:focus,
.nav-pills > li.active > a:hover {
  color: #fff;
  background-color: #337ab7;
}
.nav-pills > li > a {
  border-radius: 0px;
}
</style>
