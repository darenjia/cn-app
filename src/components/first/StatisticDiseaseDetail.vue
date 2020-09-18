<template>
  <div class="filter-bg">
    <div class="pager-content-detail">
      <date-view @dateRangeChanged="dateChange"></date-view>
      <div class="facility-detail-header">
        <div class="header-content">
          <statistic-right-header
            :chartData="diseaseCountData"
          ></statistic-right-header>
        </div>
      </div>
      <div style="height: 270px;">
        <disease-type-statistic
          :chartData="DiseaseChildData"
          :diseaseType="subTitle"
          :dateRange="dateRange"
        ></disease-type-statistic>
      </div>
      <div>
        <news-card></news-card>
      </div>
    </div>
  </div>
</template>
<script>
import DateView from '../DateView';
import DiseaseTypeStatistic from './DiseaseTypeStatistic';
import StatisticRightHeader from './StatisticRightHeader';
import NewsCard from './NewsCard';
import mixin from '../../plugins/mixins-today';
import listener from '../../plugins/mixins-listener';

export default {
  components: {
    DiseaseTypeStatistic,
    StatisticRightHeader,
    NewsCard,
    DateView,
  },
  mixins: [mixin, listener],
  data() {
    const today = this.getTodayDate();
    const date = {
      startTime: today,
      endTime: today,
    };
    return {
      subTitle: '',
      title: '病害数量总览',
      diseaseCountData: [],
      DiseaseChildData: [],
      date: date,
    };
  },
  computed: {
    diseaseCount: function () {
      return this.diseaseCountData;
    },
    subTitleString() {
      return this.subTitle + '病害详情';
    },
    dateRange() {
      return this.date;
    },
  },
  watch: {
    dateRange(newValue) {
      this.changeDateRange();
      this.getDiseaseType();
    },
  },
  methods: {
    async getDiseaseType() {
      const data = await this.$Http.getDiseaseWithRepair({
        params: this.dateRange,
      });
      this.diseaseCountData = data;
    },
    showDetail(type) {
      this.subTitle = type;
    },
    dateChange(date) {
      this.date = date;
    },
    changeDateRange() {
      this.$store.commit('changeDateRange', this.date);
    },
    updateData() {
      console.log('refreshData');
      this.getDiseaseType();
    },
  },
  mounted: function () {
    this.changeDateRange();
    this.getDiseaseType();
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
