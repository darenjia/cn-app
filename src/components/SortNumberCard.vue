<template>
  <div class="sort-all">
    <div>
      <div class="header-number">
        <h3 class="title-with-bg" style="margin-bottom: 20px;">
          设施概况
        </h3>
        <div
          v-for="(item, index) in formatedDataList"
          :key="index"
          class="type"
        >
          <a
            class="type-bg"
            href="javascript:;"
            @click="clickSection(index)"
            @mouseout="leaveSection(index)"
            @mouseover="overSection(index)"
          >
            <div class="type-content">
              <div
                class="type-content-box type-content-box1"
                :style="{ backgroundPosition: '' + index * -43.5 + 'px 0px' }"
              ></div>
              <div class="type-content-box type-content-box2">
                <div
                  :class="[
                    'type-color-bg',
                    { 'chart-active': currentActive === index },
                  ]"
                ></div>
                <span class="number" style="color: #3bdce2;"
                  >{{ item.type[6].num }}<i>km</i></span
                >
                <span class="number" style="color: #e38538;"
                  >{{ item.type[5].num + '万' }}<i>㎡</i></span
                >
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="sort-detail">
      <div class="sort-image-box">
        <div class="sort-image sort-image0"></div>
        <div
          class="sort-image sort-image1"
          :style="{
            opacity: currentActive === 0 ? 1 : 0,
          }"
        ></div>
        <div
          class="sort-image sort-image2"
          :style="{
            opacity: currentActive === 1 ? 1 : 0,
          }"
        ></div>
        <div
          class="sort-image sort-image3"
          :style="{
            opacity: currentActive === 2 ? 1 : 0,
          }"
        ></div>
        <div
          class="sort-image sort-image4"
          :style="{
            opacity: currentActive === 3 ? 1 : 0,
          }"
        ></div>
      </div>
      <div
        :class="[
          'line-style',
          'line1',
          {
            'show-line': currentActive === 3,
            'hide-line': currentActive !== 3,
          },
        ]"
      ></div>
      <div
        :class="[
          'line-style',
          'line2',
          {
            'show-line': currentActive === 2,
            'hide-line': currentActive !== 2,
          },
        ]"
      ></div>
      <div
        :class="[
          'line-style',
          'line3',
          {
            'show-line': currentActive === 1,
            'hide-line': currentActive !== 1,
          },
        ]"
      ></div>
      <div
        :class="[
          'line-style',
          'line4',
          {
            'show-line': currentActive === 0,
            'hide-line': currentActive !== 0,
          },
        ]"
      ></div>
      <div class="sort-detail-box">
        <div class="box box1"></div>
        <div class="sort-type-number sort-type1-number">
          <span class="number">{{ sortDetail.type1 }}</span
          ><span class="name">检查井</span>
        </div>
        <div class="sort-type-number sort-type2-number">
          <span class="number">{{ sortDetail.type2 }}</span
          ><span class="name">雨水口</span>
        </div>
        <div class="sort-type-number sort-type3-number">
          <span class="number">{{ sortDetail.type3 }}</span
          ><span class="name">车行道(㎡)</span>
        </div>
        <div class="sort-type-number sort-type4-number">
          <span class="number">{{ sortDetail.type4 }}</span
          ><span class="name">人行道(㎡)</span>
        </div>
        <div class="sort-type-number sort-type5-number">
          <span class="number">{{ sortDetail.type5 }}</span
          ><span class="name">下水道(km)</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
let interval;
export default {
  name: 'SortNumberCard',
  components: {},
  data() {
    return {
      formatedData: [],
      colors: ['#aa89bd', '#FACD89', '#acd598', '#f29c9f', '#4b5966'],
      option: {},
      currentActive: 0,
      sectionIndex: 0,
      sortDetailData: { type1: '', type2: '', type3: '', type4: '', type5: '' },
    };
  },
  computed: {
    formatedDataList() {
      return this.formatedData;
    },
    formartedItem() {
      return this.formatedData[0];
    },
    sortDetail() {
      return this.sortDetailData;
    },
  },
  mounted() {
    this.getAllData();
  },
  methods: {
    async getAllData() {
      const data = await this.$Http.First_GetFacilitiesData();
      console.log('First_GetFacilitiesData', data);
      this.initDataNumber(data);
    },
    createObject(name) {
      const data = { type: [], name: name };
      for (let i = 0; i < 7; i++) {
        data.type.push(this.creatChildObject());
      }
      return data;
    },
    creatChildObject() {
      return { num: 0, unit: 'm', name: '', width: 0 };
    },
    clickSection(index) {
      this.setSectionData(index);
    },
    leaveSection(index) {
      console.log('hover');
      this.startInterval();
    },
    overSection(index) {
      this.setSectionData(index);
      this.stopInterval();
    },
    stopInterval() {
      if (interval) {
        clearInterval(interval);
        console.log(interval);
      }
    },
    startInterval() {
      this.stopInterval();
      interval = setInterval(() => {
        this.sectionIndex++;
        if (this.sectionIndex > 3) {
          this.sectionIndex = 0;
        }
        this.setSectionData(this.sectionIndex);
      }, 5000);
    },
    setSectionData(index) {
      const data = this.formatedData;
      this.currentActive = index;
      this.sectionIndex = index;
      this.sortDetailData = {
        type1: data[index].type[3].num,
        type2: data[index].type[4].num,
        type3: data[index].type[1].num,
        type4: data[index].type[0].num,
        type5: data[index].type[2].num,
      };
    },
    initDataNumber(result) {
      const data = [];
      data.push(this.createObject('一'));
      data.push(this.createObject('二'));
      data.push(this.createObject('三'));
      data.push(this.createObject('四'));
      for (let index = 0; index < result.length; index++) {
        const element = result[index];
        switch (element.type) {
          case '下水道养护长度':
            for (let x = 0; x < element.roads.length; x++) {
              data[x].type[2].num = element.roads[x].nums;
              data[x].type[2].name = '下水道养护长度';
              data[x].type[2].unit = 'km';
              data[x].type[2].width = (
                ((element.roads[x].nums * 3) / element.nums) *
                100
              ).toFixed(1);
            }
            break;
          case '人行道':
            for (let x = 0; x < element.roads.length; x++) {
              data[x].type[0].num = element.roads[x].nums;
              data[x].type[0].name = '人行道';
              data[x].type[0].unit = '㎡';
              data[x].type[0].width = (
                (element.roads[x].nums / element.nums) *
                100
              ).toFixed(1);
            }
            break;
          case '检查井养护数量':
            for (let x = 0; x < element.roads.length; x++) {
              data[x].type[3].num = element.roads[x].nums;
              data[x].type[3].name = '检查井养护数量';
              data[x].type[3].unit = '个';
              data[x].type[3].width = (
                ((element.roads[x].nums * 1) / element.nums) *
                100
              ).toFixed(1);
            }
            break;
          case '车行道':
            for (let x = 0; x < element.roads.length; x++) {
              data[x].type[1].num = element.roads[x].nums;
              data[x].type[1].name = '车行道';
              data[x].type[1].unit = '㎡';
              data[x].type[1].width = (
                (element.roads[x].nums / element.nums) *
                100
              ).toFixed(1);
            }
            break;
          case '雨水口养护数量':
            for (let x = 0; x < element.roads.length; x++) {
              data[x].type[4].num = element.roads[x].nums;
              data[x].type[4].name = '雨水口养护数量';
              data[x].type[4].unit = '个';
              data[x].type[4].width = (
                ((element.roads[x].nums * 2.5) / element.nums) *
                100
              ).toFixed(1);
            }
            break;
          case '道路养护面积':
            for (let x = 0; x < element.roads.length; x++) {
              data[x].type[5].num = element.roads[x].nums;
              data[x].type[5].name = '道路养护面积';
              data[x].type[5].unit = '个';
            }
            break;
          case '道路养护长度':
            for (let x = 0; x < element.roads.length; x++) {
              data[x].type[6].num = element.roads[x].nums;
              data[x].type[6].name = '道路养护长度';
              data[x].type[6].unit = '个';
            }
            break;
          default:
            break;
        }
      }
      console.log(data);
      this.formatedData = data;
      this.startInterval();
      this.sortDetailData = {
        type1: data[0].type[3].num,
        type2: data[0].type[4].num,
        type3: data[0].type[1].num,
        type4: data[0].type[0].num,
        type5: data[0].type[2].num,
      };
    },
  },
  beforeDestroy() {
    this.stopInterval();
  },
};
</script>
<style lang="less" scoped>
.sort {
  color: #eee;
  ul {
    width: 100%;
    padding-inline-start: 0px;
    margin-bottom: 10px;
    padding: 0px 4px;
    height: 70px;
    li:hover {
      height: 50px;
    }
    li {
      position: relative;
      list-style: none;
      width: 25%;
      height: 40px;
      display: inline-block;
      line-height: 40px;
      margin: 2px 0px;
      transition: all 0.3s ease;
      span {
        margin-left: 20px;
      }
      .title {
        float: right;
        font-size: 12px;
        padding: 4px;
      }
      .bar {
        display: block;
        width: 100%;
      }
      .number {
        font-size: 14px;
        padding: 4px;
      }
      .unit {
        color: #ddd;
      }
    }
    .li-after {
      position: absolute;
      bottom: 0px;
      width: 100%;
      height: 1px;
      left: 0;
      z-index: -1;
      transition: all 0.3s ease;
      background-color: aqua;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.4),
        rgba(0, 255, 0, 0)
      );
    }
    .active-type {
      height: 40px;
    }
  }
}
.sort-box {
  height: 145px;
  padding: 10px;
  text-align: center;
  .sort-content {
    border-radius: 10px;
    height: 100%;
    border: 1px solid transparent;
    .mark-text {
      font-family: '宋体';
      font-size: 24px;
      font-weight: 700;
      line-height: 80px;
    }
  }
}
.sort-detail {
  width: 100%;
  position: relative;
  height: 100%;
  bottom: 0px;
  margin-top: 73px;
}
.color1 {
  background-color: #e6688a;
}
.color2 {
  background-color: #70b0bf;
}
.color3 {
  background-color: #fdd775;
}
.color4 {
  background-color: #8dbe6e;
}

.line1 {
  bottom: 0px;
  left: 92px;
}
.line2 {
  bottom: 0px;
  left: 170px;
}
.line3 {
  bottom: 0px;
  left: 234px;
}
.line4 {
  bottom: 0px;
  left: 280px;
}
.line-style {
  position: absolute;
  width: 3px;
  height: 50px;
  transition: all 0.5s ease;
  background: linear-gradient(to top, transparent, rgba(253, 254, 13, 1));
}
.show-line {
  opacity: 1;
  height: 80px;
  bottom: 60px;
}
.hide-line {
  opacity: 0;
}
.chart-content {
  height: 200px;
  width: 100%;
  .echarts {
    width: 400px;
    height: 400px;
    top: -102px;
    left: -100px;
  }
}
.sort-detail-box {
  position: absolute;
  color: #fff;
  top: 4px;
  left: 0px;
}
.sort-image-box {
  width: 100%;
  height: 300px;
  position: relative;
  top: 72px;
  transform: rotateX(45deg);
  .sort-image {
    margin-left: -10px;
    transition: all 0.3s;
    width: 100%;
    height: 300px;
    background-repeat: no-repeat;
    background-size: 100% 56%;
    background-position: 0px 100px;
    position: absolute;
  }
  .sort-image0 {
    background-image: url('../assets/img/all.png');
    opacity: 1;
  }
  .sort-image1 {
    background-image: url('../assets/img/all001.png');
    opacity: 0;
  }
  .sort-image2 {
    background-image: url('../assets/img/all002.png');
    opacity: 0;
  }
  .sort-image3 {
    background-image: url('../assets/img/all003.png');
    opacity: 0;
  }
  .sort-image4 {
    background-image: url('../assets/img/all004.png');
    opacity: 0;
  }
  .image-shadow {
    position: absolute;
    width: 100%;
    height: 300px;
    top: 0px;
    left: 0px;
    backdrop-filter: blur(4px) brightness(100%);
    background-color: rgba(255, 255, 255, 0);
    background-size: 100% 100%;
  }
}
.chart-data {
  width: 100%;
  color: #fff;
  overflow: hidden;
  height: 180px;
  padding: 10px;
  margin: 10px;
  text-align: center;
  position: relative;
  .chart-data-sort {
    height: 100%;
    width: 100%;
    border: 1px solid #fff;
    border-radius: 10px;
    border-color: white;
    position: absolute;
    top: 0px;
    left: -100%;
    .chart-data-title {
      font-size: 20px;
      font-weight: 700;
      margin: 4px 0px;
    }
  }
  .chart-active {
    left: 0px;
    transition: all 0.3s;
  }
}
.box {
  width: 300px;
  height: 200px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  transition: all 1s;
  padding-left: 10px;
  color: #a7a7a7;
  font-weight: 700;
  font-size: 16px;
}
.box1 {
  background-image: url('../assets/img/first_sort_cons.png');
  background-position: -120px 0px;
  top: -45px;
  animation: rotate 2s infinite;
}
.box3 {
  width: 160px;
  background-image: url('../assets/img/type_bottom.png');
  top: 100px;
}
.sort-type-number {
  width: 80px;
  text-align: right;
  position: absolute;
  color: #eee;
  span {
    display: block;
  }
  .number {
    font-size: 18px;
    font-weight: 700;
    color: #eee;
  }
  .name {
    font-size: 12px;
    margin-top: -6px;
    color: #c0b1a3;
  }
}
.number1:after {
  content: '';
  position: relative;
  display: block;
  width: 127px;
  height: 1px;
  background-color: #5e5a2b;
  top: -16px;
  left: -112px;
}
.number2:after {
  content: '';
  position: relative;
  display: block;
  width: 100px;
  height: 1px;
  background-color: #465c17;
  top: -24px;
  left: -85px;
}
.number3:after {
  content: '';
  position: relative;
  display: block;
  width: 70px;
  height: 1px;
  background-color: #0d6985;
  top: -24px;
  left: -54px;
}
.sort-type1-number {
  left: 180px;
  top: -18px;
}
.sort-type2-number {
  left: 260px;
  top: -18px;
}
.sort-type3-number {
  left: 180px;
  top: 40px;
}
.sort-type4-number {
  left: 260px;
  top: 40px;
}
.sort-type5-number {
  left: 180px;
  top: 100px;
}
.header-number {
  position: relative;
  width: 100%;
  color: #eee;
  min-height: 194px;
  .type {
    display: inline-block;
    width: 50%;
    padding: 10px;

    .type-bg {
      // background: url('../assets/img/first_statistic_border.png');
      // background-size: 100% 100%;
      display: inline-block;
      position: relative;
      width: 100%;
      height: 100%;
      .type-content {
        position: relative;
        .number {
          font-size: 16px;
          display: block;
          padding-left: 20px;
          width: 100px;
          line-height: 24px;
          i {
            font-style: normal;
            font-size: 14px;
            float: right;
            color: #fff;
            font-weight: 700;
          }
        }
        .type-content-box {
          display: inline-block;
          position: relative;
          top: 0px;
          left: 0px;
        }
        .type-content-box1 {
          width: 42px;
          height: 46px;
          background-image: url('../assets/img/first_statistic_sort_bg.png');
          background-size: 412% 100%;
          background-position: 0px 0px;
          background-repeat: no-repeat;
          animation: rotate 2s linear infinite;
        }
        .type-content-box2 {
          top: -4px;
        }
      }
      .type-color-bg {
        position: absolute;
        width: 0px;
        background: linear-gradient(
          to right,
          rgba(95, 95, 95, 1),
          rgba(95, 95, 95, 0)
        );
        transition: all 0.5s;
        height: 46px;
        margin-left: -22px;
        top: 0px;
        z-index: -1;
      }
      .chart-active {
        width: 140px;
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
  .sub-title {
    color: #fff;
    width: 100%;
    line-height: 50px;
    text-align: center;
  }
}
@keyframes rotate {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(2px);
  }
}
</style>
