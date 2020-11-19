<template>
  <div class="content-with-title">
    <div class="title">{{ title }}</div>
    <div class="time-filter">
      <a-month-picker placeholder="选择月份" @change="onChange" />
    </div>
    <chart-pie></chart-pie>
  </div>
</template>
<script>
import ChartPie from './ChartPie';
export default {
  props: {
    theme: {},
  },
  data() {
    return {
      title: '设施类型分类统计',
    };
  },
  components: {
    ChartPie,
  },
  methods: {
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
