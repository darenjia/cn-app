<template>
  <div class="content-with-title">
    <div class="title">{{ title }}</div>
    <ve-line
      :data="chartData"
      :settings="chartSettings"
      :theme="theme"
      :extend="chartExtend"
      :loading="loading"
      :dataEmpty="dataEmpty"
    ></ve-line>
  </div>
</template>
<script>
export default {
  props: {
    theme: {},
  },
  data() {
    return {
      title: '病害类型统计图',
      loading: true,
      dataEmpty: false,
      chartExtend: {
        legend: {
          icon: 'rect',
          bottom: 0,
        },
      },
      chartSettings: {
        area: true,
        itemStyle: {
          color: '#d4a4eb',
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
      console.log(data);
      if (data.length > 0) {
        this.chartData.rows = data;
      } else {
        this.dataEmpty = true;
      }
      this.loading = false;
    },
  },
  mounted: function () {
    this.getDiseaseTypeCount();
  },
};
</script>
