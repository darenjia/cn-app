<template>
  <div>
    <div class="extra-item">
      <a :class="['type', { active: mode === 2 }]" @click="changeCurrentDate(2)"
        >本年</a
      >
      <a :class="['type', { active: mode === 1 }]" @click="changeCurrentDate(1)"
        >本月</a
      >
      <a :class="['type', { active: mode === 0 }]" @click="changeCurrentDate(0)"
        >今天</a
      >
    </div>
    <a-range-picker
      :style="{ width: '190px' }"
      size="small"
      :value="dateValue"
      @change="dateChange"
    ></a-range-picker>
  </div>
</template>
<script>
import moment from 'moment';
moment.updateLocale('zh-cn', { week: { dow: 1 } });
// const dateFormat = 'YYYY-MM-DD';
const today = moment();
export default {
  props: ['currentMode'],
  name: 'TimeView',
  data() {
    return {
      startDate: today,
      endDate: today,
      dataMode: this.currentMode,
    };
  },
  computed: {
    mode() {
      return this.dataMode;
    },
    dateValue() {
      return [this.startDate, this.endDate];
    },
  },
  mounted() {
    this.changeCurrentDate(this.currentMode);
  },
  methods: {
    changeCurrentDate(type) {
      if (type === 0) {
        this.startDate = this.endDate = today;
      } else if (type === 1) {
        this.startDate = moment().startOf('month');
        this.endDate = moment().endOf('month');
      } else if (type === 2) {
        this.startDate = moment().startOf('year');
        // this.endDate = moment().endOf('year');
        this.endDate = today;
      }
      this.dataMode = type;
      this.dateHasChange();
    },
    dateChange(dates) {
      this.dataMode = 3;
      this.startDate = dates[0];
      this.endDate = dates[1];
      console.log('changeDate');
      this.dateHasChange();
    },
    dateHasChange() {
      const value = this.dateValue;
      const date = {
        startTime: value[0].format('YYYY-MM-DD'),
        endTime: value[1].format('YYYY-MM-DD'),
      };
      this.$store.commit('changeDateRange', date);
    },
  },
};
</script>
<style lang="less" scoped>
.extra-item {
  display: inline-block;
  margin-right: 16px;
  margin-left: 4px;
  a:not(:first-child) {
    margin-left: 20px;
  }
}
.type {
  color: #eee;
}
.active {
  color: #48e3f7;
}
</style>
