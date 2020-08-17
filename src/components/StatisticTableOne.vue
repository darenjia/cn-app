<template>
  <div class="content-with-title">
    <div class="title">{{ title }}</div>
    <div class="time-filter">
      <a-month-picker placeholder="选择月份" @change="onChange" />
    </div>
    <ve-pie
      :data="chartData"
      :settings="chartSettings"
      :theme="theme"
      :legend-visible="true"
      :extend="chartExtend"
      :loading="loading"
      :dataEmpty="dataEmpty"
    ></ve-pie>
  </div>
</template>
<script>
export default {
  props: {
    theme: {},
  },
  data() {
    return {
      loading: true,
      dataEmpty: false,
      title: '设施类型分类统计',
      chartExtend: {
        legend: {
          icon: 'rect',
          bottom: 0,
        },
      },
      chartSettings: {
        // roseType: 'area',
      },
      chartData: {
        columns: ['type', 'nums'],
        rows: [],
      },
    };
  },
  methods: {
    async getDiseaseTypeCount() {
      const data = await this.$Http.getFacilitiesTypeCount();
      console.log(data);
      if (data.length > 0) {
        this.chartData.rows = data;
      } else {
        this.dataEmpty = true;
      }
      this.loading = false;
    },
    onChange(date, dateString) {
      console.log(date, dateString);
    },
  },
  mounted: function () {
    this.getDiseaseTypeCount();
  },
};
</script>
<style lang="less" scoped>
.time-filter {
  position: relative;
  margin-top: 10px;
  right: 0px;
  top: 0px;
}
</style>
