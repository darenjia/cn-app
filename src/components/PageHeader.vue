<template>
  <div id="pageHeader">
    <div class="header">
      <div class="bg_header">
        <div class="header_nav fl t_title">
          长宁区市政设施展示平台
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "pageHeader",
  data() {
    return {};
  },
};
</script>
<style scoped>
.header {
  width: 100%;
  height: 80px;
}
.bg_header {
  width: 100%;
  height: 80px;
  background: url(../assets/img/head_bg.png) no-repeat;
  background-size: 100% 100%;
}
.t_title {
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 2.5em;
  line-height: 80px;
  color: rgb(255, 255, 255);
}
</style>
