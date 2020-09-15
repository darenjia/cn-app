<template>
  <div class="facility-detail">
    <div class="facility-detail-header">
      <div class="header-title"></div>
      <div class="header-content">
        <statistic-right-header
          :chartData="diseaseCountData"
        ></statistic-right-header>
      </div>
    </div>
    <div style="height: 300px;">
      <disease-statistic-cloud
        :chartData="DiseaseChildData"
        :diseaseType="subTitle"
      ></disease-statistic-cloud>
    </div>
    <div>
      <news-card></news-card>
    </div>
  </div>
</template>
<script>
import DiseaseStatisticCloud from './charts/DiseaseStatisticCloud';
import StatisticRightHeader from './charts/StatisticRightHeader';
import NewsCard from './NewsCard';

export default {
  components: {
    DiseaseStatisticCloud,
    StatisticRightHeader,
    NewsCard,
  },
  data() {
    return {
      subTitle: '',
      title: '病害数量总览',
      diseaseCountData: [],
      DiseaseChildData: [],
    };
  },
  computed: {
    diseaseCount: function () {
      return this.diseaseCountData;
    },
    subTitleString() {
      return this.subTitle + '病害详情';
    },
  },
  methods: {
    async getDiseaseType() {
      const data = await this.$Http.getDiseaseWithRepair();
      this.diseaseCountData = data;
    },
    showDetail(type) {
      this.subTitle = type;
    },
  },
  mounted: function () {
    this.getDiseaseType();
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
          border-radius: 50%;
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
        width: 50%;
        height: 80px;
        top: 50%;
        left: 50%;
        margin-top: -40px;
        margin-left: -25%;
        text-align: center;
      }
    }
  }
}
.header-title {
  text-align: center;
  line-height: 40px;
  color: #fff;
  font-size: 20px;
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
