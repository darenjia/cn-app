<template>
  <div class="news-content">
    <list-card :title="'最新情况'">
      <transition-group name="list-complete" tag="ul">
        <li
          v-for="item in news"
          :key="item.id"
          class="list-complete-item"
          @click="click(item)"
          @mouseover="over"
          @mouseleave="leave"
        >
          <span class="time">{{ item.datetime }}</span
          ><span
            :class="[
              { statusFinish: item.statues === '维修' },
              { statusDiscover: item.statues !== '维修' },
              'type',
            ]"
            >{{ item.statues === '维修' ? '维修完成' : '发现问题' }}</span
          >
          <br />
          <span>{{
            item.facilityposition == null
              ? item.anjiandidian
              : item.facilityposition
          }}</span>
          <span class="type">{{
            item.patroltasktype === '网格'
              ? item.anjianleixing
              : item.facilitiesname + item.diseaseType
          }}</span>
        </li>
      </transition-group>
    </list-card>
  </div>
</template>
<script>
import ListCard from '../ListCard';
export default {
  data() {
    return {
      infos: [],
      temp: undefined,
      interval: undefined,
    };
  },
  components: {
    ListCard,
  },
  methods: {
    async getNewestInfo() {
      const data = await this.$Http.recentlyOfRepair();
      console.log('First_recentlyOfRepair', data);
      this.infos = data;
      this.temp = undefined;
      this.setScroll();
    },
    setScroll() {
      this.stopInterval();
      if (this.infos.length < 5) {
        return;
      }
      this.interval = setInterval(() => {
        if (this.infos.length > 0) {
          if (this.temp) {
            this.infos.push(this.temp);
          }
          this.temp = this.infos.shift();
        }
      }, 3000);
    },
    over() {
      this.stopInterval();
    },
    stopInterval() {
      if (this.interval) {
        clearInterval(this.interval);
      }
    },
    leave() {
      this.setScroll();
    },
    click(item) {
      console.log('click first item:', item);
      this.$store.commit('changeDiseaseDetail', item);
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
  beforeDestroy() {
    this.setScroll();
  },
};
</script>
<style lang="less" scoped>
.news-content {
  height: 252px;
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
