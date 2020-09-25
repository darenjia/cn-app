<template>
  <div class="list-content">
    <div class="content-stistic">
      <span class="stistic-type">人行道面积<i>2154</i>平方米</span
      ><span class="stistic-type">车行道面积<i>1545</i>平方米</span>
    </div>
    <a-row>
      <a-col :span="8"><div class="plan-top-title">道路名称</div></a-col>
      <a-col :span="8"><div class="plan-top-title">路段</div></a-col>
      <a-col :span="8"><div class="plan-top-title">完成状态</div></a-col>
    </a-row>
    <transition-group name="list-complete" tag="ul">
      <li
        v-for="(item, index) in list"
        :key="index"
        :class="[
          'list-complete-item',
          { 'list-obb': index % 2 !== 0, 'list-even': index % 2 === 0 },
        ]"
        @click="click(item)"
        @mouseover="over"
        @mouseleave="leave"
      >
        <a-row>
          <a-col :span="8"
            ><div class="plan-top-title">{{ item.road }}</div></a-col
          >
          <a-col :span="8"
            ><div class="plan-top-title">{{ item.luduan }}</div></a-col
          >
          <a-col :span="8"
            ><div class="plan-top-title">
              {{ item.style === 0 ? '进行中' : '已完成' }}
            </div></a-col
          >
        </a-row>
      </li>
    </transition-group>
  </div>
</template>
<script>
export default {
  props: ['listData'],
  computed: {
    list() {
      return this.listData;
    },
  },
  methods: {
    click(item) {},
    over() {},
    leave() {},
  },
};
</script>
<style lang="less" scoped>
.list-content {
  height: 100%;
  overflow: hidden;
  width: 100%;
  h3 {
    color: #f9bb0b;
    font-size: 16px;
  }
  ul {
    padding-inline-start: 0px;
  }
}
.list-obb {
  background-color: thistle;
}
.list-even {
  background-color: turquoise;
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
.content-stistic {
  background-color: tomato;
  line-height: 40px;
  height: 40px;
  .stistic-type {
    width: 50%;
    display: inline-block;
    text-align: center;
    padding: 2px;
  }
  .stistic-type2 {
    width: 50%;
  }
}
.plan-top-title {
  text-align: center;
  line-height: 36px;
}
</style>
