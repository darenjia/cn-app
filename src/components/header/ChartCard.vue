<template>
  <div class="chart-card">
    <div class="chart-card-header">
      <div class="meta">
        <div class="chart-card-title">{{ title }}</div>
        <span class="chart-card-action">
          <slot name="action"></slot>
        </span>
      </div>
    </div>
    <div class="chart-card-content">
      <div class="statistic-content">
        <div class="total">
          <span class="statistic-number">{{ total }}</span>
        </div>
        <div class="other">
          <div class="statistic-number1"><slot name="ext1"></slot></div>
          <div class="statistic-number2"><slot name="ext2"></slot></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChartCard',
  props: ['title', 'total', 'loading'],
};
</script>

<style scoped lang="less">
.chart-card {
  position: relative;
  margin: 10px;
  padding: 20px 40px;
  width: auto;
  background-image: url(../../assets/img/unselected_white.png);
  background-size: 100% 100%;
}
.chart-card:hover {
  background-image: url(../../assets/img/selected_white.png);
}
.chart-card-header {
  position: relative;
  overflow: hidden;
  width: 100%;
}
.chart-card-header .meta {
  position: relative;
  overflow: hidden;
  width: 100%;
  color: #ffffff;
  font-size: 14px;
  line-height: 22px;
  .chart-card-title {
    text-align: center;
    font-size: 18px;
    padding: 6px 0px;
    font-weight: 600;
  }
}
.chart-card-action {
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
}
.total {
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
  margin-top: 4px;
  margin-bottom: 0;
  font-size: 30px;
  line-height: 38px;
  height: 38px;
  color: #fff;
  display: inline-block;
}
.chart-card-footer {
  border-top: 1px solid #808080;
  padding-top: 9px;
  margin-top: 8px;
}
.chart-card-content {
  margin-bottom: 12px;
  position: relative;
  // height: 46px;
  width: 100%;
  .statistic-content {
    text-align: center;
  }
}
.chart-card-content .content-fix {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  color: #fff;
}
.other {
  font-size: 18px;
  color: #fff;
  display: inline-block;
  padding: 0px 8px;
  text-align: left;
}
</style>
