<template>
  <div class="content">
    <div v-if="type === 0">
      <span
        ><img src="../assets/img/point3.png" class="image" /><i class="des"
          >维修中</i
        ></span
      >
      <span
        ><img src="../assets/img/point4.png" class="image" /><i class="des"
          >已维修</i
        ></span
      >
      <span
        ><img src="../assets/img/Marker8.png" class="image" /><i class="des"
          >待维修</i
        ></span
      >
    </div>
    <div v-if="type === 1">
      <span><i class="line line-finished" /><i class="des">已完成</i></span>
      <span><i class="line line-running" /><i class="des">进行中</i></span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['type'],
  name: 'LegendCard',
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  color: #fff;
  position: absolute;
  left: -100px;
  bottom: 0px;
  span {
    display: block;
    line-height: 24px;
    .image {
      width: 12px;
      height: 12px;
    }
    .des {
      margin-left: 10px;
      font-style: normal;
      font-size: 12px;
    }
    .line {
      display: inline-block;
      width: 20px;
      height: 2px;
      margin-bottom: 4px;
    }
    .line-finished {
      background-color: #ff6666;
    }
    .line-running {
      background-color: #ffd11a;
    }
  }
}
</style>
