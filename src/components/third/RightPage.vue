<template>
  <div class="filter-bg">
    <div class="page-content-detail">
      <div>
        <date-view @dateRangeChanged="dateChange"></date-view>
      </div>
      <div>
        <div class="news-content">
          <list-card>
            <transition-group name="list-complete" tag="ul">
              <li
                v-for="item in DiseaseGridData"
                :key="item.serialnum"
                class="list-complete-item"
                @click="click(item)"
                @mouseover="over"
                @mouseleave="leave"
              >
                <span class="time">{{ item.anjianleixing }}</span
                ><span class="type">{{ item.createtime }}</span>
                <br />
                <span>{{ item.anjiandidian }}</span>
                <span class="type">{{ item.xiangmubu }}</span>
              </li>
            </transition-group></list-card
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DateView from '../DateView';
import ListCard from '../ListCard';
import mixin from '../../plugins/mixins-today';
export default {
  name: 'ThirdRightPage',
  mixins: [mixin],
  data() {
    return { DiseaseGridData: [] };
  },
  components: { DateView, ListCard },
  computed: {
    DiseaseGridDataList() {
      return this.DiseaseGridData;
    },
  },
  methods: {
    async getDiseaseGridData() {
      console.log(this.dateRange);
      const data = await this.$Http.Grid_GetSewerFacilitiesGrid({
        params: this.dateRange,
      });
      console.log('Grid_GetSewerFacilitiesGrid', data);
      this.DiseaseGridData = data;
    },
    updateData() {
      this.getDiseaseGridData();
    },
  },
  mounted() {
    this.updateData();
  },
};
</script>
<style lang="less" scoped>
.news-content {
  height: 400px;
  ul {
    color: #eee;
    padding-inline-start: 0px;
    position: relative;
    li {
      font-size: 12px;
      cursor: pointer;
      padding: 4px 20px 4px 10px;
      .time {
        color: #027fff;
        font-weight: 700;
      }
    }
    li:hover {
      transition: all 0.3s linear;
      transform: scale(1.05);
    }
    .type {
      float: right;
    }
  }
}
</style>
