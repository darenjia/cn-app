<template>
  <div class="filter-bg">
    <div class="page-content-detail">
      <div class="header-time">
        <date-view></date-view>
      </div>
    </div>
  </div>
</template>
<script>
import DateView from '../DateView';
export default {
  name: 'SecondLeftPage',
  components: {
    DateView,
  },
};
</script>
