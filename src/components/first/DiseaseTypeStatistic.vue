<template>
  <div>
    <div class="diseaseType">
      <!-- <span class="diseaseTitle"
        ><span class="disease-name">{{ diseaseTitle }}</span> 病害Top5</span
      > -->
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
          <rank-list
            :ListData="options1"
            :type="'巡检'"
            @onDetailClick="onDetailClick"
          ></rank-list>
        </div>
      </a-col>
      <a-col :span="12">
        <div style="height: 270px;">
          <rank-list
            :ListData="options2"
            :type="'网格'"
            @onDetailClick="onDetailClick"
          ></rank-list>
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
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/title';
import RankList from './DiseaseRankList';

export default {
  props: ['diseaseType', 'dateRange'],
  components: {
    RankList,
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
      this.options1 = this.createOptions(newData);
    },
    chartData2: function (newData) {
      this.options2 = this.createOptions(newData);
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
    createOptions(chartData) {
      if (chartData) {
        const data = [];
        let maxCount = 10;
        if (chartData.length > 1) {
          maxCount = chartData[1].nums;
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
            count: nums / maxCount,
          });
        }
        return data;
      }
      return {};
    },
    onDetailClick(params) {
      this.diseaseName = params.name;
      // this.getRepairCount();
      this.type = params.type;
      this.changeMapState();
    },
    onDetailClick2(params) {
      this.diseaseName = params.data.name;
      // this.getRepairCount();
      this.type = '网格';
      this.changeMapState();
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
  height: 10px;
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
