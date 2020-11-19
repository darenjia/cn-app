<template>
  <i class="timer">{{ number }}</i>
</template>
<script>
import '../assets/js/jquery.countUp';
export default {
  props: ['number'],
  mounted() {
    // eslint-disable-next-line no-undef
    $('.timer').countTo({
      lastSymbol: '',
      from: 0,
      speed: 2000,
      refreshInterval: 10,
      beforeSize: 0,
      decimals: 0,
      onUpdate: function () {},
    });
  },
};
</script>
<style lang="less" scoped></style>
