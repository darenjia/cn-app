<template>
  <div class="chart">
    <div class="title">{{ title }}<span class="detail">更多详情</span></div>
    <div class="chart-content">
      <v-chart :forceFit="true" :height="height" :data="data" :scale="scale">
        <v-tooltip :showTitle="false" dataKey="item*percent" />
        <v-axis v-if="showAxis" />
        <v-legend dataKey="item" :show="showAxis" />
        <v-pie position="percent" color="item" :v-style="pieStyle" />
        <v-coord type="theta" :innerRadius="0.3" :radius="0.95" />
      </v-chart>
    </div>
  </div>
</template>
<script>
const DataSet = require('@antv/data-set');

const sourceData = [
  { item: '事例一', count: 40 },
  { item: '事例二', count: 21 },
  { item: '事例三', count: 17 },
  { item: '事例四', count: 13 },
  { item: '事例五', count: 9 },
];

const scale = [
  {
    dataKey: 'percent',
    min: 0,
    formatter: '.0%',
  },
];

const dv = new DataSet.View().source(sourceData);
dv.transform({
  type: 'percent',
  field: 'count',
  dimension: 'item',
  as: 'percent',
});
const data = dv.rows;

export default {
  props: {
    title: {},
  },
  data() {
    return {
      showAxis: false,
      data,
      scale,
      height: 400,
      pieStyle: {
        stroke: '#fff',
        lineWidth: 1,
      },
      labelConfig: [
        'percent',
        {
          offset: -10,
          textStyle: {
            rotate: 0,
            textAlign: 'center',
          },
          //   formatter: (val, item) => {
          //     return item.point.item + ': ' + val;
          //   },
        },
      ],
    };
  },
};
</script>
<style lang="less" scoped>
@textColor: #ffffff;
.detail {
  cursor: pointer;
  position: absolute;
  top: 12px;
  right: 20px;
  color: @textColor;
  font-size: 13px;
  display: none;
}
</style>
