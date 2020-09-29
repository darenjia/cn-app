<template>
  <div>
    <div class="box-with-border-image card-content">
      <div class="title-style title">
        案件详情
      </div>
      <div class="content">
        <div class="content1">
          <div class="detail">
            <span class="detail-content"
              ><span class="des des1">{{ taskType }}</span>
              <span class="des des2" v-if="facilityType"
                >{{ facilityType }} </span
              ><span class="des des3">{{ diseaseType }}</span></span
            >
          </div>
        </div>
        <div class="content2">
          <div class="gallery-box">
            <div
              class="image-style"
              @click="index = 0"
              :style="{ backgroundImage: 'url(' + diseaseImages[0] + ')' }"
            ></div>

            <div class="base-detail">
              <span class="base-time">{{ reportTime }}</span>
              <span class="detail-content">{{ patroluser }}</span>
            </div>
          </div>
        </div>
        <div class="content2">
          <div class="gallery-box">
            <div
              class="image-style"
              @click="repairIndex = 0"
              :style="{ backgroundImage: 'url(' + repairImages[0] + ')' }"
            ></div>
            <div class="base-detail">
              <span class="base-time">{{ repairOrderTime }}</span>
              <span class="detail-content">{{ repairPerson }}</span>
            </div>
          </div>
        </div>

        <div class="title-style" style="text-align: center;">
          {{ diseaseLocation }}
          <span class="close" @click="closePage"
            ><a-icon type="close" style="color: #0974869e; font-size: 16px;"
          /></span>
        </div>
      </div>
    </div>
    <gallery
      id="gallery"
      :images="repairImages"
      :index="repairIndex"
      @close="repairIndex = null"
    ></gallery>
    <gallery
      id="gallery1"
      :images="diseaseImages"
      :index="index"
      @close="index = null"
    ></gallery>
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
      disease: {},
      repair: {},
      timeline: {},
      index: null,
      repairIndex: null,
    };
  },
  computed: {
    currentShowState() {
      return this.$store.state.showPointDetail;
    },
    currentFacilityId: function () {
      return this.$store.state.currentPointID;
    },
    currentDiseaseDetail() {
      return this.$store.state.diseaseDetail;
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
      if (this.disease.facilityposition) {
        return this.disease.facilityposition;
      }
      return this.disease.anjiandidian;
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
      if (!this.disease.findTime) {
        return '';
      }
      return this.disease.findTime;
    },
    diseaseType() {
      if (this.disease.diseaseType) {
        return this.disease.diseaseType;
      }
      return this.disease.anjianleixing;
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
      // for (let index = 0; index < 2; index++) {
      //   paths.push('http://47.103.63.36:8084/FtpFile/' + array[index]);
      // }
      for (const key in array) {
        array[key] = 'http://47.103.63.36:8084/FtpFile/' + array[key];
      }
      return array;
    },
    repairPerson() {
      return this.disease.repairusername;
    },
    repairOrderTime() {
      if (!this.disease.repairTime) {
        return '等待维修';
      }
      return this.disease.repairTime;
    },
    repairArea() {
      return this.repair.repairdamagedarea;
    },
    repairImages() {
      if (!this.disease.repairPaths) {
        return ['/image/images/repair_waiting2.png'];
      }
      const array = this.disease.repairPaths.split(',');
      // for (let index = 0; index < 2; index++) {
      //   array[index] = 'http://47.103.63.36:8084/FtpFile/' + array[index];
      // }
      for (const key in array) {
        array[key] = 'http://47.103.63.36:8084/FtpFile/' + array[key];
      }
      return array;
    },
    repairRemark() {
      return this.repair.remarks;
    },
    diseaseData() {
      return this.disease;
    },
  },
  watch: {
    currentShowState: function (newState) {
      if (newState) {
        // if (this.currentDiseaseDetail) {
        //   this.disease = this.currentDiseaseDetail;
        // } else {
        //   this.getRepairDetailInfo(this.currentFacilityId);
        // }
        this.disease = {};
        this.getDiseaseDetailInfo(this.currentFacilityId);
      }
    },
    currentFacilityId(newState) {
      if (this.currentShowState) {
        this.disease = {};
        this.getDiseaseDetailInfo(this.currentFacilityId);
      }
    },
  },
  methods: {
    closePage() {
      this.$store.commit('changePointDetailState', false);
    },
    async getDiseaseDetailInfo(id) {
      const data = await this.$Http.Map_GetPointInfo({
        params: { guid: id },
      });
      if (data[0]) {
        this.disease = data[0];
      }
    },
  },
};
</script>
<style lang="less" scoped>
.card-content {
  // background-color: #fff;
  width: 300px;
  padding: 10px 0px 0px;
  border-radius: 20px;
  backdrop-filter: blur(10px) brightness(100%);
  background-color: rgba(0, 0, 0, 0);
  // background-image: url('../assets/img/1140_1800.png');
  // background-size: 100% 100%;
  // backdrop-filter: blur(4px) brightness(100%);
  // background-color: rgba(0, 0, 0, 0.233);
  // border: 1px solid #fff;
}
.title-style {
  line-height: 30px;
  padding: 5px 16px;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  .close {
    position: absolute;
    right: 16px;
    top: 16px;
    cursor: pointer;
  }
}
.content {
  padding: 10px 4px;
}
.ant-divider-horizontal {
  margin: 5px 0px !important;
}
.gallery-box {
  position: relative;
  height: 200px;
}
.image-style {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: 100% auto;
  background-repeat: no-repeat;
}
.base-detail {
  height: 40px;
  width: 100%;
  bottom: 0px;
  left: 0px;
  line-height: 40px;
  position: absolute;
  background-color: #162223c9;
}
.footer-step {
  margin-top: 10px;
  padding: 10px 10px;
}
.base-time {
  height: 40px;
  padding: 2px 10px;
}
.content1 {
}
.title {
  font-size: 16px;
  color: #d6a20d;
}

.content {
  color: #fff;
  font-size: 12px;
  .detail {
    span {
      display: inline-block;
    }
    .detail-title {
      position: relative;
      height: 100%;
      font-weight: 700;
    }
    .detail-content {
      right: 0px;
      position: relative;
      margin-bottom: 10px;
      .des {
        padding: 2px 8px;
        margin: 2px 4px 2px 10px;
        border: 1px solid transparent;
        border-radius: 10px;
        border-color: skyblue;
      }
      // .des1 {
      //   border-color: antiquewhite;
      // }
      // .des2 {
      //   border-color: salmon;
      // }
      // .des3 {
      //   border-color: skyblue;
      // }
    }
  }
}
</style>
