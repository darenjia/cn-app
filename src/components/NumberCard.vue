<template>
  <div>
    <div class="title"><h3>道路总数</h3></div>
    <div class="digit">
      <div class="dataStatistics">
        <div
          class="digit_set"
          v-for="(item, index) in countNumber"
          :key="index"
        >
          <div class="digit active">
            <div class="digit_top">
              <span class="digit_wrap">{{ item }}</span>
            </div>
            <div class="digit_bottom">
              <span class="digit_wrap">{{ item }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="statistic-number">
      <div class="statistic-box">
        <span class="detail-title"
          >养护长度<i class="num">{{ roadLength }}</i
          >米</span
        >
      </div>
      <div class="statistic-box rigth-box">
        <span class="detail-title"
          >养护面积<i class="num">{{ roadArea }}</i
          >平方米</span
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NumberCard',
  data() {
    return {
      num: [],
      length: 0,
      arear: 0,
      count: 0,
      allData: [{ nums: 0 }, { nums: 0 }, { nums: 0 }],
    };
  },
  computed: {
    roadCount() {
      return this.allData[2].nums;
    },
    roadLength() {
      return this.allData[0].nums;
    },
    roadArea() {
      return this.allData[1].nums;
    },
    countNumber() {
      return this.num;
    },
  },
  watch: {
    roadCount(newValue) {
      this.initNumber(newValue);
    },
  },
  methods: {
    initNumber(num) {
      this.num = ('0' + num).toString().split('');
      // for (let index = 0; index < this.count; index++) {
      //   this.num.push(parseInt(this.number / Math.pow(10, this.count - index)));
      // }
    },
    async getAllData() {
      const data = await this.$Http.Road_GetRoadCount();
      this.allData = data;
      console.log('Road_GetRoadCount', data);
    },
  },
  mounted() {
    this.getAllData();
  },
};
</script>
<style lang="less" scoped>
@import '../assets/css/style.css';
.digit {
  position: relative;
  .dataStatistics {
    position: relative;
    font-size: 30px;
    font-weight: 700;
    line-height: 48px;
    width: auto;
    height: 48px;
    top: 0px;
    left: 50%;
    margin-left: -100px;
    .digit_set {
      width: 48px;
      .digit_top {
        border-radius: 4px 4px 0px 0px;
        width: 48px;
        .digit_wrap {
          line-height: 48px;
        }
      }
      .digit_bottom {
        border-radius: 0 0 4px 4px;
        width: 48px;
        .digit_wrap {
          line-height: 48px;
          margin-top: -132%;
        }
      }
    }
  }
}

.statistic-number {
  position: relative;
  padding: 0px 2px;
  text-align: justify;
  .statistic-box {
    display: inline-block;
    padding: 4px 15px;
    .detail-title {
      font-size: 14px;
      font-weight: normal;
      .num {
        font-style: normal;
        margin: 0px 5px;
        color: #fff;
        font-size: 18px;
      }
    }
  }
  .rigth-box {
    float: right;
  }
}
.title {
  h3 {
    color: #fff;
    text-align: center;
  }
}
</style>
