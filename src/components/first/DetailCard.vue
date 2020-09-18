<template>
  <div>
    <div class="card-content">
      <div class="title-style">
        {{ title
        }}<span class="close" @click="closePage"
          ><a-icon type="close-circle" style="color: #fff; font-size: 24px;"
        /></span>
      </div>
      <div class="content">
        <a-row>
          <a-skeleton
            :loading="facilityLoadingState"
            :active="facilityLoadingState"
          >
            <a-descriptions title="病害信息">
              <a-descriptions-item label="任务编号">{{
                diseaseTaskID
              }}</a-descriptions-item>
              <a-descriptions-item label="任务类型">{{
                taskType
              }}</a-descriptions-item>
              <a-descriptions-item label="设施名称">{{
                facilityType
              }}</a-descriptions-item>
              <a-descriptions-item label="所在位置" :span="3">{{
                diseaseLocation
              }}</a-descriptions-item>
              <a-descriptions-item label="病害面积">{{
                diseaseArea
              }}</a-descriptions-item>
              <a-descriptions-item label="病害类型">{{
                diseaseType
              }}</a-descriptions-item>
              <a-descriptions-item label="维修期限">{{
                diseaseLevel
              }}</a-descriptions-item>
              <a-descriptions-item label="情况描述">{{
                diseaseRemark
              }}</a-descriptions-item>
              <a-descriptions-item label="发现人员">{{
                patroluser
              }}</a-descriptions-item>
              <a-descriptions-item label="上报时间">{{
                reportTime
              }}</a-descriptions-item>
              <a-descriptions-item label="现场详情">
                <!-- <img
                v-for="item in diseaseImages"
                class="image-style"
                :key="item"
                :src="'http://47.103.63.36:8084/FtpFile/' + item"
              /> -->
                <gallery
                  id="gallery1"
                  :images="diseaseImages"
                  :index="index"
                  @close="index = null"
                ></gallery>
                <img
                  v-for="(item, itemIndex) in diseaseImages"
                  class="image-style"
                  :key="itemIndex"
                  @click="index = itemIndex"
                  :src="item"
                />
              </a-descriptions-item> </a-descriptions
          ></a-skeleton>
        </a-row>
        <a-divider />
        <a-row>
          <a-skeleton
            :loading="repairLoadingState"
            :active="repairLoadingState"
          >
            <a-descriptions title="维修信息">
              <a-descriptions-item label="接单时间">{{
                repairOrderTime
              }}</a-descriptions-item>
              <a-descriptions-item label="维修人员">{{
                repairPerson
              }}</a-descriptions-item>
              <a-descriptions-item label="维修面积">{{
                repairArea
              }}</a-descriptions-item>
              <!-- <a-descriptions-item label="维修备注">{{
              repairRemark
            }}</a-descriptions-item> -->

              <a-descriptions-item label="维修现场">
                <gallery
                  id="gallery2"
                  :images="repairImages"
                  :index="repairIndex"
                  @close="repairIndex = null"
                ></gallery>
                <img
                  v-for="(item, itemIndex) in repairImages"
                  class="image-style"
                  :key="itemIndex"
                  @click="repairIndex = itemIndex"
                  :src="item"
                />
              </a-descriptions-item> </a-descriptions
          ></a-skeleton>
        </a-row>
      </div>
      <div class="footer-step">
        <a-spin :spinning="timeLineLoadingState">
          <a-steps :current="currentStep" status="process">
            <a-step title="发起" :description="timeline_discoverTime">
              <a-icon slot="icon" type="search" />
            </a-step>
            <a-step title="维修" :description="timeline_repairTime">
              <a-icon slot="icon" type="clock-circle"
            /></a-step>
            <a-step title="完成" :description="timeline_checkTime">
              <a-icon slot="icon" type="check-circle" />
            </a-step>
          </a-steps>
        </a-spin>
      </div>
    </div>
  </div>
</template>
<script>
import VueGallery from 'vue-gallery';
export default {
  name: 'DetailCard',
  components: {
    gallery: VueGallery,
  },
  data() {
    return {
      title: '详细信息',
      facilityLoading: true,
      repairLoading: true,
      timeLineLoading: true,
      disease: {},
      repair: {},
      timeline: {},
      index: null,
      repairIndex: null,
    };
  },
  computed: {
    currentStep() {
      if (this.timeline.findTime === null) {
        return 0;
      } else if (this.timeline.reportTime === null) {
        return 0;
      } else if (this.timeline.testTime === null) {
        return 1;
      } else {
        return 2;
      }
    },
    currentShowState() {
      return this.$store.state.showPointDetail;
    },
    currentFacilityId: function () {
      return this.$store.state.currentPointID;
    },
    repairLoadingState() {
      return this.repairLoading;
    },
    facilityLoadingState() {
      return this.facilityLoading;
    },
    timeLineLoadingState() {
      return this.timeLineLoading;
    },
    diseaseLocation() {
      return this.disease.facilityposition;
    },
    diseaseTaskID() {
      return this.disease.serialnum;
    },
    taskType() {
      return this.disease.patroltasktype;
    },
    facilityType() {
      return this.disease.facilitiesname;
    },
    diseaseArea() {
      return this.disease.damagedarea;
    },
    diseaseRemark() {
      return this.disease.remarks;
    },
    reportTime() {
      if (!this.disease.patrolpointtime) {
        return '';
      }
      return this.disease.patrolpointtime;
    },
    diseaseType() {
      return this.disease.diseaseType;
    },
    patroluser() {
      return this.disease.patroluser;
    },
    diseaseLevel() {
      return this.disease.urgentlevel;
    },
    diseaseImages() {
      if (!this.disease.paths) {
        return [];
      }
      const array = this.disease.paths.split(',');
      for (const key in array) {
        array[key] = 'http://47.103.63.36:8084/FtpFile/' + array[key];
      }
      return array;
    },
    repairPerson() {
      return this.repair.teamname;
    },
    repairOrderTime() {
      if (!this.repair || !this.repair.ordertime) {
        return '';
      }
      return this.repair.ordertime;
    },
    repairArea() {
      return this.repair.repairdamagedarea;
    },
    repairImages() {
      if (!this.repair.paths) {
        return [];
      }
      const array = this.repair.paths.split(',');
      for (const key in array) {
        array[key] = 'http://47.103.63.36:8084/FtpFile/' + array[key];
      }
      return array;
    },
    repairRemark() {
      return this.repair.remarks;
    },
    timeline_discoverTime() {
      if (!this.timeline.findTime || this.timeline.findTime.length === 0) {
        return '等待完成';
      }
      return this.timeline.findTime;
    },
    timeline_repairTime() {
      if (!this.timeline.repairTime || this.timeline.repairTime.length === 0) {
        return '等待完成';
      }
      return this.timeline.repairTime;
    },
    timeline_checkTime() {
      if (!this.timeline.testTime || this.timeline.testTime.length === 0) {
        return '等待完成';
      }
      return this.timeline.testTime;
    },
  },
  watch: {
    currentShowState: function (newState) {
      if (newState) {
        this.facilityLoading = true;
        this.repairLoading = true;
        this.timeLineLoading = true;
        this.getRepairDetailInfo(this.currentFacilityId);
        this.getDiseaseDetailInfo(this.currentFacilityId);
        this.getTimeLine(this.currentFacilityId);
      }
    },
  },
  methods: {
    closePage() {
      this.$store.commit('changePointDetailState', false);
    },
    async getRepairDetailInfo(id) {
      console.log(id);
      const data = await this.$Http.getRepairDetailInfo({
        params: { PatrolPointGuid: id },
      });
      this.repairLoading = false;
      if (data[0]) {
        this.repair = data[0];
      }
    },
    async getDiseaseDetailInfo(id) {
      const data = await this.$Http.getDiseaseDetailInfo({
        params: { PatrolPointGuid: id },
      });
      this.timeLineLoading = false;
      if (data[0]) {
        this.disease = data[0];
      }
    },
    async getTimeLine(id) {
      const data = await this.$Http.getTimeLine({
        params: { guid: id },
      });
      this.facilityLoading = false;
      if (data[0]) {
        this.timeline = data[0];
      } else {
        this.timeline = {};
      }
    },
  },
};
</script>
<style lang="less" scoped>
.card-content {
  // background-color: #fff;
  backdrop-filter: blur(10px) brightness(100%);
  background-color: rgba(0, 0, 0, 0.5);
  // background-image: url('../assets/img/1140_1800.png');
  // background-size: 100% 100%;
  // backdrop-filter: blur(4px) brightness(100%);
  // background-color: rgba(0, 0, 0, 0.233);
  // border: 1px solid #fff;
}
.title-style {
  line-height: 40px;
  padding: 5px 16px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  background-color: #21868a93;
  .close {
    position: absolute;
    right: 16px;
    top: 8px;
    cursor: pointer;
  }
}
.content {
  padding: 10px 20px;
}
.ant-divider-horizontal {
  margin: 5px 0px !important;
}
.image-style {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border: 1px solid #fff;
  border-radius: 8px;
}
.footer-step {
  margin-top: 10px;
  padding: 10px 10px;
}
/deep/
  .ant-skeleton.ant-skeleton-active
  .ant-skeleton-content
  .ant-skeleton-title,
/deep/
  .ant-skeleton.ant-skeleton-active
  .ant-skeleton-content
  .ant-skeleton-paragraph
  > li {
  background: linear-gradient(90deg, #d4d3d3 25%, #999898 37%, #d4d3d3 63%);
  background-size: 400% 100%;
  -webkit-animation: ant-skeleton-loading 1.4s ease infinite;
  animation: ant-skeleton-loading 1.4s ease infinite;
}
/deep/ .ant-descriptions-bordered .ant-descriptions-item-label {
  background-color: #ffffff00;
}
/deep/.ant-descriptions-title {
  color: #fff;
  margin: 10px;
  text-align: center;
}
/deep/ .ant-spin-dot-item {
  background-color: #fff;
}
/deep/ .ant-descriptions-item-label {
  color: #fff;
}
/deep/ .ant-descriptions-item-content {
  color: #fff;
}
/deep/
  .ant-steps-item-custom.ant-steps-item-process
  .ant-steps-item-icon
  > .ant-steps-icon {
  color: #7fb9bc;
}
/deep/
  .ant-steps-item-finish
  > .ant-steps-item-container
  > .ant-steps-item-content
  > .ant-steps-item-title {
  color: #fff;
}
/deep/
  .ant-steps-item-process
  > .ant-steps-item-container
  > .ant-steps-item-content
  > .ant-steps-item-title {
  color: #fff;
}
/deep/
  .ant-steps-item-finish
  > .ant-steps-item-container
  > .ant-steps-item-content
  > .ant-steps-item-description {
  color: #fff;
}
/deep/
  .ant-steps-item-finish
  > .ant-steps-item-container
  > .ant-steps-item-content
  > .ant-steps-item-title::after {
  background-color: #7fb9bc;
}
/deep/
  .ant-steps-item-process
  > .ant-steps-item-container
  > .ant-steps-item-content
  > .ant-steps-item-description {
  color: #fff;
}
/deep/
  .ant-steps-item-wait
  > .ant-steps-item-container
  > .ant-steps-item-content
  > .ant-steps-item-title::after {
  color: #fff;
}
/deep/
  .ant-steps-item-wait
  > .ant-steps-item-container
  > .ant-steps-item-content
  > .ant-steps-item-title {
  color: #fff;
}
/deep/
  .ant-steps-item-wait
  > .ant-steps-item-container
  > .ant-steps-item-content
  > .ant-steps-item-description {
  color: #fff;
}
/deep/
  .ant-steps-item-wait
  .ant-steps-item-icon
  > .ant-steps-icon
  .ant-steps-icon-dot {
  background-color: rgb(190, 187, 187);
}
/deep/.ant-steps-item-wait .ant-steps-item-icon > .ant-steps-icon {
  color: rgb(190, 187, 187);
}
/deep/.ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
  color: #7fb9bc;
}
</style>
