import moment from 'moment';
export default {
  computed: {
    dateRange() {
      return this.$store.state.dateRange;
    },
  },
  methods: {
    getTodayDate() {
      moment.updateLocale('zh-cn');
      return moment().format('YYYY-MM-DD');
    },
    changeDateRange() {
      this.$store.commit('changeDateRange', this.date);
    },
    dateChange(date) {
      this.date = date;
    },
  },
  watch: {
    dateRange(newValue) {
      // this.changeDateRange();
      console.log('Date has change');
      this.updateData();
    },
  },
};
