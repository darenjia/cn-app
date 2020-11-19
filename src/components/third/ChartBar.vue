<template>
  <div class="content-with-title">
    <v-chart :options="option" autoresize></v-chart>
  </div>
</template>
<script>
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/pictorialBar';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

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
      for (let i = 0; i < chartData.length; i++) {
        data.push(chartData[i].nums);
        xData.push(chartData[i].type);
      }
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: { data: ['1'] },
        grid: {
          left: '12%',
          top: '5%',
          bottom: '12%',
          right: '8%',
        },
        xAxis: {
          data: xData,
          show: true,
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255, 129, 109, 0.1)',
              width: 1, // 这里是为了突出显示加上的
            },
          },
          axisLabel: {
            show: false,
            textStyle: {
              color: '#999',
              fontSize: 12,
            },
          },
        },
        yAxis: {
          show: false,
          type: 'value',
        },
        series: [
          {
            name: '数量',
            type: 'pictorialBar',
            barCategoryGap: '0%',
            symbol:
              'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
            label: {
              show: true,
              position: 'bottom',
              distance: 15,
              color: '#b73a35',
              fontWeight: 'bolder',
              fontSize: 14,
            },
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#5433f7', //  0%  处的颜色
                    },
                    {
                      offset: 1,
                      color: '#f24c44', //  100%  处的颜色
                    },
                  ],
                  global: false, //  缺省为  false
                },
              },
              emphasis: {
                opacity: 1,
              },
            },
            data: data,
            z: 10,
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
  height: 100%;
  left: 0px;
}
</style>
