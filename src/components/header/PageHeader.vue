<template>
  <div id="pageHeader">
    <div class="header">
      <div class="bg_header">
        <div class="header_nav fl t_title">
          <!-- <img src="../../assets/img/长宁区市政设施养护展示平台.png" class="title" /> -->
          <span class="title-txt">长宁区市政署市政设施养护管理平台</span>
        </div>
        <div class="tabs">
          <main-tab-view></main-tab-view>
        </div>
        <div class="clock">
          <time-view></time-view>
        </div>
        <a class="link" href="http://180.167.216.66:18886/CNSZ/">进入系统</a>
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
<style lang="less" scoped>
.header {
  width: 100%;
}
.bg_header {
  width: 100%;
  height: 86px;
  background: #2a2a2a url('../../assets/img/navi_bg.png') no-repeat;
  background-size: 100% 100%;
}
.t_title {
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 2.5em;
  line-height: 58px;
  font-weight: 900;
  color: #48e3f7;
}
.title {
  width: 20%;
}
.tabs {
  margin-left: 10px;
  position: absolute;
  top: 15px;
  left: 0px;
}
.clock {
  position: absolute;
  top: 6px;
  right: 44px;
  // display: none;
}
.link {
  position: absolute;
  top: 15px;
  right: 5px;
  padding: 18px;
  line-height: 16px;
  font-weight: 900;
  color: #32a7ab;
  display: inline-block;
  font-size: 20px;
  height: 56px;
  display: none;
}
</style>
