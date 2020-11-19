<template>
  <v-chart :options="polar" autoresize @click="chartClick" />
</template>

<style>
/**
 * The default size is 600px×400px, for responsive charts
 * you may need to set percentage values as follows (also
 * don't forget to provide a size for the container).
 */
.echarts {
  width: 100%;
  height: 100%;
}
</style>

<script>
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/gauge';
import 'echarts/lib/component/polar';

const color = ['#FF647C', '#FFBE75', '#3EE2A5', '#6C77FD'];
export default {
  props: ['chartData'],
  components: {
    'v-chart': ECharts,
  },
  data() {
    var scaleData = [
      {
        name: '红灯 14',
        value: 14,
        radius1: [20, 22],
        radius2: '25%',
      },
      {
        name: '黄灯 32',
        value: 32,
        radius1: [28, 30],
        radius2: '30%',
      },
      {
        name: '绿灯 288',
        value: 288,
        radius1: [38, 40],
        radius2: '35%',
      },
      {
        name: '挂起 463',
        value: 463,
        radius1: [48, 50],
        radius2: '40%',
      },
    ];

    return {
      polar: this.createOptions(scaleData),
    };
  },
  methods: {
    createOptions(scaleData) {
      var seriesObj = [];
      const start = 40;
      const radius2 = 80 / scaleData.length;
      for (var i = 0; i < scaleData.length; i++) {
        seriesObj.push(
          {
            name: '',
            type: 'pie',
            radius: [start + 2 * i + i * 8, start + 2 * (i + 1) + i * 8],
            hoverAnimation: false,
            itemStyle: {
              normal: {
                label: {
                  show: false,
                  color: '#ddd',
                },
              },
            },
            data: [
              {
                value: scaleData[i].nums,
                name: scaleData[i].type,
                itemStyle: {
                  normal: {
                    borderWidth: 5,
                    borderColor: color[i],
                  },
                },
              },
              {
                value: 10000,
                name: '',
                itemStyle: {
                  normal: {
                    label: {
                      show: false,
                    },
                    labelLine: {
                      show: false,
                    },
                    color: 'rgba(0, 0, 0, 0)',
                    borderColor: 'rgba(0, 0, 0, 0)',
                    borderWidth: 0,
                  },
                },
              },
            ],
          },
          {
            name: '',
            type: 'gauge',
            detail: false,
            splitNumber: 10, // 刻度数量
            radius: 20 + radius2 * i + '%', // 图表尺寸
            center: ['50%', '50%'],
            startAngle: 0, // 开始刻度的角度
            endAngle: -356, // 结束刻度的角度
            axisLine: {
              show: false,
              lineStyle: {
                width: 0,
                shadowBlur: 0,
              },
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: 'rgba(220,220,220,0.5)',
                width: 5,
              },
              length: 5,
              splitNumber: 5,
            },
            splitLine: {
              show: false,
              length: 5,
              lineStyle: {
                color: 'rgba(220,220,220,0.1)',
              },
            },
            axisLabel: {
              show: false,
            },
          },
        );
      }
      return {
        // backgroundColor: '#04243E',
        color: color,
        tooltip: {
          show: true,
        },
        toolbox: {
          show: false,
        },
        series: seriesObj,
      };
    },
    chartClick(params) {
      console.log(params);
      if (params.componentType === 'series') {
        console.log(params.data.name);
      }
    },
  },
  watch: {
    chartData(newData) {
      this.polar = this.createOptions(newData);
    },
  },
};
</script>
