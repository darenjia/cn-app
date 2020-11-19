<template>
  <div>
    <!-- <div class="title"><h3>道路</h3></div> -->
    <div class="digit">
      <div class="digit-bg"></div>
      <div class="dataStatistics">
        <span class="title-name"
          ><a
            href="javascript:window.open('http://47.103.63.36:8081/Home/Index');"
            >道路总数</a
          ></span
        >
        <div class="digit-box">
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
        <span class="title-name">条</span>
      </div>
    </div>

    <div class="statistic-number">
      <div class="statistic-box">
        <span class="detail-title"
          >养护长度<i class="num" style="color: #3bdce2;">{{ roadLength }}</i
          >千米</span
        >
      </div>
      <div class="statistic-box rigth-box">
        <span class="detail-title"
          >养护面积<i class="num">{{ roadArea }}</i
          >万平方米</span
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
      this.num = num.toString().split('');
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
  top: 2px;
  .digit-bg {
    background-image: url('../assets/img/first_header_bg.png');
    width: 170px;
    height: 110px;
    background-size: 100% 100%;
    position: relative;
    left: 0px;
    top: 0px;
  }
  .dataStatistics {
    position: absolute;
    font-size: 30px;
    font-weight: 700;
    line-height: 48px;
    width: auto;
    height: 48px;
    top: 40px;
    left: 50%;
    margin-left: -103px;
    .title-name {
      color: #fff;
      font-size: 20px;
      float: left;
      a {
        color: #fff;
      }
    }
    .digit-box {
      float: left;
      height: 40px;
      margin-left: 20px;
      margin-bottom: 8px;
      position: relative;
      bottom: 6px;
      .digit_set {
        width: 40px;
        font-size: 25px;
        text-align: center;
        color: #fff;
        .digit_top {
          border-radius: 4px 4px 0px 0px;
          padding: 0px 4px;
          width: 30px;
          background-color: #309fa3;
          border-color: #309fa3;
          .digit_wrap {
            line-height: 40px;
          }
        }
        .digit_bottom {
          border-radius: 0 0 4px 4px;
          padding: 0px 4px;
          width: 30px;
          background-color: #da981;
          border-color: #309fa3;
          .digit_wrap {
            line-height: 40px;
            margin-top: -20px;
          }
        }
      }
    }
  }
}

.statistic-number {
  position: relative;
  padding: 5px 2px;
  text-align: justify;
  color: #fff;
  .statistic-box {
    display: inline-block;
    padding: 4px 1px;
    .detail-title {
      font-size: 14px;
      .num {
        font-style: normal;
        margin: 0px 5px;
        color: #e38538;
        font-size: 18px;
        font-weight: 600;
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
