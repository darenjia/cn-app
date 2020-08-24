export default {
  data() {
    return {
      componentHeight: 0,
      componentWidth: 0,
    };
  },
  methods: {
    calcHeight() {
      if (!this.$options.calcHeight) {
        return;
      }
      this.timer = setInterval(() => {
        if (
          this.$el &&
          this.$el.getClientRects &&
          this.$el.getClientRects() &&
          this.$el.getClientRects()[0]
        ) {
          const h = this.$el.getClientRects()[0].height;
          if (!isNaN(h)) {
            clearInterval(this.timer);
            this.componentHeight = h;
            this.componentWidth = this.$el.getClientRects()[0].width;
            if (this.$options.calcHeightSuccess) {
              // 高度计算完成，执行回调
              this[this.$options.calcHeightSuccess]();
            }
          }
        }
      }, 10);
      // 5秒后还未获取到组件高度，则放弃
      this.timer2 = setTimeout(() => {
        clearInterval(this.timer);
      }, 5000);
    },
  },
  mounted: function () {
    // 根据组件是否配置此属性确定是否开始计算该组件的高度
    if (this.$options.calcHeight) {
      this.calcHeight();
      window.addEventListener('resize', this.calcHeight);
    }
  },
  // 当然，既然加了定时器了，在销毁组件时务必清掉未执行的任务
  beforeDestory() {
    clearInterval(this.timer);
    clearTimeout(this.timer2);
    window.removeEventListener('resize', this.calcHeight);
  },
};
