<template>
  <div class="list-content">
    <transition-group name="list-complete" tag="ul">
      <li
        v-for="(item, index) in list"
        :key="index"
        :class="[
          'list-complete-item',
          {
            'list-state-waiting': item.fstatues === '未维修',
            'list-state-running': item.fstatues === '正在维修',
            'list-state-finished': item.fstatues === '合格',
          },
        ]"
        @click="click(item)"
        @mouseover="over"
        @mouseleave="leave"
      >
        <span class="time">{{
          isType1 ? item.anjianleixing : item.diseaseType
        }}</span
        ><span class="type">{{ item.datetime }}</span>
        <br />
        <span>{{ isType1 ? item.anjiandidian : item.facilityposition }}</span>
        <span class="type">{{
          isType1 ? item.xiangmubu : item.facilitiesname
        }}</span>
      </li>
    </transition-group>
  </div>
</template>
<script>
export default {
  props: ['listData', 'type'],
  computed: {
    list() {
      return this.listData;
    },
    isType1() {
      return this.type === 1;
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
    color: #eee;
    padding-inline-start: 0px;
    position: relative;
    li {
      font-size: 12px;
      cursor: pointer;
      padding: 4px 20px 4px 10px;
      margin: 4px 0px;
      position: relative;
      border: 1px solid transparent;
      margin-bottom: -1px;
      .time {
        color: #027fff;
        font-weight: 700;
      }
    }
    li:hover {
      background-color: #030201;
    }
    .type {
      float: right;
    }
  }
}
.list-content {
  display: inline-block;
}
.list-head-divider {
  height: 100%;
  width: 2px;
  position: absolute;
  top: 0px;
  left: 2px;
}
.list-obb {
  border-left: 3px solid #1db3df !important;
}
.list-even {
  border-left: 3px solid #fdd775 !important;
}
.list-state-running {
  border-left: 3px solid #1db3df !important;
}
.list-state-waiting {
  border-left: 3px solid #fdd775 !important;
}
.list-state-finished {
  border-left: 3px solid #90b479 !important;
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
