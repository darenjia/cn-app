<template>
  <div>
    <div class="diseaseType">
      <span class="diseaseTitle"
        ><span class="disease-name">{{ diseaseTitle }}</span> 病害Top5</span
      >
      <!-- <div class="diseaseFilter">
        <span
          @click="changeDiseaseType('巡检')"
          :class="[{ filterActive: currentType === '巡检' }]"
          >巡检</span
        >
        <span
          @click="changeDiseaseType('网格')"
          :class="[{ filterActive: currentType === '网格' }]"
          >网格</span
        >
      </div> -->
    </div>
    <a-row>
      <a-col :span="12">
        <div style="height: 270px;">
          <v-chart :options="options1" autoresize @click="onDetailClick1" />
        </div>
      </a-col>
      <a-col :span="12">
        <div style="height: 270px;">
          <v-chart :options="options2" autoresize @click="onDetailClick2" />
        </div>
      </a-col>
    </a-row>
    <!-- <div class="repair">
      <span v-for="item in repairStateData" :key="item.type">
        <span>{{ item.type }}</span>
        <span>{{ item.nums }}</span>
      </span>
      <repair-statistic-bar :chartData="repairStateData"></repair-statistic-bar>
    </div> -->
  </div>
</template>
<script>
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/title';

const color = ['#F28797', '#C0B1A3', '#FCE392', '#C3DACB', '#B3E6F4'];
// const color1 = ['#ffb349', '#70e9fc', '#4aa4ff'];
export default {
  props: ['diseaseType', 'dateRange'],
  components: {
    'v-chart': ECharts,
  },
  name: 'DiseaseTypeStatistic',
  data() {
    return {
      diseaseDetailData: [],
      type: '巡检',
      options1: this.createOptions(this.chartData1),
      options2: this.createOptions(this.chartData2),
      repairData: [],
      chartData1: [],
      chartData2: [],
      diseaseName: [],
    };
  },
  computed: {
    repairStateData() {
      return this.repairData;
    },
    currentType() {
      return this.type;
    },
    diseaseTitle() {
      return this.diseaseType;
    },
  },
  watch: {
    chartData1: function (newData) {
      this.options1 = this.createOptions(newData, '巡检');
    },
    chartData2: function (newData) {
      this.options2 = this.createOptions(newData, '网格');
    },
    diseaseType: function (newData, oldData) {
      // if (newData !== oldData) {
      this.getChartData();
      // this.getRepairCount();
      this.type = undefined;
      this.diseaseName = undefined;
      this.changeMapState();
      // }
    },
    dateRange(newData) {
      this.getChartData();
    },
  },
  methods: {
    getFilterParams() {
      const params = {};
      if (this.type) {
        params.type = this.type;
      }
      if (this.diseaseType) {
        params.diseaseType = this.diseaseType;
      }
      if (this.diseaseName) {
        params.diseaseName = this.diseaseName;
      }
      return params;
    },
    changeDiseaseType(type) {
      if (type !== this.type) {
        this.type = type;
        this.getChartData();
        // this.getRepairCount();
      }
    },
    changeMapState() {
      this.$store.commit('changeMapDiseaseType', this.getFilterParams());
    },
    createOptions(chartData, title) {
      if (chartData) {
        const data = [];
        const dataBackground = [];
        const y1Data = [];
        const y2Data = [];
        let maxCount = 10;
        if (chartData.length > 1) {
          maxCount = chartData[1].nums;
          // for (let i = 0; i < chartData.length; i++) {
          //   if (chartData[i].nums > maxCount) {
          //     maxCount = chartData[i].nums;
          //   }
          // }
        }
        for (let i = 1; i <= 5; i++) {
          let name;
          let nums;
          if (chartData[i] === undefined) {
            name = '（无）';
            nums = 0;
          } else {
            name = chartData[i].type;
            nums = chartData[i].nums;
          }
          data.push({
            name: name,
            value: nums,
            barGap: '-100%',
            itemStyle: {
              normal: {
                show: true,
                barBorderRadius: 10,
                color: color[(i - 1) % 5],
              },
              emphasis: {
                shadowBlur: 15,
                shadowColor: 'rgba(0, 0, 0, 0.1)',
              },
            },
          });
          dataBackground.push({
            value: maxCount,
            itemStyle: {
              color: '#181818',
              barBorderRadius: 10,
            },
          });
          y1Data.push(name);
          y2Data.push(nums);
        }

        const seriesOption = [
          {
            name: 'total',
            type: 'bar',
            zlevel: 1,
            barGap: '-100%',
            barWidth: '6px',
            data: dataBackground,
            legendHoverLink: false,
          },
          {
            name: 'bar',
            type: 'bar',
            zlevel: 2,
            barWidth: '6px',
            data: data,
            label: {
              normal: {
                color: '#b3ccf8',
                show: true,
                position: [0, '-24px'],
                textStyle: {
                  fontSize: 16,
                },
                formatter: function (a) {
                  let num = '';
                  let str = '';
                  if (a.dataIndex + 1 < 10) {
                    num = '0' + (a.dataIndex + 1);
                  } else {
                    num = a.dataIndex + 1;
                  }
                  if (a.dataIndex === 0) {
                    str = `{color1|${num}} {color4|${a.name}} {color4|${a.value}}`;
                  } else if (a.dataIndex === 1) {
                    str = `{color2|${num}} {color4|${a.name}} {color4|${a.value}}`;
                  } else {
                    str = `{color3|${num}} {color4|${a.name}} {color4|${a.value}}`;
                  }
                  return str;
                },
                rich: {
                  color1: {
                    color: '#ff9500',
                    fontWeight: 700,
                  },
                  color2: {
                    color: '#02d8f9',
                    fontWeight: 700,
                  },
                  color3: {
                    color: '#027fff',
                    fontWeight: 700,
                  },
                  color4: {
                    color: '#e5eaff',
                  },
                },
              },
            },
          },
        ];
        return {
          title: {
            text: title,
            textStyle: {
              color: '#fff',
              fontSize: 14,
              fontWeight: '400',
            },
          },
          tooltip: {
            trigger: 'item',
            formatter: p => {
              if (p.seriesName === 'total') {
                return '';
              }
              return `${p.name}<br/>${p.value}`;
            },
          },
          grid: {
            borderWidth: 0,
            top: '10%',
            left: '6%',
            right: '6%',
            bottom: '3%',
          },
          color: color,
          yAxis: [
            {
              type: 'category',
              inverse: true,
              axisTick: {
                show: false,
              },
              axisLine: {
                show: false,
              },
              axisLabel: {
                show: false,
                inside: false,
              },
              data: y1Data,
            },
            // {
            //   type: 'category',
            //   inverse: true,
            //   axisLine: {
            //     show: false,
            //   },
            //   axisTick: {
            //     show: false,
            //   },
            //   axisLabel: {
            //     show: true,
            //     inside: false,
            //     verticalAlign: 'middle',
            //     lineHeight: '40',
            //     textStyle: {
            //       color: '#b3ccf8',
            //       fontSize: '14',
            //       fontFamily: 'PingFangSC-Regular',
            //     },
            //     formatter: function (val) {
            //       return `${val}`;
            //     },
            //   },
            //   splitArea: {
            //     show: false,
            //   },
            //   splitLine: {
            //     show: false,
            //   },
            //   data: y2Data,
            // },
          ],
          xAxis: {
            type: 'value',
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
          },
          series: seriesOption,
        };
      }
      return {};
    },
    onDetailClick1(params) {
      if (params.seriesName === 'bar') {
        this.diseaseName = params.data.name;
        // this.getRepairCount();
        this.type = '巡检';
        this.changeMapState();
      }
    },
    onDetailClick2(params) {
      if (params.seriesName === 'bar') {
        this.diseaseName = params.data.name;
        // this.getRepairCount();
        this.type = '网格';
        this.changeMapState();
      }
    },
    async getDiseaseDetailTypeCount(type) {
      let params = {};
      params.type = type;
      if (this.diseaseType) {
        params.facilitiesname = this.diseaseType;
      }
      params = Object.assign(params, this.dateRange);
      const data = await this.$Http.getDiseaseWithRepair({
        params: params,
      });
      if (type === '巡检') {
        this.chartData1 = data;
      } else {
        this.chartData2 = data;
      }
    },
    getChartData() {
      this.getDiseaseDetailTypeCount('巡检');
      this.getDiseaseDetailTypeCount('网格');
    },
  },
  created() {
    this.getChartData();
  },
};
</script>
<style lang="less" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
.repair {
  color: aliceblue;
}
.diseaseType {
  .diseaseTitle {
    color: #f9bb0b;
    height: 40px;
    line-height: 40px;
    margin: 4px;
    font-size: 16px;
    .disease-name {
      font-weight: 700;
    }
  }
  .diseaseFilter {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    float: right;
    span {
      margin-right: 10px;
    }
    .filterActive {
      color: #06869c;
    }
  }
}
</style>
