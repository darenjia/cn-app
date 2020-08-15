<template>
  <div id="barTable">
    <div id="bar_table"></div>
  </div>
</template>
<script>
import { Bar } from "@antv/g2plot";
const data = [
  { 地区: "华东", 销售额: 4684506.442 },
  { 地区: "中南", 销售额: 4137415.0929999948 },
  { 地区: "东北", 销售额: 2681567.469000001 },
  { 地区: "华北", 销售额: 2447301.017000004 },
  { 地区: "西南", 销售额: 1303124.508000002 },
  { 地区: "西北", 销售额: 815039.5959999998 },
];

export default {
  name: "barTable",
  data() {
    return {
      tableData: data,
    };
  },
  mounted: function () {
    const barPlot = new Bar("bar_table", {
      title: {
        visible: true,
        text: "基础条形图",
      },
      forceFit: true,
      height:250,
      data,
      xField: "销售额",
      yField: "地区",
      xAxis: {
        formatter: (v) => Math.round(v / 10000) + "万",
      },
    });

    barPlot.render();
  },
};
</script>
<style scoped></style>
