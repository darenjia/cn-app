<template>
  <div>
    <chart-bar :chartData="chartData"></chart-bar>
  </div>
</template>
<script>
import ChartBar from './ChartBar';
export default {
  props: ['chartData'],
  components: {
    ChartBar,
  },
};
</script>
