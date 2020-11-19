<template>
  <div class="facility-box">
    <div class="facilityType">
      <span class="facilityTitle"
        ><span class="facility-name">{{ title }}</span> 设施详情</span
      >
    </div>
    <div style="height: 300px;">
      <v-chart :options="options" autoresize @click="onDetailClick" />
    </div>
    <div style="height: 270px;">
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
import 'echarts/lib/component/legend';
import SectionStatisticBar from './SectionStatisticBar';

const color = ['#E6688A', '#70B0Bf', '#FDD775', '#8DBE6E', '#4b5966'];
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
  computed: {
    title() {
      return this.section;
    },
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
      const legend = [];
      const unit = this.section === '道路' ? '㎡' : '个';
      for (let i = 0; i < chartData.length; i++) {
        xData.push(chartData[i].type);
        data.push({
          value: chartData[i].nums,
          name: chartData[i].type,
          itemStyle: {
            normal: {
              color: color[i % 5],
              borderWidth: 1,
              shadowBlur: 20,
              borderColor: color[i % 5],
              shadowColor: color[i % 5],
            },
          },
        });
        legend.push({ name: chartData[i].type });
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
          text: '设施类型分类',
          textStyle: {
            color: '#fff',
            fontSize: 14,
            fontWeight: '400',
          },
        },
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
        yAxis: {
          show: false,
          type: 'value',
        },
        tooltip: {
          show: true,
          formatter: '{b0}: {c0} ' + unit,
        },
        legend: {
          show: false,
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
  created() {
    this.getFacilitiesDetailType(this.section);
  },
};
</script>
<style lang="less" scoped>
.facilityType {
  .facilityTitle {
    color: #f9bb0b;
    height: 40px;
    line-height: 40px;
    margin: 4px;
    font-size: 16px;
    .facility-name {
      font-weight: 700;
    }
  }
}
.echarts {
  width: 100%;
  height: 100%;
}
</style>
