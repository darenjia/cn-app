<template>
  <div class="filter-bg">
    <div class="page-content-detail">
      <div class="box-with-border-image">
        <div class="title-with-bg">案件动态</div>
        <div class="date-view">
          <date-view :currentMode="1"></date-view>
        </div>
        <a-spin :spinning="DataLoading">
          <div class="road-news-list">
            <div class="news-content">
              <list-card
                :listData="DiseaseGridDataList"
                :type="1"
                ref="child"
                @clickItem="clickItem"
              >
              </list-card>
            </div>
          </div>
          <div class="title-with-bg">案件类型</div>
          <div class="disease-chart">
            <chart-bar :chartData="DiseaseTypeData"></chart-bar>
          </div>
        </a-spin>
      </div>
    </div>
  </div>
</template>
<script>
import DateView from '../DateView';
import ListCard from '../second/RightListItemCard';
import mixin from '../../plugins/mixins-today';
import ChartBar from './ChartBar';
import Listener from '../../plugins/mixins-listener';

export default {
  name: 'ThirdRightPage',
  mixins: [mixin, Listener],
  components: {
    DateView,
    ListCard,
    ChartBar,
  },
  data() {
    return {
      DiseaseGridData: [],
      active: 0,
      DiseaseTypeData: [],
      GridDataLoading: false,
      TypeDataLoading: false,
    };
  },
  computed: {
    DiseaseGridDataList() {
      return this.DiseaseGridData;
    },
    DiseaseTypeDataList() {
      return this.DiseaseTypeData;
    },
    DataLoading() {
      return this.GridDataLoading || this.TypeDataLoading;
    },
  },
  methods: {
    async getDiseaseGridData() {
      this.GridDataLoading = true;
      const data = await this.$Http.Sewer_GetSewerFacilitiesGrid({
        params: this.dateRange,
      });
      console.log('Sewer_GetSewerFacilitiesGrid', data, this.dateRange);
      this.DiseaseGridData = data;
      this.GridDataLoading = false;
    },
    async getSewerTypeCount() {
      this.TypeDataLoading = true;
      const data = await this.$Http.Sewer_GetSewerTypeCount({
        params: this.dateRange,
      });
      console.log('Sewer_GetSewerTypeCount', data, this.dateRange);
      this.DiseaseTypeData = data;
      this.TypeDataLoading = false;
    },
    updateData() {
      console.log('refresh data Sewer.');
      this.getDiseaseGridData();
      this.getSewerTypeCount();
    },
    startScroll() {
      this.$refs.child.startInterval();
    },
    clickItem(item) {
      this.$store.commit('changeDiseaseDetail', item);
    },
    click(item) {},
    over() {},
    leave() {},
  },
  mounted() {
    setTimeout(() => {
      this.startScroll();
    }, 3000);
    // this.updateData();
  },
};
</script>
<style lang="less" scoped>
.news-content {
  height: 346px;
}
.title-with-bg::after {
  margin-left: 46px;
}
.title-with-bg::before {
  margin-left: -144px;
}
.date-view {
  margin: 20px 0px;
}
.road-news-list {
  height: 100%;
}
.disease-chart {
  width: 100%;
  height: 300px;
}
.sort-type1 {
  background: linear-gradient(
    to top,
    rgba(72, 227, 247, 1),
    rgba(72, 227, 247, 0.1),
    rgba(72, 227, 247, 0),
    rgba(72, 227, 247, 0)
  );
}
</style>
