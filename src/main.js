import Vue from 'vue';
import App from './App.vue';
import './plugins/ant-design-vue.js';
import './plugins/v-charts.js';
import VueAMap from 'vue-amap';
// import Viser from 'viser-vue';
import Router from 'vue-router';
import routers from './router/config';
import Http from './service/http';
import './theme/theme.less';
import store from './store/main-store';

Vue.use(Router);
// Vue.use(Viser);
Vue.use(VueAMap);
Vue.prototype.$Http = Http;
Vue.config.productionTip = false;

VueAMap.initAMapApiLoader({
  // key: '139a7523bd0818d4bb50450f74d58cdc',
  key: '39cd02837fed49ae1be5cbc914d86b26',
  plugin: [
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar',
    'AMap.MapType',
    'AMap.DistrictSearch',
  ],
  uiVersion: '1.0', // ui库版本，不配置不加载,
  v: '1.4.4',
});

const router = new Router({
  routes: routers,
});
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
