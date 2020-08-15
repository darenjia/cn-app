import Vue from "vue";
import App from "./App.vue";
import "./plugins/ant-design-vue.js";
import VueAMap from "vue-amap";
import Viser from 'viser-vue';
import Vuex from 'vuex';
import Router from 'vue-router'
import routers from './router/config'
import Http from './service/http'
// import './theme/index.less'

Vue.use(Router)
Vue.use(Vuex);
Vue.use(Viser);
Vue.use(VueAMap);
Vue.prototype.$Http = Http
Vue.config.productionTip = false;

VueAMap.initAMapApiLoader({
  key: "3f3553837b3478c8cad25c0be4caf4b5",
  plugin: ["AMap.Scale", "AMap.OverView", "AMap.ToolBar", "AMap.MapType"],
  uiVersion: "1.0", // ui库版本，不配置不加载,
  v: "1.4.4",
});
let store=new Vuex.Store({
  state: {
    currentShow: -1,
    showRankList:true
  },
  mutations: {
    changeCurrentShow (state,id) {
      state.currentShow=id;
      if(id>0){
        state.showRankList=false
      }else{
        state.showRankList=true
      }
    }
  }
});
let router=new Router({routes:routers});
new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
