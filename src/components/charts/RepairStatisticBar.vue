<template>
  <div style="height: 250px;">
    <v-chart :options="options" autoresize />
  </div>
</template>
<script>
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/bar';
export default {
  props: ['chartData'],
  components: {
    'v-chart': ECharts,
  },
  data() {
    return {
      options: {},
    };
  },
  watch: {
    chartData: function (newData) {
      console.log(newData);
      this.options = this.createOptions(this.chartData);
    },
  },
  methods: {
    createOptions(chartData) {
      const data = [];
      let allCount = chartData[0].nums;
      const dataAll = [0];
      const xData = [];
      for (let i = 0; i < chartData.length; i++) {
        const nums = chartData[i].nums;
        data.push(nums);
        xData.push(chartData[i].type);
        if (i > 0) {
          allCount -= nums;
          dataAll.push(allCount);
        }
      }

      const seriesOption = [
        {
          name: '辅助',
          type: 'bar',
          stack: '总量',
          itemStyle: {
            barBorderColor: 'rgba(0,0,0,0)',
            color: 'rgba(0,0,0,0)',
          },
          emphasis: {
            itemStyle: {
              barBorderColor: 'rgba(0,0,0,0)',
              color: 'rgba(0,0,0,0)',
            },
          },
          data: dataAll,
        },
        {
          name: '生活费',
          type: 'bar',
          stack: '总量',
          label: {
            show: true,
            position: 'inside',
          },
          data: data,
        },
      ];

      return {
        tooltip: {
          show: true,
        },
        xAxis: {
          type: 'category',
          splitLine: { show: false },
          data: xData,
        },
        yAxis: {
          type: 'value',
        },
        toolbox: {
          show: false,
        },
        series: seriesOption,
      };
    },
  },
};
</script>
<style lang="less" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
