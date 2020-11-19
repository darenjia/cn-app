<template>
  <div class="filter-bg">
    <div class="pager-content-detail">
      <div class="box-with-border-image">
        <number-card></number-card>
      </div>
      <div class="box-with-border-image">
        <sort-number-card></sort-number-card>
      </div>
    </div>
  </div>
</template>
<script>
import NumberCard from '../NumberCard';
import SortNumberCard from '../SortNumberCard';
export default {
  name: 'FirstLeftPage',
  components: {
    NumberCard,
    SortNumberCard,
  },
  data() {
    return {};
  },
  mounted() {},
};
</script>
<style lang="less" scoped></style>
