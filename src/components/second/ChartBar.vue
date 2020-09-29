<template>
  <div class="content-with-title">
    <v-chart :options="option" autoresize @click="onMonthChange"></v-chart>
  </div>
</template>
<script>
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
const color = ['#E6688A', '#70B0Bf', '#FDD775', '#8DBE6E', '#4b5966'];
let dataLength;
export default {
  props: ['chartData'],
  components: {
    'v-chart': ECharts,
  },
  data() {
    return {
      interval: undefined,
      flag: 5,
      option: this.createOption([]),
    };
  },
  watch: {
    chartData(newValue) {
      this.option = this.createOption(newValue);
    },
  },
  methods: {
    onMonthChange(params) {
      console.log('clickMonth', params.data.name);
      this.$store.commit('changeRoadPlanMonth', params.data.name);
    },
    createOption(chartData) {
      const data = [];
      const xData = [];
      const data1 = [];
      dataLength = chartData.length >= 6 ? 6 : chartData.length;
      for (let i = 0; i < dataLength; i++) {
        xData.push(chartData[i].date);
        data.push(this.creatSeries1Data(chartData[i], i));
        data1.push(this.creatSeriesData(chartData[i]));
      }

      const seriesOption = [
        {
          name: '计划月份',
          type: 'bar',
          barMaxWidth: '20%',
          data: data,
        },
        {
          name: '完成',
          type: 'line',
          smooth: true,
          data: data1,
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: 'outside',
                color: '#fff',
              },
            },
          },
          markPoint: {
            symbol: 'circle',
            symbolSize: 5,
            itemStyle: {
              color: '#fff',
            },
          },

          lineStyle: {
            width: 2,
            // eslint-disable-next-line no-undef
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#6a11cb', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#2575fc', // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
            shadowColor: 'rgba(158,135,255, 0.3)',
            shadowBlur: 10,
            shadowOffsetY: 0,
          },
        },
      ];
      this.addInterval();
      return {
        xAxis: {
          show: true,
          type: 'category',
          axisLabel: {
            show: true,
            color: '#fff',
          },
          boundaryGap: false,
          axisTick: 10,
          data: xData,
        },
        yAxis: [
          {
            show: false,
            type: 'value',
          },
          {
            show: false,
            type: 'value',
          },
        ],
        series: seriesOption,
      };
    },
    creatSeriesData(data) {
      return {
        value: data.nums,
        name: data.date,
      };
    },
    creatSeries1Data(data, i) {
      return {
        value: data.wancheng,
        name: data.date,
        itemStyle: {
          normal: {
            color: color[i % 5],
            borderWidth: 1,
            shadowBlur: 20,
            borderColor: color[i % 5],
            shadowColor: color[i % 5],
          },
        },
      };
    },
    addInterval() {
      if (this.interval) {
        clearInterval(this.interval);
      }
      if (dataLength >= 6) {
        this.interval = setInterval(() => {
          this.flag++;
          if (this.flag > this.chartData.length - 1) {
            this.flag = 0;
          }
          const data = this.chartData[this.flag];
          var data0 = this.option.series[0].data;
          var data1 = this.option.series[1].data;
          data0.shift();
          data0.push(this.creatSeries1Data(data, this.flag));
          data1.shift();
          data1.push(this.creatSeriesData(data));
          this.option.xAxis.data.shift();
          this.option.xAxis.data.push(data.date);
        }, 3000);
      }
    },
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  },
};
</script>
<style lang="less" scoped>
.content-with-title {
  width: 100%;
  height: 270px;
  position: relative;
}
.echarts {
  position: absolute;
  width: 100%;
  height: 320px;
  top: -40px;
  left: 0px;
}
</style>
