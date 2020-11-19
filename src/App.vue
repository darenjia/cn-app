<template>
  <a-locale-provider :locale="zh_CN">
    <router-view></router-view>
  </a-locale-provider>
</template>

<script>
// eslint-disable-next-line camelcase
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
export default {
  name: 'app',
  data() {
    return {
      zh_CN,
    };
  },
};
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  // box-sizing: border-box;
  width: 100%;
  overflow: hidden;
}
</style>
