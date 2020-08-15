<template>
  <div>
    <div id="container"></div>
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
  mounted: function () {
    const piePlot = new Pie("container", {
      forceFit: true,
      radius: 0.8,
      title: {
        visible: true,
        text: "设施分类统计图",
        style: {
          fill: "#fff",
        },
      },
      data,
      angleField: "value",
      colorField: "type",
      label: {
        visible: true,
        type: "inner",
      },
      legend: {
          visible:true,
        position: "bottom-center",
        text: {
          style: {
            fill: "#fff",
          },
        },
      },
    });

    piePlot.render();
  },
};
</script>
