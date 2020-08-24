<template>
  <div>
    <div>
      <div
        :class="['sub-title', { active: currentActive === 0 }]"
        @click="choose(0)"
      >
        数据概览
      </div>
      <div
        :class="['sub-title', { active: currentActive === 1 }]"
        @click="choose(1)"
      >
        巡视轨迹
      </div>
      <div
        :class="['sub-title', { active: currentActive === 2 }]"
        @click="choose(2)"
      >
        地图界面
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
  padding: 28px;
  line-height: 18px;
  font-weight: 900;
  color: #32a7ab;
  display: inline-block;
  cursor: pointer;
  font-size: 20px;
  height: 90px;
}
.active {
  background-image: url(../../assets/img/selected_bg.png);
  background-size: 100% 100%;
  color: #00f6ff;
}
</style>
