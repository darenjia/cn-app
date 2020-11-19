<template>
  <div class="card">
    <div class="card-img">
      <slot name="img"></slot>
    </div>
    <div class="card-title">
      <slot name="title"></slot>
    </div>
    <div class="card-number"><slot name="number"></slot></div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.card {
  display: inline-block;
}
</style>
