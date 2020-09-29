<template>
  <div class="list-content">
    <h3 class="title-with-bg">{{ title }}</h3>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: ['title'],
};
</script>
<style lang="less">
.list-content {
  height: 100%;
  overflow: hidden;
  width: 100%;
  h3 {
    color: #f9bb0b;
    font-size: 16px;
  }
}
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  width: 100%;
  list-style: none;
}
.list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-10px) scaleX(0.8);
}
.list-complete-enter {
  transform: scale(1.08);
}
.list-complete-move {
  transition: transform 1s;
}
.list-complete-leave-active {
  position: absolute;
}
</style>
