<template>
  <div class="filter-bg">
    <div class="page-content-detail">
      <div class="summary box-with-border-image">
        <div class="title-with-bg">案件汇总</div>
        <div v-if="summary.length > 0">
          <div class="disease-list">
            <div class="list-item list-type1">{{ summary[0].nums }}</div>
            <div class="list-item list-header">
              全年
            </div>

            <div class="list-item list-type2">{{ summary[1].nums }}</div>
          </div>
          <div class="disease-list">
            <div class="list-item list-type1">{{ summary[2].nums }}</div>
            <div class="list-item list-header">
              本月
            </div>

            <div class="list-item list-type2">{{ summary[3].nums }}</div>
          </div>
          <div class="disease-list">
            <div class="list-item list-type1">{{ summary[4].nums }}</div>
            <div class="list-item list-header">
              今天
            </div>

            <div class="list-item list-type2">{{ summary[5].nums }}</div>
          </div>
        </div>
      </div>
      <div class="news-content box-with-border-image">
        <div class="title-with-bg">最新案件</div>
        <list-card
          :listData="newestTaskData"
          ref="child0"
          @clickItem="clickItem"
        >
        </list-card>
      </div>
      <div class="news-content box-with-border-image news-content1">
        <div class="title-with-bg">最新处置</div>
        <list-card
          :listData="newestFinishedTaskData"
          ref="child1"
          @clickItem="clickItem"
        ></list-card>
      </div>
    </div>
  </div>
</template>
<script>
import listener from '../../plugins/mixins-listener';
import ListCard from './ListItemCard';
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
    setTimeout(() => {
      this.startScroll();
    }, 3000);
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
      this.newestFinishedTask = data;
    },
    async getWarningTask() {
      const data = await this.$Http.Grid_GetOverOfWarn();
      this.warningTask = data;
    },
    startScroll() {
      this.$refs.child0.startInterval();
      this.$refs.child1.startInterval();
    },
    updateData() {
      console.log('refreshData', 'Grid');
      this.getGridSummary();
      this.getNewestTask();
      this.getNewestFinishedTask();
    },
    clickItem(item) {
      this.$store.commit('changeDiseaseDetail', item);
    },
  },
};
</script>
<style lang="less" scoped>
.news-content {
  height: 360px;
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
.news-content1 {
  height: 265px;
}
.summary {
  color: #fff;
  .disease-list {
    position: relative;
    .list-item {
      display: inline-block;
      width: 33%;
      text-align: center;
      height: 40px;
      line-height: 40px;
      position: relative;
      background-repeat: no-repeat;
    }
    .list-type2 {
      color: #87c38f;
    }
  }
  .disease-list::after {
    width: 100%;
    height: 90%;
    position: absolute;
    content: '';
    top: 2px;
    left: 0px;
    z-index: -1;
    background: linear-gradient(
      to left,
      rgba(66, 177, 230, 0),
      rgba(2, 73, 80, 0.59),
      rgba(66, 177, 230, 0)
    );
  }
}
</style>
