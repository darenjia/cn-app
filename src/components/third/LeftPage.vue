<template>
  <div class="filter-bg">
    <div class="page-content-detail">
      <div class="all-data">
        <div class="box-with-border-image">
          <number-card></number-card>
        </div>
        <div class="box-with-border-image">
          <div class="plan-statistic">
            <h3 class="title-with-bg">本月养护计划</h3>
            <ul v-if="RoadArea.length > 0">
              <li v-for="(item, index) in RoadArea" :key="index" class="plan">
                <div class="plan-box">
                  <div :class="[{ plan_divider: index !== 3 }]"></div>
                  <div class="plan-num-box">
                    <div
                      :class="[
                        'plan-type-image',
                        {
                          img1: index === 0,
                          img2: index === 1,
                          img3: index === 2,
                          img4: index === 3,
                        },
                      ]"
                    ></div>
                    <div class="plan-num">{{ item.nums + item.fq }}</div>
                    <div class="plan-type">{{ item.type }}</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="plan-detail">
            <div class="tab-content" v-if="PlanData">
              <div
                :class="['tab-pane', { active: currentActive === index }]"
                v-for="(item, index) in PlanData"
                :key="index"
              >
                <div class="news-content">
                  <div
                    class="content-stistic-box"
                    :style="{ borderBottomColor: colors[index] }"
                  >
                    <a-row>
                      <a-col :span="8"
                        ><div class="plan-top-text">道路名称</div></a-col
                      >
                      <a-col :span="8"
                        ><div class="plan-top-text">道路路段</div></a-col
                      >
                      <a-col :span="8"
                        ><div class="plan-top-text">完成状态</div></a-col
                      >
                    </a-row>
                  </div>
                  <list-item-card
                    :listData="item.roads"
                    ref="child"
                    @clickItem="clickItem"
                  ></list-item-card>
                </div>
              </div>
            </div>
            <ul class="nav my-nav">
              <li
                v-for="(item, index) in PlanData"
                :key="index"
                @click="clickTab(index)"
              >
                <div
                  :class="[
                    'sort-type',
                    {
                      'sort-type-active': currentActive === index,
                      'sort-type4': index === 3,
                      'sort-type3': index === 2,
                      'sort-type2': index === 1,
                      'sort-type1': index === 0,
                    },
                  ]"
                ></div>
                <span>{{ '0' + (index + 1) }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NumberCard from '../NumberCard';
import ListItemCard from '../second/ListItemCard';
export default {
  components: {
    NumberCard,
    ListItemCard,
  },
  name: 'ThirdLeftPage',
  data() {
    return {
      allData: [],
      detailData: [],
      planDetailData: [],
      colors: ['#7d6dfd', '#ff8a03', '#53c868', '#fe6361'],
      active: 0,
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
    this.getDetailData();
    this.getPlanDetailData();
    setTimeout(() => {
      this.startScroll();
    }, 3000);
  },
  methods: {
    async getAllData() {
      const data = await this.$Http.Road_GetRoadCount();
      this.allData = data;
      console.log('Road_GetRoadCount', data);
    },
    async getPlanDetailData() {
      const data = await this.$Http.Sewer_GetSewerRoadByMonth();
      this.planDetailData = data;
      console.log('Sewer_GetSewerRoadByMonth', data);
    },
    async getDetailData() {
      const data = await this.$Http.Sewer_GetSewerFacilitiesByMonth();
      this.detailData = data;
      console.log('Sewer_GetSewerFacilitiesByMonth', data);
    },
    clickTab(index) {
      this.active = index;
      this.startScroll();
    },
    startScroll() {
      for (let index = 0; index < this.PlanData.length; index++) {
        this.$refs.child[index].stopInterval();
      }
      this.$refs.child[this.active].startInterval();
    },
    clickItem(item) {
      this.$store.commit('changeSewerPlanData', item);
    },
  },
};
</script>
<style lang="less" scoped>
@font-face {
  font-family: 'HY';
  src: url('../../assets/font/HY.TTF');
}
.all-data {
  color: #fff;
}
.plan-statistic {
  min-height: 219px;
  .title-with-bg::after {
    margin-left: 46px;
  }
  .title-with-bg::before {
    margin-left: -144px;
  }
  ul {
    padding-inline-start: 0px;
  }
  .plan {
    list-style: none;
    position: relative;
    display: inline-block;
    width: 25%;
    top: -10px;
    margin-top: 50px;
    margin-bottom: 20px;
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
          margin: 18px;
        }
        .img1 {
          background-image: url('../../assets/img/sewer_type1.png');
        }
        .img2 {
          background-image: url('../../assets/img/sewer_type2.png');
        }
        .img3 {
          background-image: url('../../assets/img/sewer_type3.png');
        }
        .img4 {
          background-image: url('../../assets/img/sewer_type4.png');
        }
        .plan-num {
          font-size: 15px;
          font-weight: 600;
          line-height: 40px;
          margin-top: -12px;
          color: #e2e2e2;
        }
        .plan-type {
          margin-top: -10px;
          font-size: 12px;
          color: #d2c8c8;
          position: absolute;
          top: 0px;
          left: 18px;
        }
      }
    }
  }
}
.plan-detail {
  position: relative;
  height: 100%;
  top: -40px;
  left: 0px;
  .tab-content {
    height: 350px;
    overflow: hidden;
  }

  .tab-pane {
    display: none;
  }
  .active {
    display: block;
  }
  .nav {
    padding-inline-start: 0px;
    li {
      list-style: none;
      display: inline-block;
      height: 40px;
      line-height: 40px;
      position: relative;
      width: 25%;
      span {
        color: #fff;
        display: block;
        width: 100%;
        font-size: 16px;
        font-family: 'HY';
        text-align: center;
        cursor: pointer;
      }
    }
  }
}
.news-content {
  height: 320px;
  padding-bottom: 8px;
  .content-stistic-box {
    border: 1px solid transparent;
    border-image: linear-gradient(
        to right,
        rgba(0, 0, 0, 0),
        rgba(12, 194, 224, 0.2),
        #0cc2e0,
        rgba(12, 194, 224, 0.2),
        rgba(0, 0, 0, 0)
      )
      1 10;
    .plan-top-text {
      text-align: center;
      line-height: 36px;
    }
  }
}
.my-nav {
  position: absolute;
  bottom: -52px;
  width: 100%;
}
.nav > li > a {
  padding: 4px 15px;
}
.sort-type {
  bottom: 0px;
  width: 100%;
  height: 1px;
  left: 0px;
  z-index: -1;
  transition: all 0.3s;
  position: absolute;
}
.sort-type-active {
  height: 40px;
}
.sort-type1 {
  background: linear-gradient(
    to top,
    rgba(125, 109, 253, 1),
    rgba(125, 109, 253, 0.1),
    rgba(125, 109, 253, 0),
    rgba(125, 109, 253, 0)
  );
}
.sort-type2 {
  background: linear-gradient(
    to top,
    rgba(209, 122, 23, 1),
    rgba(238, 138, 23, 0.1),
    rgba(238, 138, 23, 0),
    rgba(238, 138, 23, 0)
  );
}
.sort-type3 {
  background: linear-gradient(
    to top,
    rgba(83, 200, 104, 1),
    rgba(83, 200, 104, 0.1),
    rgba(83, 200, 104, 0),
    rgba(83, 200, 104, 0)
  );
}
.sort-type4 {
  background: linear-gradient(
    to top,
    rgba(254, 99, 97, 1),
    rgba(254, 99, 97, 0.1),
    rgba(254, 99, 97, 0),
    rgba(254, 99, 97, 0)
  );
}
</style>
