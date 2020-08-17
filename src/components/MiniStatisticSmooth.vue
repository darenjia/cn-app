<template>
  <div class="chart">
    <div class="title">
      {{ title }}<span class="detail"><a @click="showDetail(3)">详情</a></span>
    </div>
    <div class="chart-content">
      <v-chart
        :force-fit="true"
        :height="height"
        :data="data"
        :padding="[36, 5, 18, 5]"
      >
        <v-tooltip />
        <v-smooth-area position="x*y" />
      </v-chart>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns';

const data = [];
const beginDay = new Date().getTime();

const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
for (let i = 0; i < fakeY.length; i += 1) {
  data.push({
    x: format(new Date(beginDay + 1000 * 60 * 60 * 24 * i), 'yyyy-MM-dd'),
    y: fakeY[i],
  });
}

const tooltip = [
  'x*y',
  (x, y) => ({
    name: x,
    value: y,
  }),
];

const scale = [
  {
    dataKey: 'x',
    min: 2,
  },
  {
    dataKey: 'y',
    title: '时间',
    min: 1,
    max: 22,
  },
];

export default {
  props: {
    title: {},
  },
  name: 'MiniStatisticTwo',
  data() {
    return {
      data,
      scale,
      tooltip,
      height: 200,
    };
  },
  methods: {
    showDetail(id) {
      this.$router.push('/' + id).catch(err => {
        console.log(err);
      });
      this.$store.commit('changeCurrentShow', id);
    },
  },
};
</script>

<style lang="less" scoped>
@textColor: #ffffff;
.chart {
  padding: 10px;
  width: 100%;
  position: relative;
  .title {
    font-size: 18px;
    font-weight: 500;
    color: @textColor;
    .detail {
      cursor: pointer;
      position: absolute;
      top: 12px;
      right: 20px;
      color: @textColor;
      font-size: 12px;
    }
  }
}
</style>
