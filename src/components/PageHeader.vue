<template>
  <div id="pageHeader">
    <div class="header">
      <div class="bg_header">
        <div class="header_nav fl t_title">
          <img src="../assets/img/title_name.png" class="title" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'pageHeader',
  data() {
    return {};
  },
};
</script>
<style scoped>
.header {
  width: 100%;
  height: 160px;
}
.bg_header {
  width: 100%;
  height: 165px;
  background: #000000 url(../assets/img/navi_bg.png) no-repeat;
  background-size: 100% 100%;
}
.t_title {
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 2.5em;
  line-height: 140px;
  color: rgb(255, 255, 255);
}
.title {
  width: 20%;
}
</style>
