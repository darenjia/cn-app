<template>
  <div class="right-header">
    <a-row>
      <a-col :span="12">
        <div class="header">
          <v-chart :options="options" autoresize @click="clickChart" />
        </div>
      </a-col>
      <!-- </a-row>
    <a-row> -->
      <a-col :span="12">
        <div class="header">
          <ul class="num-ul">
            <li v-for="item in chartDatas" :key="item.type">
              <i class="divider"></i>
              <a href="javascript:;" @click="clickDetail(item.type)"
                ><span class="content name">{{ item.type }}</span>
                <span class="content num">
                  <span class="mark1"> {{ item.count }}</span>
                  <i style="color: #8f8d8d;"> |</i>
                  <span class="mark">{{ item.nums }}</span>
                </span></a
              >
            </li>
          </ul>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/polar';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';

let allCount = 1;
let allRepairCount = 0;
let count = 0;
let typeCount = 0;
let interval;
export default {
  props: ['chartData'],
  components: {
    'v-chart': ECharts,
  },
  data() {
    return {
      options: this.createOptions(this.chartData),
    };
  },
  watch: {
    chartData: function (newData) {
      if (newData.length > 4) {
        allCount = newData[0].nums;
        allRepairCount = newData[0].count;
      }
      this.options = this.createOptions(this.newData);
      this.startToggleTitle();
    },
  },
  computed: {
    chartDatas() {
      let array = this.chartData.concat();
      if (array && array.length > 5) {
        // array.shift();
        // array.shift();
        // array.shift();
        array = array.splice(3, 6);
      }
      return array;
    },
  },
  mounted() {},
  beforeDestroy() {
    clearInterval(interval);
  },
  methods: {
    createOptions(chartData) {
      return {
        title: {
          text: '病害',
          textStyle: {
            color: '#dddddd',
            fontSize: 18,
            fontWeight: '700',
            lineHeight: 40,
          },
          subtext: 0,
          subtextStyle: {
            color: '#dddddd',
            fontSize: 18,
            fontWeight: '600',
          },
          itemGap: -5,
          left: 'center',
          top: '30%',
        },
        angleAxis: {
          max: allCount,
          clockwise: false,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        radiusAxis: {
          type: 'category',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        polar: {
          center: ['50%', '50%'],
          radius: '130%',
        },
        tooltip: {
          show: true,
          formatter: function (e) {
            if (e.seriesName === 'test') {
              return '';
            } else {
              return e.name + ' : ' + e.value;
            }
          },
        },
        series: [
          {
            type: 'bar',
            startAngle: 100,
            clockwise: false,
            data: [
              {
                name: '维修',
                value: allRepairCount,
                itemStyle: {
                  normal: {
                    color: '#209fcb',
                    borderWidth: 0.8,
                    borderColor: '#eee',
                  },
                },
              },
            ],
            coordinateSystem: 'polar',
            roundCap: true,
            barWidth: 8,
            barGap: '-100%',
            z: 2,
          },
          {
            type: 'bar',
            data: [
              {
                name: '病害总数',
                value: allCount === 0 ? 1 : allCount,
                itemStyle: {
                  color: '#181818',
                  shadowColor: 'rgba(234, 234, 234, 0.6)',
                  shadowBlur: 10,
                },
              },
            ],
            coordinateSystem: 'polar',
            roundCap: true,
            barWidth: 8,
            barGap: '-100%',
            z: 1,
          },
          {
            max: 100,
            name: 'test',
            z: 1,
            type: 'pie',
            cursor: 'default',
            radius: ['50%', '50%'],
            startAngle: -1,
            hoverAnimation: false,
            legendHoverLink: false,
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: 100,
                itemStyle: {
                  borderColor: '#ffb349',
                  borderType: 'dashed',
                },
              },
            ],
          },
        ],
      };
    },
    clickChart(chart) {
      this.$parent.showDetail('');
    },
    clickDetail(type) {
      this.$parent.showDetail(type);
    },
    startToggleTitle() {
      const chart = this.options;
      let title = {};
      if (interval) {
        clearInterval(interval);
      }
      interval = setInterval(function () {
        if (count % 8 === 0) {
          if (typeCount % 2 === 0) {
            title = {
              text: '病害',
              subtext: allCount.toString(),
            };
          } else if (typeCount % 2 === 1) {
            title = {
              text: '维修',
              subtext: allRepairCount.toString(),
            };
          } else if (typeCount % 3 === 2) {
            title = {
              text: '维修率',
              textStyle: {
                color: '#dddddd',
              },
              subtext: ((allRepairCount / allCount) * 100).toFixed(0) + '%',
              subtextStyle: {
                color: '#dddddd',
              },
            };
          }
          chart.title = title;
          typeCount++;
        }
        chart.series[2].startAngle = count++;
        count++;
        if (count >= 360) {
          count = 0;
        }
      }, 500);
    },
  },
};
</script>
<style lang="less" scoped>
.right-header {
  width: 100%;
  height: 100%;
  .echarts {
    width: 100%;
    height: 100%;
  }
}
.header {
  height: 180px;
  vertical-align: center;
  .num-ul {
    margin-top: 10px;
  }
  ul {
    padding: 0px;
    li:nth-child(1) {
      .divider {
        background-color: #feda00;
      }
    }

    li:nth-child(2) {
      .divider {
        background-color: #6bc5ea;
      }
    }
    li:nth-child(3) {
      .divider {
        background-color: #fc8f8a;
      }
    }
    li:nth-child(4) {
      .divider {
        background-color: #fdb445;
      }
    }
    li:nth-child(5) {
      .divider {
        background-color: #ffc3c2;
      }
    }
    li:nth-child(6) {
      .divider {
        background-color: #7eb78f;
      }
    }
    li {
      font-weight: 600;
      list-style: none;
      position: relative;
      padding: 2px;
      .content {
        display: inline-block;
        position: relative;
        .mark {
          margin-left: 4px;
          color: #b5b3b3;
          width: 65px;
          position: absolute;
          right: -5px;
          background-color: transparent;
        }
        .mark1 {
          width: 50px;
          text-align: right;
          padding-right: 10px;
        }
      }
      .name {
        font-size: 14px;
        color: #dddddd;
      }
      .num {
        font-size: 17px;
        color: #87c38f;
        width: 65%;
        float: right;
        i {
          font-style: normal;
          position: absolute;
          right: 65px;
        }
      }
      .divider {
        width: 4px;
        background-color: aqua;
        height: 25px;
        position: absolute;
        border-radius: 20%;
        left: -8px;
      }
    }
  }
}
</style>
