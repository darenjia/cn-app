import moment from 'moment';
export default {
  methods: {
    getTodayDate() {
      moment.updateLocale('zh-cn');
      return moment().format('YYYY-MM-DD');
    },
  },
};
