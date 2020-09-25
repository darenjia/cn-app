<template>
  <div class="news-content">
    <list-card :title="'最新情况'">
      <transition-group name="list-complete" tag="ul">
        <li
          v-for="item in news"
          :key="item.patrolPointGuid"
          class="list-complete-item"
          @click="click(item)"
          @mouseover="over"
          @mouseleave="leave"
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
    </list-card>
  </div>
</template>
<script>
import ListCard from '../ListCard';
let temp;
let interval;
export default {
  data() {
    return {
      infos: [],
    };
  },
  components: {
    ListCard,
  },
  methods: {
    async getNewestInfo() {
      const data = await this.$Http.recentlyOfRepair();
      this.infos = data;
      temp = undefined;
    },
    setScroll() {
      if (interval) {
        clearInterval(interval);
      }
      interval = setInterval(() => {
        if (this.infos.length > 0) {
          if (temp) {
            this.infos.push(temp);
          }
          temp = this.infos.shift();
        }
      }, 3000);
    },
    over() {
      if (interval) {
        clearInterval(interval);
      }
    },
    leave() {
      this.setScroll();
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
    this.setScroll();
  },
};
</script>
<style lang="less" scoped>
.news-content {
  height: 250px;
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
.statusFinish {
  color: #83be8b;
}
.statusDiscover {
  color: #027fff;
}
</style>
