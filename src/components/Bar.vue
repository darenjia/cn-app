<template>
  <div class="progress-box">
    <a href="javascript:;" @click="click">
      <div class="progress-title">
        <span :style="{ color: fontColor }">{{ indexNum }}</span
        ><span>{{ name }}</span
        ><span>{{ count }}</span>
      </div>
      <div class="progress">
        <div
          class="progress-bar"
          :style="{ width: width, backgroundColor: color }"
        ></div>
      </div>
    </a>
  </div>
</template>
<script>
export default {
  props: ['barData', 'color', 'index', 'fontColor'],
  data() {
    return {};
  },
  computed: {
    name() {
      return this.barData.name;
    },
    indexNum() {
      return '0' + (this.index + 1);
    },
    count() {
      return this.barData.value;
    },
    width() {
      return this.barData.count * 100 + '%';
    },
  },
  methods: {
    click() {
      console.log('??');
      this.$emit('clickItem', this.name);
    },
  },
};
</script>
<style lang="less" scoped>
.progress-box {
  a {
    display: block;
    padding: 4px;
  }
  a:hover {
    background-color: rgba(90, 90, 90, 0.438);
  }
}
.progress-title {
  color: #fff;
  font-size: 12px;
  margin: 6px 0px;
  span {
    margin-right: 10px;
  }
  span:nth-child(1) {
    font-family: 'HY';
  }
}
.progress {
  height: auto;
  margin-bottom: 0px;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25),
    0 1px rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25),
    0 1px rgba(255, 255, 255, 0.08);
}

.progress-bar {
  background-color: antiquewhite;
  position: relative;
  height: 6px;
  border-radius: 10px;
  -webkit-transition: 0.4s linear;
  -moz-transition: 0.4s linear;
  -o-transition: 0.4s linear;
  transition: 0.4s linear;
  -webkit-transition-property: width, background-color;
  -moz-transition-property: width, background-color;
  -o-transition-property: width, background-color;
  transition-property: width, background-color;
  -webkit-box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.25),
    inset 0 1px rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.25),
    inset 0 1px rgba(255, 255, 255, 0.1);
}
.progress-bar:before,
.progress-bar:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.progress-bar:before {
  bottom: 0;
  background: url('../assets/img/stripes.png') 0 0 repeat;
  border-radius: 4px 4px 0 0;
}
.progress-bar:after {
  z-index: 2;
  bottom: 0%;
  border-radius: 4px;
  background-image: -webkit-linear-gradient(
    top,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.05)
  );
  background-image: -moz-linear-gradient(
    top,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.05)
  );
  background-image: -o-linear-gradient(
    top,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.05)
  );
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.05)
  );
}
</style>
