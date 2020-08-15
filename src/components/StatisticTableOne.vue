<template>
  <div id="canvas"></div>
</template>
<script>
import { Line } from "@antv/g2plot";
const data = [
  { year: "1991", value: 3 },
  { year: "1992", value: 4 },
  { year: "1993", value: 3.5 },
  { year: "1994", value: 5 },
  { year: "1995", value: 4.9 },
  { year: "1996", value: 6 },
  { year: "1997", value: 7 },
  { year: "1998", value: 9 },
  { year: "1999", value: 13 },
];

export default {
  data() {
    return {
      tableData: data,
    };
  },
  mounted: function () {
    const linePlot = new Line("canvas", {
      title: {
        visible: true,
        text: "病害类型统计",
      },
      description: {
        visible: false,
        text: "病害类型统计",
      },
      forceFit: true,
    height:250,
      data,
      xField: "year",
      yField: "value",
      color: "#FE740C",
      point: {
        visible: true,
        size: 5,
        color: "white",
        style: {
          stroke: "#FE740C",
          lineWidth: 2,
          fillOpacity: 0.6,
        },
      },
      yAxis: {
        formatter: (v) => {
          return v + "k";
        },
      },
      label: {
        visible: true,
      },
    });
    linePlot.render();
    // const e = document.createEvent("Event");
    // e.initEvent("resize", true, true);
    // window.dispatchEvent(e);
  },
};
</script>
<style scoped></style>
