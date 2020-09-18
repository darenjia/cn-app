<template>
  <div class="news-content">
    <h3>最新情况</h3>
    <transition-group name="list-complete" tag="ul">
      <li
        v-for="item in news"
        :key="item.patrolPointGuid"
        class="list-complete-item"
        @click="click(item)"
      >
        <span class="time">{{ item.dateTime }}</span
        ><span
          :class="[
            { statusFinish: item.statues === '维修' },
            { statusDiscover: item.statues !== '维修' },
            'type',
          ]"
          >{{ item.statues === '维修' ? '维修完成' : '发现问题' }}</span
        >
        <br />
        <span>{{ item.address }}</span>
        <span class="type"
          >{{ item.diseaseType }}&nbsp;{{ item.diseasename }}</span
        >
      </li>
    </transition-group>
  </div>
</template>
<script>
let temp;
let interval;
export default {
  data() {
    return {
      infos: [],
    };
  },
  methods: {
    async getNewestInfo() {
      const data = await this.$Http.recentlyOfRepair();
      this.infos = data;
      this.setScroll();
    },
    setScroll() {
      if (interval) {
        clearInterval(interval);
      }
      interval = setInterval(() => {
        if (temp) {
          this.infos.push(temp);
        }
        temp = this.infos.shift();
      }, 3000);
    },
    click(item) {
      this.$store.commit('changeCurrentPointLocation', item.patrolPointGuid);
    },
  },
  computed: {
    news() {
      return this.infos;
    },
  },
  mounted() {
    this.getNewestInfo();
  },
};
</script>
<style lang="less" scoped>
.news-content {
  height: 250px;
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
      .time {
        color: #027fff;
        font-weight: 700;
      }
    }
    .type {
      float: right;
    }
  }
}
.statusFinish {
  color: #83be8b;
}
.statusDiscover {
  color: #027fff;
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
  transform: translateY(-10px);
}
// .list-complete-enter {
// }
.list-complete-move {
  transition: transform 1s;
}
.list-complete-leave-active {
  position: absolute;
}
/deep/ .ant-timeline {
  color: #fff;
}
</style>
