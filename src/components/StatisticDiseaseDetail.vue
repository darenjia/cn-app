<template>
  <div class="facility-detail">
    <div class="facility-detail-header">
      <div class="header-content">
        <div class="header-number">
          <div class="type">
            <div
              class="type-bg type-road"
              @click="showDetail(facilityCount[0].type)"
            >
              <div class="type-content">
                <span>{{ facilityCount[0].type }}</span>
                <span>{{ facilityCount[0].nums }}</span>
              </div>
            </div>
          </div>
          <div class="type">
            <div
              class="type-bg type-facility"
              @click="showDetail(facilityCount[1].type)"
            >
              <div class="type-content">
                <span>{{ facilityCount[1].type }}</span>
                <span>{{ facilityCount[1].nums }}</span>
              </div>
            </div>
          </div>
          <div class="type">
            <div
              class="type-bg type-sewer"
              @click="showDetail(facilityCount[2].type)"
            >
              <div class="type-content">
                <span>{{ facilityCount[2].type }}</span>
                <span>{{ facilityCount[2].nums }}</span>
              </div>
            </div>
          </div>
          <div class="type">
            <div
              class="type-bg type-other"
              @click="showDetail(facilityCount[3].type)"
            >
              <div class="type-content">
                <span>{{ facilityCount[3].type }}</span>
                <span>{{ facilityCount[3].nums }}</span>
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
    <div class="chart" style="height: 360px;">
      <div class="sub-title">{{ subTitleString }}</div>
      <!-- <new-chart :chartData="facilityChildData"></new-chart> -->
      <facility-statistic-bar
        :chartData="facilityChildData"
        :section="subTitle"
      ></facility-statistic-bar>
    </div>
  </div>
</template>
<script>
import FacilityStatisticBar from './charts/FacilityStatisticBar';
export default {
  components: {
    FacilityStatisticBar,
  },
  data() {
    return {
      subTitle: '',
      title: '设施分类总览',
      facilityTypeData: [
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
  },
  methods: {
    async getDiseaseType() {
      const data = await this.$Http.getDiseaseType();
      this.facilityTypeData = data;
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
    },
  },
  mounted: function () {
    this.getFacilitiesTypeCount();
  },
};
</script>
<style lang="less" scoped>
.facility-detail {
  width: 100%;
  height: 100%;
  padding: 10px;
  .header-content {
    font-size: 16px;
    color: white;
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
          background: #11545685;
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
          }
        }
      }
      .type-bg:hover {
        border-color: #04f9fe;
      }
      .type-other {
      }
      .type-sewer {
      }
      .type-facility {
      }
      .type-road {
      }
      .center-title {
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
  background: linear-gradient(#14ffe9, #ffeb3b, #ff00e0);
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
      background: linear-gradient(#14ffe9, #ffeb3b, #ff00e0);
      filter: blur(5px);
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
