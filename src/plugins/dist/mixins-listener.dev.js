"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  watch: {
    dataFlag: function dataFlag() {
      this.updateData();
    }
  },
  computed: {
    dataFlag: function dataFlag() {
      return this.$store.state.updateDataFlag;
    }
  }
};
exports["default"] = _default;