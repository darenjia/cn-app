"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  computed: {
    dateRange: function dateRange() {
      return this.$store.state.dateRange;
    }
  },
  methods: {
    getTodayDate: function getTodayDate() {
      _moment["default"].updateLocale('zh-cn');

      return (0, _moment["default"])().format('YYYY-MM-DD');
    },
    changeDateRange: function changeDateRange() {
      this.$store.commit('changeDateRange', this.date);
    },
    dateChange: function dateChange(date) {
      this.date = date;
    }
  },
  watch: {
    dateRange: function dateRange(newValue) {
      // this.changeDateRange();
      console.log('Date has change');
      this.updateData();
    }
  }
};
exports["default"] = _default;