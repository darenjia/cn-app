<template>
  <div class="filter-bg">
    <div class="pager-content-detail">
      <div class="box-with-border-image">
        <date-view :currentMode="2"></date-view>
        <a-spin :spinning="isDataLoading">
          <div class="facility-detail-header">
            <div class="header-content">
              <statistic-right-header
                :chartData="diseaseCountData"
                @showDetail="showDetail"
              ></statistic-right-header>
            </div>
          </div>
          <div style="height: 260px;">
            <disease-type-statistic
              :chartData="DiseaseChildData"
              :diseaseType="subTitle"
              :dateRange="dateRange"
            ></disease-type-statistic>
          </div>
        </a-spin>
      </div>

      <div class="box-with-border-image">
        <news-card></news-card>
      </div>
    </div>
    <legend-card :type="0"></legend-card>
  </div>
</template>
<script>
import DateView from '../DateView';
import DiseaseTypeStatistic from './DiseaseTypeStatistic';
import StatisticRightHeader from './StatisticRightHeader';
import NewsCard from './NewsCard';
import mixin from '../../plugins/mixins-today';
import listener from '../../plugins/mixins-listener';
import LegendCard from '../LegendCard';

export default {
  components: {
    DiseaseTypeStatistic,
    StatisticRightHeader,
    NewsCard,
    DateView,
    LegendCard,
  },
  mixins: [mixin, listener],
  data() {
    return {
      subTitle: '',
      title: '病害数量总览',
      diseaseCountData: [],
      DiseaseChildData: [],
      isDataLoading: true,
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
      this.isDataLoading = true;
      const data = await this.$Http.getDiseaseWithRepair({
        params: this.dateRange,
      });
      this.diseaseCountData = data;
      this.isDataLoading = false;
    },
    showDetail(type) {
      this.subTitle = type;
    },
    updateData() {
      console.log('refreshData');
      this.getDiseaseType();
    },
  },
  mounted: function () {
    // this.changeDateRange();
    // this.getDiseaseType();
  },
};
</script>
<style lang="less" scoped>
.pager-content-detail {
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
