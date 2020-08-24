<template>
  <div id="statisticHeader">
    <a-row :class="['header', { hide: isHidden }]">
      <a-col :span="8">
        <chart-card :loading="false" :title="'设施统计'" :total="facilityCount">
          <!-- <a-tooltip :title="'introduce'" >
            <a-icon type="info-circle-o" />
          </a-tooltip> -->
          <a-icon type="more" slot="action" @click="showDetail(1)" />

          <!-- <div slot="footer">
            道路<span style="margin-right: 16px;"></span>长度 234.56米 面积<span>
              234.56㎡</span
            >
          </div> -->
        </chart-card>
      </a-col>
      <a-col :span="8"
        ><chart-card :loading="false" :title="'病害统计'" :total="diseaseCount">
          <!-- <a-tooltip :title="'introduce'" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip> -->
          <a-icon type="more" slot="action" @click="showDetail(2)" />
          <!-- <div><mini-statistic-two /></div> -->
          <!-- <div slot="footer">
            巡检发现<span style="margin-right: 16px;"> 541 件</span>
            网格发现<span> 5410 件</span>
          </div> -->
          <span slot="ext1">
            <!-- <mini-statistic-one /> -->
            巡检:<span>{{ inspectCount }}</span>
          </span>
          <span slot="ext2">
            网格:<span>{{ gridCount }} </span>
          </span>
        </chart-card></a-col
      >
      <a-col :span="8"
        ><chart-card :loading="false" :title="'维修统计'" :total="taskCount">
          <!-- <a-tooltip :title="'introduce'" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip> -->
          <a-icon type="more" slot="action" @click="showDetail(3)" />
          <!-- <div><mini-statistic-three /></div> -->
          <!-- <div slot="footer">
            正在维修<span style="margin-right: 16px;"> 541 件</span>
            维修完成<span> 5410 件</span>
          </div> -->
          <span slot="ext1">
            <!-- <mini-statistic-one /> -->
            维修中: <span>{{ runningTaskCount }}</span>
          </span>
          <span slot="ext2"
            >已完成: <span>{{ completedTaskCount }}</span></span
          >
        </chart-card></a-col
      >
      <!-- <a-col :span="6"
        ><chart-card :loading="false" :title="'人员统计'" total="45 人">
          <a-tooltip :title="'introduce'" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <a-icon type="more" slot="action" @click="showDetail(4)" />
          <div>
            <mini-progress
              target="100"
              percent="78"
              color="#13C2C2"
              height="8px"
            />
          </div>
          <div slot="footer">今日出勤人数<span> 50人</span></div>
        </chart-card></a-col
      > -->
    </a-row>
  </div>
</template>
<script>
import ChartCard from './ChartCard';
// import MiniStatisticOne from "./MiniStatisticOne";
// import MiniStatisticTwo from "./MiniStatisticTwo";
// import MiniStatisticThree from "./MiniStatisticThree";
// import MiniProgress from "./MiniProgress";

export default {
  // props:{
  //     IsShow:{
  //         type:Boolean,
  //         required:true
  //     }
  // },
  name: 'statisticHeader',
  data() {
    return {
      statiticData: {
        facilitiesCount: 0,
        diseaseCount: 0,
        inspect: 0,
        grid: 0,
        repairCount: 0,
        repairLoading: 0,
        repairComplete: 0,
      },
    };
  },
  mounted() {
    this.getStatisticData();
    this.getDiseaseCount();
    this.getRepairCount();
  },
  computed: {
    isHidden: function () {
      return !this.$store.state.showStatistic;
    },
    statiticDatas: function () {
      return this.statiticData;
    },
    facilityCount: function () {
      return this.statiticData.facilitiesCount;
    },
    diseaseCount: function () {
      return this.statiticData.diseaseCount;
    },
    taskCount: function () {
      return this.statiticData.repairCount;
    },
    inspectCount: function () {
      return this.statiticData.inspect;
    },
    gridCount: function () {
      return this.statiticData.grid;
    },
    runningTaskCount: function () {
      return this.statiticData.repairLoading;
    },
    completedTaskCount: function () {
      return this.statiticData.repairComplete;
    },
  },
  components: {
    ChartCard,
    // MiniStatisticOne,
    // MiniStatisticTwo,
    // MiniProgress,
    // MiniStatisticThree,
  },
  methods: {
    showDetail(id) {
      this.$router.push('/1').catch(err => {
        console.log(err);
      });
      this.$store.commit('changeCurrentShow', id);
    },
    async getStatisticData() {
      const data = await this.$Http.getFacilitiesCount();
      this.statiticData.facilitiesCount = data[0].facilitiesCount;
    },
    async getDiseaseCount() {
      const data = await this.$Http.getDiseaseCount();
      this.statiticData.diseaseCount = data[0].diseaseCount;
      this.statiticData.inspect = data[0].inspect;
      this.statiticData.grid = data[0].grid;
    },
    async getRepairCount() {
      const data = await this.$Http.getRepairCount();
      this.statiticData.repairCount = data[0].repairCount;
      this.statiticData.repairLoading = data[0].repairLoading;
      this.statiticData.repairComplete = data[0].repairComplete;
    },
  },
};
</script>
<style lang="less" scoped>
.header {
  position: relative;
  top: 0px;
  left: 0px;
  transition: all ease 0.2s;
}
.hide {
  // top: -120px;
  display: none;
}
</style>
