"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  methods: {
    getTodayDate: function getTodayDate() {
      _moment["default"].updateLocale('zh-cn');

      return (0, _moment["default"])().format('YYYY-MM-DD');
    }
  }
};
exports["default"] = _default;