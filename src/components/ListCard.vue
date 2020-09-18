<template>
  <div class="list-content">
    <h3>{{ title }}</h3>
    <transition-group name="list-complete" tag="ul">
      <slot></slot>
    </transition-group>
  </div>
</template>
<script>
export default {
  props: ['title'],
};
</script>
<style lang="less" scoped>
.list-content {
  height: 100%;
  overflow: hidden;
  width: 100%;
  h3 {
    color: #f9bb0b;
    font-size: 16px;
  }
  ul {
    color: #eee;
    padding-inline-start: 0px;
    position: relative;
  }
}
</style>
