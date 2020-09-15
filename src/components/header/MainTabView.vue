<template>
  <div>
    <div>
      <div
        :class="['sub-title', { active: currentActive === 0 }]"
        @click="choose(0)"
      >
        首页
      </div>
      <div
        :class="['sub-title', { active: currentActive === 1 }]"
        @click="choose(1)"
      >
        道路养护
      </div>
      <div
        :class="['sub-title', { active: currentActive === 2 }]"
        @click="choose(2)"
      >
        下水道养护
      </div>
      <div
        :class="['sub-title', { active: currentActive === 3 }]"
        @click="choose(3)"
      >
        地图界面
      </div>
      <div
        :class="['sub-title', { active: currentActive === 4 }]"
        @click="choose(4)"
      >
        网格热线平台
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isActive: 0,
    };
  },
  methods: {
    choose(type) {
      this.isActive = type;
      this.$store.commit('changeTabMode', type);
    },
  },
  computed: {
    currentActive() {
      return this.isActive;
    },
  },
};
</script>
<style lang="less" scoped>
.sub-title {
  padding: 18px;
  line-height: 16px;
  font-weight: 900;
  color: #32a7ab;
  display: inline-block;
  cursor: pointer;
  font-size: 20px;
  height: 56px;
}
.active {
  background-image: url(../../assets/img/selected_bg1.png);
  background-size: 100% 100%;
  color: #00f6ff;
}
.hide {
  display: none;
}
</style>
