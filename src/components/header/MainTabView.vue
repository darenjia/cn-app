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
        网格热线
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isActive: this.$store.state.tabMode,
    };
  },
  methods: {
    choose(type) {
      this.isActive = type;
      this.$store.commit('changeTabMode', type);
    },
  },
  watch: {
    isActive: function (value, oldValue) {
      console.log(value);
      let name;
      if (value === 0) {
        name = 'first';
      } else if (value === 1) {
        name = 'second';
      } else if (value === 2) {
        name = 'third';
      } else if (value === 3) {
        name = 'fourth';
      } else if (value === 4) {
        name = 'fifth';
      }
      this.$router.replace(name);
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
