<template>
  <div class="filter-bg">
    <div class="page-content-detail">
      <div class="all-data">
        <div class="box-with-border-image">
          <number-card></number-card>
        </div>
        <div class="box-with-border-image">
          <div class="plan-statistic">
            <h3 class="title-with-bg">网格案件汇总</h3>
            <ul v-if="RoadCount.length > 0">
              <li
                v-for="(item, index) in RoadCount"
                :key="index"
                :class="[
                  'plan',
                  {
                    'plan-card1': index === 0,
                    'plan-card2': index === 1,
                    'plan-card3': index === 2,
                    'plan-card4': index === 3,
                    'plan-card5': index === 4,
                    'plan-card6': index === 5,
                  },
                ]"
              >
                <div class="plan-box">
                  <div class="plan-num-box">
                    <div
                      :class="[
                        'plan-type-image',
                        {
                          img1: index === 0,
                          img2: index === 1,
                          img3: index === 2,
                          img4: index === 3,
                          img5: index === 4,
                          img6: index === 5,
                        },
                      ]"
                    ></div>
                    <div class="plan-num">{{ item.nums }}</div>
                    <div class="plan-type">{{ item.type }}</div>
                  </div>
                </div>
              </li>
              <div class="center-bg"></div>
            </ul>
          </div>
          <div class="grid-chart">
            <chart-bar :chartData="RoadCount"></chart-bar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NumberCard from '../NumberCard';
import ChartBar from './ChartBar';
export default {
  components: {
    NumberCard,
    ChartBar,
  },
  name: 'FourthLeftPage',
  data() {
    return {
      allData: [],
      colors: ['#7d6dfd', '#ff8a03', '#53c868', '#fe6361'],
    };
  },
  computed: {
    RoadCount() {
      return this.allData;
    },
    currentActive() {
      return this.active;
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
  },
  methods: {
    async getAllData() {
      const data = await this.$Http.Grid_GetGridCount();
      this.allData = data;
      console.log('Grid_GetGridCount', data);
    },
    async getPlanDetailData() {
      const data = await this.$Http.Road_GetRoadCountByMonthPlan();
      this.planDetailData = data;
      console.log('Road_GetRoadCountByMonthPlan', data);
    },
    async getDetailData() {
      const data = await this.$Http.Road_GetAreaByMonthPlan();
      this.detailData = data;
      console.log('Road_GetRoadByMonthPlan', data);
    },
    clickTab(index) {
      this.active = index;
    },
  },
};
</script>
<style lang="less" scoped>
.all-data {
  color: #fff;
}
.center-bg {
  width: 200px;
  height: 200px;
  position: absolute;
  top: 108px;
  left: 92px;
  background-image: url('../../assets/img/gird_center_bg.png');
  background-size: 100% 100%;
  animation: rotate 60s linear infinite;
}
.plan-statistic {
  // min-height: 299px;
  .title-with-bg::after {
    margin-left: 46px;
  }
  .title-with-bg::before {
    margin-left: -144px;
  }
  ul {
    padding-inline-start: 0px;
    padding: 20px 0px;
    margin-bottom: 48px;
  }
  .plan-card1 {
    top: 0px;
    left: 50px;
  }
  .plan-card2 {
    top: 0px;
    left: 72px;
  }
  .plan-card3 {
    top: 105px;
    left: 0px;
  }
  .plan-card4 {
    top: -8px;
    left: 0px;
  }
  .plan-card5 {
    top: 96px;
    left: -65px;
  }
  .plan-card6 {
    top: 96px;
    left: -44px;
  }
  .plan {
    list-style: none;
    position: relative;
    display: inline-block;
    width: 33%;

    .plan-box {
      text-align: center;
      height: 85px;
      // background: url('../../assets/img/second_statistic_bg.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      margin: 10px;
      position: relative;
      .plan_divider::after {
        position: absolute;
        content: '';
        top: -34px;
        right: -10px;
        height: 100%;
        width: 1px;
        border: 1px solid transparent;
        border-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0),
            rgba(12, 194, 224, 0.1),
            #0cc2e0,
            rgba(12, 194, 224, 0.1),
            rgba(0, 0, 0, 0)
          )
          1 10;
      }
      .plan-num-box {
        position: absolute;
        top: -25px;
        left: 0px;
        width: 100%;
        .plan-type-image {
          background-size: 100% 100%;
          height: 35px;
          margin: 30px;
        }
        .img1 {
          background-image: url('../../assets/img/grid_sort_type1.png');
        }
        .img2 {
          background-image: url('../../assets/img/grid_sort_type2.png');
        }
        .img3 {
          background-image: url('../../assets/img/grid_sort_type3.png');
        }
        .img4 {
          background-image: url('../../assets/img/grid_sort_type5.png');
        }
        .img5 {
          background-image: url('../../assets/img/grid_sort_type6.png');
        }
        .img6 {
          background-image: url('../../assets/img/grid_sort_type4.png');
        }
        .plan-num {
          font-size: 15px;
          font-weight: 600;
          line-height: 40px;
          color: #e2e2e2;
          position: absolute;
          top: 60px;
          width: 100px;
          text-align: center;
          left: 0px;
        }
        .plan-type {
          font-size: 12px;
          color: #d2c8c8;
          position: absolute;
          width: 100px;
          text-align: center;
          top: 12px;
          left: 0px;
        }
      }
    }
  }
}
.grid-chart {
  height: 250px;
  width: 100%;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
