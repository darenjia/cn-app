<template>
  <div>
    <bar
      v-for="(item, index) in List"
      :key="index"
      width="10%"
      :color="color[index]"
    ></bar>
  </div>
</template>
<script>
import Bar from '../Bar';
export default {
  props: ['ListData'],
  name: 'DiseaseRankList',
  data() {
    return {
      color: ['#F28797', '#C0B1A3', '#FCE392', '#C3DACB', '#B3E6F4'],
    };
  },
  components: [Bar],
  computed: {
    List() {
      return this.ListData;
    },
  },
};
</script>
<style scoped></style>
