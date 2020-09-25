<template>
  <div class="filter-bg">
    <div class="page-content-detail">
      <number-card></number-card>
      <sort-number-card></sort-number-card>
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
