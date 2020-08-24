<template>
  <div id="pageHeader">
    <div class="header">
      <div class="bg_header">
        <div class="header_nav fl t_title">
          <img src="../../assets/img/title_name.png" class="title" />
        </div>
        <div class="tabs">
          <main-tab-view></main-tab-view>
        </div>
        <div class="clock">
          <time-view></time-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MainTabView from './MainTabView';
import TimeView from './TimeView';
export default {
  name: 'pageHeader',
  data() {
    return {};
  },
  components: {
    MainTabView,
    TimeView,
  },
};
</script>
<style scoped>
.header {
  width: 100%;
}
.bg_header {
  width: 100%;
  height: 86px;
  background: #2a2a2ad6 url(../../assets/img/navi_bg.png) no-repeat;
  background-size: 100% 100%;
}
.t_title {
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 2.5em;
  line-height: 58px;
  color: rgb(255, 255, 255);
}
.title {
  width: 20%;
}
.tabs {
  margin-left: 10px;
  position: absolute;
  top: 3px;
  left: 0px;
}
.clock {
  position: absolute;
  top: 6px;
  right: 10px;
}
</style>
