<template>
  <div class="rank chart">
    <div class="title stistic-title">
      {{ title }}<span class="detail"></span>
    </div>
    <ul class="list">
      <li :key="index" v-for="(item, index) in list">
        <span :class="index < 3 ? 'active' : null">{{ index + 1 }}</span>
        <span>{{ item.type }}</span>
        <span>{{ item.nums }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RankingList',
  props: {
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dataList: [],
    };
  },
  computed: {
    list: function () {
      return this.dataList;
    },
  },
  mounted() {
    this.getRankList();
  },
  methods: {
    async getRankList() {
      let data;
      if (this.type === 'disease') {
        data = await this.$Http.getDiseaseTypeRank();
      } else if (this.type === 'road') {
        data = await this.$Http.getDiseaseRoadRank();
      } else if (this.type === 'score') {
        data = await this.$Http.getScoreRank();
      } else {
        data = await this.$Http.getSectionRank();
      }

      this.dataList = data;
    },
  },
};
</script>

<style lang="less" scoped>
@textColor: #fff;
.rank {
  padding: 12px;
  position: relative;
  .title {
    font-size: 18px;
    font-weight: 500;
    color: @textColor;
    .detail {
      cursor: pointer;
      position: absolute;
      top: 12px;
      right: 20px;
      color: @textColor;
      font-size: 13px;
    }
  }
  .list {
    margin: 25px 10px 0;
    padding: 0;
    list-style: none;
    li {
      margin-top: 16px;
      span {
        color: @textColor;
        font-size: 14px;
        line-height: 22px;
      }
      span:first-child {
        background-color: #808080;
        border-radius: 20px;
        display: inline-block;
        font-size: 12px;
        font-weight: 600;
        margin-right: 24px;
        height: 20px;
        line-height: 20px;
        width: 20px;
        text-align: center;
      }
      span.active {
        background-color: #dfdfdf !important;
        color: #74bcff !important;
      }
      span:last-child {
        float: right;
      }
    }
  }
}
</style>
