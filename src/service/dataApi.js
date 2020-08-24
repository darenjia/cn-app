const DATA_API = {
  getFacilitiesCount: {
    method: 'get',
    url: '/getFacilitiesCount',
  },
  getDiseaseCount: {
    method: 'get',
    url: '/getDiseaseCount',
  },
  getRepairCount: {
    method: 'get',
    url: '/getRepairCount',
  },
  getDiseaseTypeCount: {
    method: 'get',
    url: '/getDiseaseTypeCount',
  },
  getMonthRepairCount: {
    method: 'get',
    url: '/getMonthRepairCount',
  },
  getMonthAttendance: {
    method: 'get',
    url: '/getMonthAttendance',
  },
  getDiseaseTypeRank: {
    method: 'get',
    url: '/getDiseaseTypeRank',
  },
  getDiseaseRoadRank: {
    method: 'get',
    url: '/getDiseaseRoadRank',
  },
  getScoreRank: {
    method: 'get',
    url: '/getScoreRank',
  },
  getFacilitiesTypeCount: {
    method: 'get',
    url: '/facilitiesType',
  },
  getFacilitiesDetailTypeCount: {
    method: 'get',
    url: '/childrenType',
  },
  getFacilitiesDetailType: {
    method: 'get',
    url: '/sectionType',
  },
  getFacilitiesPoint: {
    method: 'get',
    url: '/getFacilitiesPoint',
  },
  getSectionRank: {
    method: 'get',
    url: '/getSectionRank',
  },
  getDiseasePosition: {
    method: 'get',
    url: '/getDiseasePosition',
  },
  getDiseaseType: {
    method: 'get',
    url: '/diseaseType',
  },
};
export default DATA_API;
