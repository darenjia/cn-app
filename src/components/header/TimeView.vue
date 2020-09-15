<template>
  <div class="clock-time">
    <span class="date">{{ date }}</span>
    <span class="time">{{ time }}</span>
  </div>
</template>
<script>
const week = [
  '星期天',
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
];
export default {
  name: 'clock',
  data() {
    return {
      time: '',
      date: '',
    };
  },
  mounted() {
    setInterval(this.updateTime, 1000);
  },
  methods: {
    updateTime() {
      var cd = new Date();
      this.time =
        this.zeroPadding(cd.getHours(), 2) +
        ':' +
        this.zeroPadding(cd.getMinutes(), 2) +
        ':' +
        this.zeroPadding(cd.getSeconds(), 2);
      this.date =
        this.zeroPadding(cd.getFullYear(), 4) +
        '-' +
        this.zeroPadding(cd.getMonth() + 1, 2) +
        '-' +
        this.zeroPadding(cd.getDate(), 2) +
        ' ' +
        week[cd.getDay()];
    },
    zeroPadding(num, digit) {
      var zero = '';
      for (var i = 0; i < digit; i++) {
        zero += '0';
      }
      return (zero + num).slice(-digit);
    },
  },
};
</script>
<style lang="less" scoped>
p {
  margin: 0;
  padding: 0;
}

.clock-time {
  // font-family: 'Share Tech Mono', monospace;
  color: #ffffff;
  text-align: right;
  color: #daf6ff;
  line-height: 80px;
  font-weight: 600;
  // text-shadow: 0 0 10px #08dee6, 0 0 10px rgba(10, 175, 230, 0);
  .time {
    letter-spacing: 0.05em;
    font-size: 18px;
    padding: 5px 0;
  }
  .date {
    letter-spacing: 0.1em;
    font-size: 18px;
  }
}
</style>
