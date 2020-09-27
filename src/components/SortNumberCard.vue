<template>
  <div class="sort-all">
    <div>
      <a-row>
        <a-col :span="10">
          <div class="chart-data">
            <div
              v-for="(item, index) in formatedDataList"
              :key="index"
              :class="[
                'chart-data-sort',
                { 'chart-active': currentActive === index },
              ]"
              :style="{ backgroundColor: colors[index] }"
            >
              <div class="chart-data-title">
                <span>{{ item.name + '标段' }}</span>
              </div>
              <div>
                <p>养护道路数量<br />{{ item.type[6].num }}</p>
              </div>
              <div>
                <p>养护道路面积<br />{{ item.type[5].num }}</p>
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="14">
          <div class="chart-content">
            <!-- <v-chart :options="option" autoresize ref="child"></v-chart> -->
            <section-statistic-bar
              :chartData="formatedDataList"
              ref="child"
            ></section-statistic-bar>
          </div>
        </a-col>
      </a-row>
      <div class="sort">
        <ul>
          <li v-for="(item, index) in formatedDataList" :key="index">
            <div
              class="li-after"
              :class="[{ 'active-type': currentActive === index }]"
              :style="{ backgroundColor: colors[index] }"
            ></div>
            <span>{{ item.name + '标段' }}</span>
          </li>
        </ul>
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
        <div class="box box1">设施</div>
        <div class="box box2">路面</div>
        <div class="box box3">下水道</div>
        <div class="sort-type-number sort-type1-number number1">
          <span class="number">{{ sortDetail.type1 }}</span
          ><span class="name">检查井</span>
        </div>
        <div class="sort-type-number sort-type2-number">
          <span class="number">{{ sortDetail.type2 }}</span
          ><span class="name">雨水口</span>
        </div>
        <div class="sort-type-number sort-type3-number number2">
          <span class="number">{{ sortDetail.type3 }}</span
          ><span class="name">车行道</span>
        </div>
        <div class="sort-type-number sort-type4-number">
          <span class="number">{{ sortDetail.type4 }}</span
          ><span class="name">人行道</span>
        </div>
        <div class="sort-type-number sort-type5-number number3">
          <span class="number">{{ sortDetail.type5 }}</span
          ><span class="name">下水道</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SectionStatisticBar from './charts/SectionStatisticBar';
let interval;
export default {
  name: 'SortNumberCard',
  components: {
    SectionStatisticBar,
  },
  data() {
    return {
      formatedData: [],
      colors: ['#aa89bd', '#FACD89', '#acd598', '#f29c9f', '#4b5966'],
      option: {},
      currentActive: 0,
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
    dispatchAction(type) {
      this.$refs.child.dispatchAction(type);
    },
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
    startInterval() {
      let index = 0;
      if (interval) {
        clearInterval(interval);
      }
      interval = setInterval(() => {
        const data = this.formatedData;
        index++;
        if (index > 3) {
          index = 0;
        }
        this.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: index === 0 ? 3 : index - 1,
        });
        this.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: index,
        });
        this.currentActive = index;
        this.sortDetailData = {
          type1: data[index].type[3].num,
          type2: data[index].type[4].num,
          type3: data[index].type[1].num,
          type4: data[index].type[0].num,
          type5: data[index].type[2].num,
        };
      }, 5000);
    },
    createOption(chartData) {
      const data = [];
      for (let index = 0; index < chartData.length; index++) {
        const element = chartData[index];
        data.push({ name: element.name + '标段', value: element.type[5].num });
      }
      const colorList = this.colors;
      return {
        tooltip: {
          trigger: 'item',
        },
        series: [
          {
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['24%', '36%'],
            clockwise: true,
            avoidLabelOverlap: true,
            hoverOffset: 1,
            itemStyle: {
              normal: {
                color: function (params) {
                  return colorList[params.dataIndex];
                },
              },
            },

            label: {
              show: false,
            },
            tooltip: {
              show: true,
            },
            data: data,
          },
        ],
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
      // this.option = this.createOption(data);
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
    clearInterval(interval);
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
  left: 112px;
}
.line2 {
  bottom: 0px;
  left: 192px;
}
.line3 {
  bottom: 0px;
  left: 261px;
}
.line4 {
  bottom: 0px;
  left: 320px;
}
.line-style {
  position: absolute;
  width: 2px;
  height: 50px;
  transition: all 2s ease;
  background: linear-gradient(
    to top,
    rgba(255, 0, 0, 0),
    rgba(49, 134, 241, 1)
  );
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
  top: 125px;
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
  width: 100px;
  height: 40px;
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
  background-image: url('../assets/img/type_top.png');
  top: 0px;
}
.box2 {
  background-image: url('../assets/img/type_middle.png');
  width: 130px;
  top: 50px;
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
    color: #dcab22;
  }
  .name {
    font-size: 12px;
    margin-top: -6px;
    color: #579dd0;
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
  top: 2px;
}
.sort-type2-number {
  left: 260px;
  top: 2px;
}
.sort-type3-number {
  left: 180px;
  top: 54px;
}
.sort-type4-number {
  left: 260px;
  top: 54px;
}
.sort-type5-number {
  left: 180px;
  top: 108px;
}
</style>
