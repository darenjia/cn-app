export default {
  watch: {
    dataFlag() {
      this.updateData();
    },
  },
  computed: {
    dataFlag() {
      return this.$store.state.updateDataFlag;
    },
  },
};
