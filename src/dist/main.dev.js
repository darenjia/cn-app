"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

require("./plugins/ant-design-vue.js");

require("./plugins/v-charts.js");

var _vueAmap = _interopRequireDefault(require("vue-amap"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _config = _interopRequireDefault(require("./router/config"));

var _http = _interopRequireDefault(require("./service/http"));

require("./theme/theme.less");

var _mainStore = _interopRequireDefault(require("./store/main-store"));

require("bootstrap");

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import Viser from 'viser-vue';
// eslint-disable-next-line no-unused-vars
_vue["default"].use(_vueRouter["default"]); // Vue.use(Viser);


_vue["default"].use(_vueAmap["default"]);

_vue["default"].prototype.$Http = _http["default"];
_vue["default"].config.productionTip = false;

_vueAmap["default"].initAMapApiLoader({
  // key: '139a7523bd0818d4bb50450f74d58cdc',
  key: '39cd02837fed49ae1be5cbc914d86b26',
  plugin: [// 'AMap.Scale',
  'AMap.OverView', // 'AMap.ToolBar',
  // 'AMap.MapType',
  'AMap.DistrictSearch', 'AMap.Heatmap'],
  // uiVersion: '1.0', // ui库版本，不配置不加载,
  v: '1.4.4'
});

var router = new _vueRouter["default"]({
  routes: _config["default"]
});
new _vue["default"]({
  store: _mainStore["default"],
  router: router,
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app-box');