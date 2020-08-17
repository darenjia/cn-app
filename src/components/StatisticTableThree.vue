<template>
  <div class="content-with-title">
    <div class="title">{{ title }}</div>
    <ve-histogram
      :data="chartData"
      :settings="chartSettings"
      :theme="theme"
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
        itemStyle: {
          color: '#72ccff',
        },
      },
      chartData: {
        columns: ['type', 'count'],
        rows: [
          { type: '1/1', count: 1393 },
          { type: '1/2', count: 3530 },
          { type: '1/3', count: 2923 },
          { type: '1/4', count: 1723 },
          { type: '1/5', count: 3792 },
          { type: '1/6', count: 4593 },
        ],
      },
    };
  },
  methods: {
    async getDiseaseTypeCount() {
      const data = await this.$Http.getDiseaseTypeCount();
      this.statiticData.facilitiesCount = data[0].facilitiesCount;
    },
  },
  mounted: function () {},
};
</script>
