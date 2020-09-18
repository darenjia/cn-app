<template>
  <div>
    <div class="extra-item">
      <a :class="['type', { active: mode === 0 }]" @click="changeCurrentDate(0)"
        >今天</a
      >
      <a :class="['type', { active: mode === 1 }]" @click="changeCurrentDate(1)"
        >本周</a
      >
      <a :class="['type', { active: mode === 2 }]" @click="changeCurrentDate(2)"
        >本月</a
      >
    </div>
    <a-range-picker
      :style="{ width: '200px' }"
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
  name: 'TimeView',
  data() {
    return {
      currentMode: 0,
      startDate: today,
      endDate: today,
    };
  },
  computed: {
    mode() {
      return this.currentMode;
    },
    dateValue() {
      return [this.startDate, this.endDate];
    },
  },
  methods: {
    changeCurrentDate(type) {
      this.currentMode = type;
      if (type === 0) {
        this.startDate = this.endDate = today;
      } else if (type === 1) {
        this.startDate = moment().weekday(0);
        this.endDate = moment().weekday(6);
      } else if (type === 2) {
        this.startDate = moment().startOf('month');
        this.endDate = moment().endOf('month');
      }
      this.dateHasChange();
    },
    dateChange(dates) {
      this.currentMode = 3;
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
      this.$emit('dateRangeChanged', date);
    },
  },
};
</script>
<style lang="less" scoped>
.extra-item {
  display: inline-block;
  margin-right: 20px;
  margin-left: 12px;
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
