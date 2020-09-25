<template>
  <div class="filter-bg">
    <div class="page-content-detail">
      <div class="summary">
        <h3>案件数汇总</h3>
        <div>
          <ul>
            <li v-for="(item, index) in summaryData" :key="index">
              <span>{{ item.type }}</span>
              <span>{{ item.nums }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="news-content">
        <list-card :title="'最新案件'">
          <transition-group name="list-complete" tag="ul">
            <li
              v-for="item in newestTask"
              :key="item.patrolpointguid"
              class="list-complete-item"
              @click="click(item)"
              @mouseover="over"
              @mouseleave="leave"
            >
              <span class="time">{{ item.anjianleixing }}</span
              ><span>{{ item.createtime }}</span>
              <br />
              <span>{{ item.anjiandidian }}</span>
              <span class="type">{{ item.xiangmubu }}</span>
            </li>
          </transition-group>
        </list-card>
      </div>
      <div class="news-content">
        <list-card :title="'最新处置'">
          <transition-group name="list-complete" tag="ul">
            <li
              v-for="item in newestFinishedTask"
              :key="item.patrolpointguid"
              class="list-complete-item"
              @click="click(item)"
              @mouseover="over"
              @mouseleave="leave"
            >
              <span class="time">{{ item.anjianleixing }}</span
              ><span>{{ item.createtime }}</span>
              <br />
              <span>{{ item.anjiandidian }}</span>
              <span class="type">{{ item.xiangmubu }}</span>
            </li>
          </transition-group>
        </list-card>
      </div>
      <div class="news-content">
        <list-card :title="'逾期警告'">
          <transition-group name="list-complete" tag="ul">
            <li
              v-for="item in warningTask"
              :key="item.patrolpointguid"
              class="list-complete-item"
              @click="click(item)"
              @mouseover="over"
              @mouseleave="leave"
            >
              <span class="time">{{ item.anjianleixing }}</span
              ><span>{{ item.createtime }}</span>
              <br />
              <span>{{ item.anjiandidian }}</span>
              <span class="type">{{ item.xiangmubu }}</span>
            </li>
          </transition-group>
        </list-card>
      </div>
    </div>
  </div>
</template>
<script>
import listener from '../../plugins/mixins-listener';
import ListCard from '../ListCard';
let intervalNewestTask, intervalNewestFinished, intervalWarning;
let temp1, temp2, temp3;
export default {
  name: 'SecondRightPage',
  mixins: [listener],
  components: {
    ListCard,
  },
  data() {
    return {
      summary: [],
      newestTask: [],
      newestFinishedTask: [],
      warningTask: [],
    };
  },
  mounted() {
    this.updateData();
  },
  computed: {
    summaryData() {
      return this.summary;
    },
    newestTaskData() {
      return this.newestTask;
    },
    newestFinishedTaskData() {
      return this.newestFinishedTask;
    },
    warningTaskData() {
      return this.warningTask;
    },
  },
  methods: {
    async getGridSummary() {
      const data = await this.$Http.Grid_GetCaseCount();
      this.summary = data;
    },
    async getNewestTask() {
      const data = await this.$Http.Grid_GetNewCaseByDay();
      this.newestTask = data;
    },
    async getNewestFinishedTask() {
      const data = await this.$Http.Grid_GetNewFinallyByDay();
      this.newestTask = data;
    },
    async getWarningTask() {
      const data = await this.$Http.Grid_GetOverOfWarn();
      this.warningTask = data;
    },
    updateData() {
      console.log('refreshData', 'Grid');
      this.getGridSummary();
      this.getNewestTask();
      this.getNewestFinishedTask();
      this.getWarningTask();
    },
    setSummaryInterval() {
      if (intervalNewestTask) {
        clearInterval(intervalNewestTask);
      }
      intervalNewestTask = setInterval(() => {
        if (this.infos.length > 0) {
          if (temp1) {
            this.infos.push(temp1);
          }
          temp1 = this.infos.shift();
        }
      }, 3000);
    },
    setFinishedInterval() {
      if (intervalNewestFinished) {
        clearInterval(intervalNewestFinished);
      }
      intervalNewestFinished = setInterval(() => {
        if (this.infos.length > 0) {
          if (temp2) {
            this.infos.push(temp2);
          }
          temp2 = this.infos.shift();
        }
      }, 3000);
    },
    setWarningInterval() {
      if (intervalWarning) {
        clearInterval(intervalWarning);
      }
      intervalWarning = setInterval(() => {
        if (this.infos.length > 0) {
          if (temp3) {
            this.infos.push(temp3);
          }
          temp3 = this.infos.shift();
        }
      }, 3000);
    },
    click(data) {},
    over() {},
    leave() {},
  },
};
</script>
<style lang="less" scoped>
.news-content {
  height: 200px;
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
.summary {
  color: #fff;
  h3 {
    color: #fff;
  }
}
</style>
