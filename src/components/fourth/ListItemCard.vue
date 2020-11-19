<template>
  <div class="list-content">
    <transition-group name="list-complete" tag="ul">
      <li
        v-for="item in list"
        :key="item.serialnum"
        class="list-complete-item"
        @click="click(item)"
        @mouseover="over"
        @mouseleave="leave"
      >
        <span class="time">{{ item.anjianleixing }}</span
        ><span class="type">{{ item.datetime }}</span>
        <br />
        <span>{{ item.anjiandidian }}</span>
        <span class="type">{{ item.xiangmubu }}</span>
      </li>
    </transition-group>
  </div>
</template>
<script>
export default {
  props: ['listData'],
  name: 'GridList',
  data() {
    return {
      interval: undefined,
      temp: undefined,
    };
  },
  computed: {
    list() {
      return this.listData;
    },
  },
  methods: {
    stopInterval() {
      if (this.temp) {
        this.temp = undefined;
      }
      if (this.interval) {
        clearInterval(this.interval);
      }
    },
    startInterval() {
      this.stopInterval();
      this.interval = setInterval(() => {
        if (this.listData && this.listData.length > 0) {
          if (this.temp) {
            this.listData.push(this.temp);
          }
          this.temp = this.listData.shift();
        }
      }, 3000);
    },
    click(item) {
      console.log('click');
      this.$emit('clickItem', item);
    },
    over() {
      this.stopInterval();
    },
    leave() {
      this.startInterval();
    },
  },
  beforeDestroy() {
    this.stopInterval();
  },
};
</script>
<style lang="less" scoped>
.list-content {
  height: 90%;
  overflow: hidden;
  width: 100%;
  font-size: 12px;
  ul {
    color: #eee;
    padding-inline-start: 0px;
    position: relative;
    li {
      font-size: 12px;
      cursor: pointer;
      padding: 4px 20px 4px 10px;
      .time {
        color: #027fff;
        font-weight: 700;
      }
    }
    li:hover {
      transition: all 0.3s linear;
      transform: scale(1.05);
    }
    .type {
      float: right;
    }
  }
}

.list-even {
  // background-color: rgb(26, 56, 53);
  background-color: #2a2a2a;
}
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  width: 100%;
  list-style: none;
}
.list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-10px) scaleX(0.8);
}
.list-complete-enter {
  transform: scale(1.08);
}
.list-complete-move {
  transition: transform 1s;
}
.list-complete-leave-active {
  position: absolute;
}
.stistic-type {
  width: 50%;
  display: inline-block;
  text-align: center;
  padding: 2px;
  font-size: 14px;
}
.stistic-type2 {
  width: 50%;
}
.plan-top-title {
  text-align: center;
  line-height: 30px;
  color: #04b3b3;
}
.plan-top-text {
  text-align: center;
  line-height: 30px;
  color: #04b3b3;
}
</style>
