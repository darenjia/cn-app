<template>
  <div class="content">
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
</template>
<script>
export default {
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
  }
}
</style>
