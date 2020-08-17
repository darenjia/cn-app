import Vue from 'vue';
import App from './App.vue';
import './plugins/ant-design-vue.js';
import './plugins/v-charts.js';
import VueAMap from 'vue-amap';
import Viser from 'viser-vue';
import Vuex from 'vuex';
import Router from 'vue-router';
import routers from './router/config';
import Http from './service/http';
import './theme/theme.less';

Vue.use(Router);
Vue.use(Vuex);
Vue.use(Viser);
Vue.use(VueAMap);
Vue.prototype.$Http = Http;
Vue.config.productionTip = false;

VueAMap.initAMapApiLoader({
  key: '139a7523bd0818d4bb50450f74d58cdc',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType'],
  uiVersion: '1.0', // ui库版本，不配置不加载,
  v: '1.4.4',
});

const store = new Vuex.Store({
  state: {
    currentShow: -1,
    showRankList: true,
    showStatisticGraph: true,
    showStatistic: true,
    mapMode: 0,
    mapShowFacility: true,
    mapShowTask: true,
    mapShowPerson: true,
    mapShowDisease: true,
  },
  mutations: {
    changeCurrentShow(state, id) {
      state.currentShow = id;
      state.mapMode = id;
      if (id > 0) {
        state.showRankList = false;
        state.showStatistic = false;
        state.showStatisticGraph = false;
      } else {
        state.showRankList = true;
        state.showStatistic = true;
        state.showStatisticGraph = true;
      }
      if (id === 1) {
        state.mapShowFacility = true;
        state.mapShowDisease = false;
        state.mapShowTask = false;
        state.mapShowPerson = false;
      } else if (id === 2) {
        state.mapShowFacility = false;
        state.mapShowDisease = true;
        state.mapShowTask = false;
        state.mapShowPerson = false;
      } else if (id === 3) {
        state.mapShowFacility = false;
        state.mapShowDisease = false;
        state.mapShowTask = true;
        state.mapShowPerson = false;
      } else if (id === 4) {
        state.mapShowFacility = false;
        state.mapShowDisease = false;
        state.mapShowTask = false;
        state.mapShowPerson = true;
      }
    },
    changeStatisticState(state, type) {
      state.showStatistic = type;
    },
    changeStatisticGraphState(state, type) {
      state.showStatisticGraph = type;
    },
    changeRankListState(state, type) {
      state.showRankList = type;
    },
    changeMapFaciity(state, type) {
      state.mapShowFacility = type;
    },
    changeMapPerson(state, type) {
      state.mapShowPerson = type;
    },
    changeMapDisease(state, type) {
      state.mapShowDisease = type;
    },
    changeMapTask(state, type) {
      state.mapShowTask = type;
    },
    changeMapMode(state, type) {
      state.mapMode = type;
    },
  },
});
const router = new Router({
  routes: routers,
});
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
