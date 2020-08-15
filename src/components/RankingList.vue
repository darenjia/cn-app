<template>
  <div class="rank">
    <div class="title">{{ title }}<span class="detail">更多详情</span></div>
    <ul class="list">
      <li :key="index" v-for="(item, index) in list">
        <span :class="index < 3 ? 'active' : null">{{ index + 1 }}</span>
        <span>{{ item.name }}</span>
        <span>{{ item.total }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "RankingList",
  props: ["title", "list"],
};
</script>

<style lang="less" scoped>
.rank {
  padding: 12px;
  .title {
    font-size: 18px;
    font-weight: 500;
    .detail {
      cursor: pointer;
      position: absolute;
      top: 12px;
      right: 20px;
      color: #a5a5a5;
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
        color: #808080;
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
