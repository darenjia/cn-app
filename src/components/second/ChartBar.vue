<template>
  <div class="content-with-title">
    <v-chart :options="option" autoresize></v-chart>
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
let interval;
let flag = 5;
let dataLength;
export default {
  props: ['chartData'],
  components: {
    'v-chart': ECharts,
  },
  data() {
    return {
      option: this.createOption([]),
    };
  },
  watch: {
    chartData(newValue) {
      this.option = this.createOption(newValue);
    },
  },
  methods: {
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
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: 'outside',
                color: '#fff',
              },
            },
          },
          data: data,
        },
        {
          name: '完成',
          type: 'line',
          yAxisIndex: 1,
          data: data1,
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
      if (interval) {
        clearInterval(interval);
      }
      if (dataLength >= 6) {
        interval = setInterval(() => {
          flag++;
          if (flag > this.chartData.length - 1) {
            flag = 0;
          }
          const data = this.chartData[flag];
          var data0 = this.option.series[0].data;
          var data1 = this.option.series[1].data;
          data0.shift();
          data0.push(this.creatSeries1Data(data, flag));
          data1.shift();
          data1.push(this.creatSeriesData(data));
          this.option.xAxis.data.shift();
          this.option.xAxis.data.push(data.date);
        }, 1000);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.content-with-title {
  width: 100%;
  height: 300px;
}
.echarts {
  width: 100%;
  height: 100%;
}
</style>
