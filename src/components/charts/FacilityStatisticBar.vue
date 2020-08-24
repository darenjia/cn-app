<template>
  <div>
    <div style="height: 300px;">
      <v-chart :options="options" autoresize @click="onDetailClick" />
    </div>
    <div style="height: 300px;">
      <section-statistic-bar
        :chartData="facilitySectionData"
      ></section-statistic-bar>
    </div>
  </div>
</template>
<script>
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/title';
import SectionStatisticBar from './SectionStatisticBar';

const color = [
  '#00ffff',
  '#00cfff',
  '#006ced',
  '#ffe000',
  '#ffa800',
  '#ff5b00',
  '#ff3000',
];
export default {
  props: ['chartData', 'section'],
  components: {
    'v-chart': ECharts,
    SectionStatisticBar,
  },
  data() {
    return {
      facilitySectionData: [],
      options: this.createOptions(this.chartData),
    };
  },
  watch: {
    chartData: function (newData) {
      console.log(newData);
      this.options = this.createOptions(newData);
    },
    section: function (newData, oldData) {
      if (newData !== oldData) {
        this.getFacilitiesDetailType(newData);
      }
    },
  },
  methods: {
    createOptions(chartData) {
      const data = [];
      const xData = [];
      for (let i = 0; i < chartData.length; i++) {
        xData.push(chartData[i].type);
        data.push({
          value: chartData[i].nums,
          name: chartData[i].type,
          itemStyle: {
            normal: {
              color: color[i % 7],
              borderWidth: 1,
              shadowBlur: 20,
              borderColor: color[i % 7],
              shadowColor: color[i % 7],
            },
          },
        });
      }

      const seriesOption = [
        {
          name: '设施类型',
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
      ];

      return {
        title: {
          text: this.section,
          textStyle: {
            color: '#fff',
            fontSize: 20,
            fontWeight: '400',
          },
        },
        xAxis: {
          show: true,
          type: 'category',
          axisLabel: {
            show: true,
            color: '#fff',
            rotate: 45,
          },
          boundaryGap: false,
          axisTick: 10,
          data: xData,
        },
        yAxis: {
          show: false,
          type: 'value',
        },
        tooltip: {
          show: true,
          //   formatter: '{b0}: {c0}平方米',
        },
        legend: {
          icon: 'circle',
          orient: 'horizontal',
          // x: 'left',
          data: ['高级教师', '一级教师', '二级教师', '三级教师'],
          align: 'right',
          textStyle: {
            color: '#fff',
          },
          itemGap: 20,
        },
        series: seriesOption,
      };
    },
    onDetailClick(params) {
      console.log(params.data.name);
      //   this.getFacilitiesDetailType(params);
      this.$store.commit('changeMapFacilityDetailType', params.data.name);
    },
    async getFacilitiesDetailType(typeStr) {
      const data = await this.$Http.getFacilitiesDetailType({
        params: {
          type: typeStr,
        },
      });
      this.facilitySectionData = data;
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
