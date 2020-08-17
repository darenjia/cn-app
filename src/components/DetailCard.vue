<template>
  <div class="filter-bg">
    <div class="title-style">
      {{ title
      }}<span class="close" @click="closePage"
        ><a-icon type="close" style="color: #fff;"
      /></span>
    </div>
    <a-divider />
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'DetailCard',
  data() {
    return {
      titles: ['设施详细信息', '病害详细信息', '维修详细信息', '人员详细信息'],
    };
  },
  computed: {
    title: function () {
      return this.titles[this.$store.state.currentShow - 1];
    },
  },
  methods: {
    closePage() {
      this.$router.go(-1);
      this.$store.commit('changeCurrentShow', -1);
    },
  },
};
</script>
<style lang="less" scoped>
.title-style {
  line-height: 40px;
  padding: 5px 16px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  .close {
    position: absolute;
    right: 16px;
    top: 8px;
    cursor: pointer;
  }
}
.ant-divider-horizontal {
  margin: 5px 0px !important;
}
</style>
