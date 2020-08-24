<template>
  <div class="content-with-title">
    <ve-histogram
      :data="chartData"
      :settings="chartSettings"
      :theme="theme"
      :extend="chartExtend"
    ></ve-histogram>
  </div>
</template>
<script>
export default {
  props: {
    theme: {},
  },
  data() {
    return {
      title: '设施类型统计图',
      chartSettings: {
        labelMap: {
          type: '类型',
          nums: '数量',
        },
        itemStyle: {
          color: '#72ccff',
        },
      },
      chartExtend: {
        title: {
          show: true,
          text: '设施类型统计图',
          textStyle: {
            color: '#ffffff',
          },
        },
        legend: {
          show: false,
        },
        series: {
          barWidth: 20,
        },
        tooltip: {
          trigger: 'none',
        },
      },
      chartData: {
        columns: ['type', 'nums'],
        rows: [],
      },
    };
  },
  methods: {
    async getDiseaseTypeCount() {
      const data = await this.$Http.getDiseaseTypeCount();
      this.chartData.rows = data;
    },
  },
  mounted: function () {
    this.getDiseaseTypeCount();
  },
};
</script>
