<template>
  <div id="pieTable">
    <div id="pie_table"></div>
  </div>
</template>
<script>
import { Pie } from "@antv/g2plot";
const data = [
  {
    type: "分类一",
    value: 27,
  },
  {
    type: "分类二",
    value: 25,
  },
  {
    type: "分类三",
    value: 18,
  },
  {
    type: "分类四",
    value: 15,
  },
  {
    type: "分类五",
    value: 10,
  },
  {
    type: "其它",
    value: 5,
  },
];

export default {
  name: "pieTable",
  data() {
    return {
      tableData: data,
    };
  },
  mounted: function () {
    const piePlot = new Pie("pie_table", {
      forceFit: true,
     height:250,
      radius: 0.8,
      title: {
        visible: true,
        text: "基础条形图",
      },
      data,
      angleField: "value",
      colorField: "type",
      label: {
        visible: true,
        type: "inner",
      },
    });

    piePlot.render();
  },
};
</script>
<style scoped></style>
