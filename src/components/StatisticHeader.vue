<template>
  <div id="statisticHeader">
    <a-row  :class="['header',{'hide':isHidden}]">
      <a-col :span="8">
        <chart-card :loading="false" :title="'设施统计'" total="189,345 个">
          <!-- <a-tooltip :title="'introduce'" >
            <a-icon type="info-circle-o" />
          </a-tooltip> -->
          <a-icon type="more" slot="action" @click="showDetail(1)" />
          <div>
            <!-- <mini-statistic-one /> -->
          </div>
          <!-- <div slot="footer">
            道路<span style="margin-right: 16px;"></span>长度 234.56米 面积<span>
              234.56㎡</span
            >
          </div> -->
        </chart-card>
      </a-col>
      <a-col :span="8"
        ><chart-card :loading="false" :title="'病害统计'" total="9,345 件">
          <!-- <a-tooltip :title="'introduce'" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip> -->
          <a-icon type="more" slot="action" @click="showDetail(2)" />
          <!-- <div><mini-statistic-two /></div> -->
          <!-- <div slot="footer">
            巡检发现<span style="margin-right: 16px;"> 541 件</span>
            网格发现<span> 5410 件</span>
          </div> -->
        </chart-card></a-col
      >
      <a-col :span="8"
        ><chart-card :loading="false" :title="'维修统计'" total="9,345 个">
          <!-- <a-tooltip :title="'introduce'" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip> -->
          <a-icon type="more" slot="action" @click="showDetail(3)" />
          <!-- <div><mini-statistic-three /></div> -->
          <!-- <div slot="footer">
            正在维修<span style="margin-right: 16px;"> 541 件</span>
            维修完成<span> 5410 件</span>
          </div> -->
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
import ChartCard from "./ChartCard";
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
  name: "statisticHeader",
  data() {
    return {};
  },
  computed: {
    isHidden: function () {
      return !this.$store.state.showRankList;
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
      this.$router.push("/1").catch(err => {err});
      this.$store.commit("changeCurrentShow", id);
    },
  },
};
</script>
<style lang="less" scoped>
.header{
    position: relative;
    top: 0px;
    left: 0px;
    transition: all ease 0.2s;
}
.hide{
    // top: -120px;
    display: none;
}
</style>