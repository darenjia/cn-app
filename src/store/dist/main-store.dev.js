"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vuex = _interopRequireDefault(require("vuex"));

var _vue = _interopRequireDefault(require("vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var store = new _vuex["default"].Store({
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
    mapFlag: -1,
    mapShowFacility: true,
    mapShowTask: true,
    mapShowPerson: true,
    mapShowDisease: true,
    dateRange: {},
    facilityType: {
      type: '道路'
    },
    diseaseType: {},
    currentPointGuid: '',
    updateDataFlag: 0,
    roadPlanMonth: '0',
    roadPlanGuid: '',
    sewerPlanData: {},
    diseaseDetail: {},
    detailMode: 0 // 0 normal 1 big

  },
  mutations: {
    changeCurrentShow: function changeCurrentShow(state, id) {
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
    changeStatisticState: function changeStatisticState(state, type) {
      state.showStatistic = type;
    },
    changeStatisticGraphState: function changeStatisticGraphState(state, type) {
      state.showStatisticGraph = type;
    },
    changeRankListState: function changeRankListState(state, type) {
      state.showRankList = type;
    },
    changeMapFaciity: function changeMapFaciity(state, type) {
      state.mapShowFacility = type;
    },
    changeMapPerson: function changeMapPerson(state, type) {
      state.mapShowPerson = type;
    },
    changeMapDisease: function changeMapDisease(state, type) {
      state.mapShowDisease = type;
    },
    changeMapTask: function changeMapTask(state, type) {
      state.mapShowTask = type;
    },
    changeMapMode: function changeMapMode(state, type) {
      state.mapMode = type;
    },
    changeMapFacilityType: function changeMapFacilityType(state, type) {
      state.facilityType.type = type;
      state.facilityType.name = '';
      state.facilityType.fq = '';
      state.mapMode++;
    },
    changeMapFacilityDetailType: function changeMapFacilityDetailType(state, type) {
      state.facilityType.name = type;
      state.facilityType.fq = '';
      state.mapMode++;
    },
    changeMapFacilityDetailSectionType: function changeMapFacilityDetailSectionType(state, type) {
      state.facilityType.fq = type;
      state.mapMode++;
    },
    changePointDetail: function changePointDetail(state, type) {
      state.currentPointID = type;
      state.showPointDetail = true;
    },
    changePointDetailState: function changePointDetailState(state, type) {
      state.showPointDetail = type;
    },
    changeMapType: function changeMapType(state, type) {
      if (type.length > 0) {
        state.mapShowFacility = type.indexOf('设施') >= 0;
        state.mapShowPerson = type.indexOf('人员') >= 0;
        state.mapShowDisease = type.indexOf('病害') >= 0;
        state.mapShowTask = type.indexOf('道路') >= 0;
      } else {
        state.mapShowFacility = false;
        state.mapShowPerson = false;
        state.mapShowDisease = false;
        state.mapShowTask = false;
      }
    },
    changeDateRange: function changeDateRange(state, type) {
      state.dateRange = type;
    },
    changeMapDiseaseType: function changeMapDiseaseType(state, type) {
      state.diseaseType = type;
    },
    changeCurrentPointLocation: function changeCurrentPointLocation(state, type) {
      state.currentPointGuid = type;
    },
    changeTabMode: function changeTabMode(state, type) {
      state.tabMode = type;
      state.diseaseType = {};
    },
    changeMapFlag: function changeMapFlag(state, type) {
      state.mapFlag = type;
    },
    changeUpdateDataFlag: function changeUpdateDataFlag(state, type) {
      state.updateDataFlag++;
    },
    changeRoadPlanMonth: function changeRoadPlanMonth(state, type) {
      state.roadPlanMonth = type;
    },
    changeRoadPlanGuid: function changeRoadPlanGuid(state, type) {
      state.roadPlanGuid = type;
    },
    changeSewerPlanData: function changeSewerPlanData(state, type) {
      state.sewerPlanData = type;
    },
    changeDiseaseDetail: function changeDiseaseDetail(state, type) {
      state.diseaseDetail = type;
    },
    changeDetailMode: function changeDetailMode(state, type) {
      state.detailMode = type;
    }
  }
});
var _default = store;
exports["default"] = _default;