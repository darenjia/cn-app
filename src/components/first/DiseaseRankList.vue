<template>
  <div>
    <div class="title">{{ type }} <span>(件)</span></div>
    <bar
      v-for="(item, index) in List"
      :key="index"
      :barData="item"
      :index="index"
      :color="color[index]"
      :fontColor="colorList[index]"
      @clickItem="clickItem"
    ></bar>
  </div>
</template>
<script>
import Bar from '../Bar';
export default {
  props: ['ListData', 'type'],
  name: 'DiseaseRankList',
  data() {
    return {
      color: ['#F28797', '#C0B1A3', '#FCE392', '#C3DACB', '#B3E6F4'],
      colorList: ['#ff9500', '#02d8f9', '#027fff', '#027fff', '#027fff'],
    };
  },
  components: { Bar },
  computed: {
    List() {
      return this.ListData;
    },
  },
  methods: {
    clickItem(name) {
      this.$emit('onDetailClick', { name: name, type: this.type });
    },
  },
};
</script>
<style scoped lang="less">
.title {
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  span {
    font-size: 12px;
    font-weight: normal;
  }
}
</style>
