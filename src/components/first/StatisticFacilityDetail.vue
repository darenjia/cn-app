<template>
  <div class="filter-bg">
    <div class="pager-content-detail">
      <div class="facility-detail-header">
        <div class="header-content">
          <div class="header-number">
            <div class="type">
              <div
                :class="[
                  'type-bg',
                  'type-road',
                  { active: currentType === '道路' },
                ]"
                @click="showDetail(facilityCount[0].type)"
              >
                <div class="type-content">
                  <span>{{ facilityCount[0].type }}</span>
                  <span class="number">{{ facilityCount[0].nums }} ㎡</span>
                </div>
              </div>
            </div>
            <div class="type">
              <div
                :class="[
                  'type-bg',
                  'type-facility',
                  { active: currentType === '附属设施' },
                ]"
                @click="showDetail(facilityCount[1].type)"
              >
                <div class="type-content">
                  <span>{{ facilityCount[1].type }}</span>
                  <span class="number">{{ facilityCount[1].nums }} 个</span>
                </div>
              </div>
            </div>
            <div class="type">
              <div
                :class="[
                  'type-bg',
                  'type-sewer',
                  { active: currentType === '下水道' },
                ]"
                @click="showDetail(facilityCount[2].type)"
              >
                <div class="type-content">
                  <span>{{ facilityCount[2].type }}</span>
                  <span class="number">{{ facilityCount[2].nums }} 个</span>
                </div>
              </div>
            </div>
            <div class="type">
              <div
                :class="[
                  'type-bg',
                  'type-other',
                  { active: currentType === '其他' },
                ]"
                @click="showDetail(facilityCount[3].type)"
              >
                <div class="type-content">
                  <span>{{ facilityCount[3].type }}</span>
                  <span class="number">{{ facilityCount[3].nums }} 个</span>
                </div>
              </div>
            </div>
            <div class="outer-circle">
              <div class="inner-circle"></div>
              <span></span>
              <!-- <span></span>
            <span></span>
            <span></span> -->
            </div>
            <span class="center-title">设施分类</span>
          </div>
        </div>
      </div>
      <div style="height: 300px; margin-top: 20px;">
        <!-- <div class="sub-title">{{ subTitleString }}</div> -->
        <!-- <new-chart :chartData="facilityChildData"></new-chart> -->
        <facility-statistic-bar
          :chartData="facilityChildData"
          :section="subTitle"
        ></facility-statistic-bar>
      </div>
    </div>
  </div>
</template>
<script>
import FacilityStatisticBar from '../charts/FacilityStatisticBar';
export default {
  components: {
    FacilityStatisticBar,
  },
  data() {
    return {
      subTitle: '',
      title: '设施分类总览',
      facilityCountData: [
        { type: '道路', nums: 0 },
        { type: '附属设施', nums: 0 },
        { type: '下水道', nums: 0 },
        { type: '其他', nums: 0 },
      ],
      facilityChildData: [],
    };
  },
  computed: {
    facilityCount: function () {
      return this.facilityCountData;
    },
    subTitleString() {
      return this.subTitle + '设施详情';
    },
    currentType() {
      return this.subTitle;
    },
  },
  methods: {
    async getFacilitiesTypeCount() {
      const data = await this.$Http.getFacilitiesTypeCount();
      this.facilityCountData = data;
      this.subTitle = data[0].type;
      this.getFacilitiesDetailTypeCount(this.subTitle);
    },
    async getFacilitiesDetailTypeCount(typeStr) {
      const data = await this.$Http.getFacilitiesDetailTypeCount({
        params: {
          type: typeStr,
        },
      });
      this.facilityChildData = data;
    },
    showDetail(type) {
      this.subTitle = type;
      this.getFacilitiesDetailTypeCount(type);
      this.$store.commit('changeMapFacilityType', type);
    },
  },
  mounted: function () {
    this.getFacilitiesTypeCount();
  },
};
</script>
<style lang="less" scoped>
.pager-content-detail {
  .header-content {
    font-size: 18px;
    font-weight: 700;
    color: #ddd;
    .header-number {
      position: relative;
      width: 100%;
      .type {
        display: inline-block;
        width: 50%;
        height: 80px;
        line-height: 80px;
        padding: 4px;
        .type-bg {
          text-align: center;
          background: #1154562b;
          border: 1px solid #19676a;
          border-radius: 5px;
          width: 100%;
          height: 100%;
          .type-content {
            position: relative;
            top: 14px;
            span {
              display: block;
              width: 100%;
              line-height: 1.2em;
            }
            .number {
              font-size: 18px;
            }
          }
        }
        .active {
          // background: #21868a93;
          color: #00faff;
          border-color: #00faff;
        }
      }
      .type-bg:hover {
        border-color: #04f9fe;
      }
      .center-title {
        font-size: 16px;
        position: absolute;
        width: 46px;
        height: 46px;
        top: 50%;
        left: 50%;
        margin-top: -24px;
        margin-left: -24px;
        text-align: center;
      }
    }
  }
}
.outer-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -40px;
  margin-left: -40px;
  height: 80px;
  width: 80px;
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
  // background-image: linear-gradient(135deg, #ffcf71 10%, #2376dd 100%);
  border-radius: 50%;
  animation: rotate 4s linear infinite;
  .inner-circle {
    height: 70px;
    width: 70px;
    position: absolute;
    background: #2b2b2b;
    top: 5px;
    left: 5px;
    border-radius: 50%;
    z-index: 9;
    .span {
      position: absolute;
      height: 80px;
      width: 80px;
      background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
      // background-image: linear-gradient(135deg, #ffcf71 10%, #2376dd 100%);
      filter: blur(10px);
      border-radius: 50%;
    }
    span:nth-child(1) {
      filter: blur(5px);
    }

    span:nth-child(2) {
      filter: blur(10px);
    }

    span:nth-child(3) {
      filter: blur(25px);
    }

    span:nth-child(4) {
      filter: blur(150px);
    }
  }
}
.sub-title {
  color: #fff;
  width: 100%;
  line-height: 50px;
  text-align: center;
}

@keyframes rotate {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}
</style>
