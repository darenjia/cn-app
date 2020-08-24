<template>
  <div>
    <ve-pie
      :data="chartData"
      :settings="chartSettings"
      :extend="chartExtend"
      :loading="loading"
      height="250px"
      :dataEmpty="dataEmpty"
    ></ve-pie>
  </div>
</template>
<script>
import Mixins from '../../plugins/mixins';
export default {
  mixins: [Mixins],
  props: ['dataset'],
  calcHeightSuccess: function () {
    console.log(this.componentHeight);
  },
  calcHeight: true,
  data() {
    return {
      showLegend: false,
      loading: true,
      dataEmpty: false,
      chartExtend: {
        legend: {
          show: false,
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
  computed: {
    chartHeight() {
      return this.componentHeight + 'px';
    },
  },
  watch: {
    dataset: function (newData) {
      this.chartData.rows = newData;
    },
  },
  methods: {
    async getDiseaseTypeCount() {
      const data = await this.$Http.getFacilitiesDetailTypeCount({
        params: {
          type: '道路',
        },
      });
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
    // this.getDiseaseTypeCount();
  },
};
</script>
