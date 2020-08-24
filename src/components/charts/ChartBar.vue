<template>
  <div class="content-with-title">
    <v-chart :options="option" autoresize></v-chart>
  </div>
</template>
<script>
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/bar';

export default {
  components: {
    'v-chart': ECharts,
  },
  data() {
    return {
      option: {
        grid: {
          show: false,
        },
        xAxis: {
          type: 'category',
        },
        yAxis: {
          type: 'value',
        },
        dataset: {
          source: [],
        },
        series: [
          {
            type: 'bar',
            name: 'nums',
          },
        ],
      },
    };
  },
  methods: {
    async getDiseaseTypeCount() {
      const data = await this.$Http.getDiseaseTypeCount();
      this.option.dataset.source = data;
    },
  },
  mounted: function () {
    this.getDiseaseTypeCount();
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
