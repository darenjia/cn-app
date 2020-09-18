import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    currentPointID: '',
    currentShow: -1,
    showRankList: false,
    showStatisticGraph: true,
    showStatistic: false,
    showPointDetail: false,
    showTrackPage: false,
    mapMode: 0,
    tabMode: 0,
    mapShowFacility: false,
    mapShowTask: false,
    mapShowPerson: false,
    mapShowDisease: false,
    dateRange: {},
    facilityType: { type: '道路' },
    diseaseType: {},
    currentPointGuid: '',
    updateDataFlag: 0,
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
    changeMapFacilityType(state, type) {
      state.facilityType.type = type;
      state.facilityType.name = '';
      state.facilityType.fq = '';
      state.mapMode++;
    },
    changeMapFacilityDetailType(state, type) {
      state.facilityType.name = type;
      state.facilityType.fq = '';
      state.mapMode++;
    },
    changeMapFacilityDetailSectionType(state, type) {
      state.facilityType.fq = type;
      state.mapMode++;
    },
    changePointDetail(state, type) {
      state.currentPointID = type;
      state.showPointDetail = true;
    },
    changePointDetailState(state, type) {
      state.showPointDetail = type;
    },
    changeMapType(state, type) {
      if (type.length > 0) {
        state.mapShowFacility = type.indexOf('设施') >= 0;
        state.mapShowPerson = type.indexOf('人员') >= 0;
        state.mapShowDisease = type.indexOf('病害') >= 0;
        state.mapShowTask = type.indexOf('维修') >= 0;
      } else {
        state.mapShowFacility = false;
        state.mapShowPerson = false;
        state.mapShowDisease = false;
        state.mapShowTask = false;
      }
    },
    changeDateRange(state, type) {
      state.dateRange = type;
    },
    changeMapDiseaseType(state, type) {
      state.diseaseType = type;
    },
    changeCurrentPointLocation(state, type) {
      state.currentPointGuid = type;
    },
    changeTabMode(state, type) {
      state.tabMode = type;
    },
    changeUpdateDataFlag(state, type) {
      state.updateDataFlag++;
    },
  },
});
export default store;
