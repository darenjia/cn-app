"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var DATA_API = {
  getFacilitiesCount: {
    method: 'get',
    url: '/getFacilitiesCount'
  },
  getDiseaseCount: {
    method: 'get',
    url: '/getDiseaseCount'
  },
  getDiseaseTypeCount: {
    method: 'get',
    url: '/getDiseaseTypeCount'
  },
  getMonthRepairCount: {
    method: 'get',
    url: '/getMonthRepairCount'
  },
  getMonthAttendance: {
    method: 'get',
    url: '/getMonthAttendance'
  },
  getDiseaseTypeRank: {
    method: 'get',
    url: '/getDiseaseTypeRank'
  },
  getDiseaseRoadRank: {
    method: 'get',
    url: '/getDiseaseRoadRank'
  },
  getScoreRank: {
    method: 'get',
    url: '/getScoreRank'
  },
  getFacilitiesTypeCount: {
    method: 'get',
    url: '/facilitiesType'
  },
  getFacilitiesDetailTypeCount: {
    method: 'get',
    url: '/childrenType'
  },
  getFacilitiesDetailType: {
    method: 'get',
    url: '/sectionType'
  },
  getFacilitiesPoint: {
    method: 'get',
    url: '/getFacilitiesPoint'
  },
  getSectionRank: {
    method: 'get',
    url: '/getSectionRank'
  },
  getDiseasePosition: {
    method: 'get',
    url: '/diseasePosition'
  },
  getDiseaseType: {
    method: 'get',
    url: '/diseaseType'
  },
  getRepairCount: {
    method: 'get',
    url: '/repairType'
  },
  getDiseaseWithRepair: {
    method: 'get',
    url: '/diseaseTypeRepair'
  },
  getDiseaseDetailInfo: {
    method: 'get',
    url: '/getDiseaseInfo'
  },
  getRepairDetailInfo: {
    method: 'get',
    url: '/getRepairInfo'
  },
  getTimeLine: {
    method: 'get',
    url: '/getTimeLine'
  },
  getFacilitiesLine: {
    method: 'get',
    url: '/getFacilitiesLine'
  },
  getFacilitiesArea: {
    method: 'get',
    url: '/getFacilitiesArea'
  },
  recentlyOfRepair: {
    method: 'get',
    url: '/recentlyOfRepair'
  }
};
var _default = DATA_API;
exports["default"] = _default;