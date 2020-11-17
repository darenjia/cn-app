<template>
  <div class="content-with-title">
    <v-chart :options="option" autoresize></v-chart>
  </div>
</template>
<script>
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/grid';
const color = [
  '#f5ce57',
  '#5fa4c1',
  '#f19692',
  '#efab43',
  '#ffc3c2',
  '#7eb78f',
  '#43a761',
  '#e56c48',
];
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
      const xData = [];
      for (let i = 0; i < chartData.length; i++) {
        xData.push(chartData[i].type);
      }

      return {
        tooltip: {
          show: true,
          textStyle: {
            fontSize: 16,
          },
          formatter(params) {
            return (params.data.value * 100).toFixed(2) + '%';
          },
        },
        legend: {
          show: false,
        },
        grid: {
          left: 80,
          right: 60,
          bottom: 10,
        },
        xAxis: {
          type: 'value',

          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
        },
        yAxis: {
          type: 'category',
          inverse: true,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisPointer: {
            label: {
              show: true,
              margin: 30,
            },
          },
          data: xData,
          axisLabel: {
            margin: 55,
            fontSize: 14,
            align: 'left',
            color: '#eee',
          },
        },
        series: [
          {
            z: 2,
            name: '完成率',
            type: 'bar',
            barWidth: '10px',
            animationDuration: 1500,
            data: chartData.map((item, i) => {
              const number = item.count / item.nums;
              return {
                value: number,
                itemStyle: color[i],
                label: { backgroundColor: number >= 1 ? color[6] : color[7] },
              };
            }),
            itemStyle: {
              normal: {
                color: function (params) {
                  return color[params.dataIndex];
                },
                barBorderRadius: 5,
              },
            },
            label: {
              show: true,
              position: 'right',
              color: '#fff',
              fontSize: 14,
              offset: [10, 0],
              backgroundColor: color[0],
              width: 25,
              height: 25,
              borderRadius: 25,
              formatter(params) {
                return ' ';
              },
            },
          },
        ],
      };
    },
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
  height: 300px;
  top: -45px;
  left: 0px;
}
</style>
