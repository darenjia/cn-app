/* eslint-disable vue/no-unused-vars */
<template>
  <div>
    <div class="box-with-border-image card-content">
      <div class="title-style title">
        案件详情
      </div>
      <div class="content">
        <a-spin :spinning="dataLoading">
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
          <div :class="['image-content', { content2: detailMode === 1 }]">
            <div class="gallery-box">
              <!-- <div
              class="image-style"
              @click="index = 0"
              :style="{ backgroundImage: 'url(' + diseaseImages[0] + ')' }"
            ></div> -->
              <a-carousel arrows autoplay :dot-position="'top'">
                <div
                  slot="prevArrow"
                  class="custom-slick-arrow"
                  style="left: 10px; zindex: 1;"
                >
                  <a-icon type="left-circle" />
                </div>
                <div
                  slot="nextArrow"
                  class="custom-slick-arrow"
                  style="right: 10px;"
                >
                  <a-icon type="right-circle" />
                </div>
                <div
                  v-for="(item, i) in diseaseImages"
                  :key="i"
                  :class="[
                    'image-size-normal',
                    { 'image-size-big': detailMode === 1 },
                  ]"
                >
                  <img :src="item" class="image-style" @click="index = i" />
                </div>
              </a-carousel>
              <div class="base-detail">
                <span class="base-time">{{ reportTime }}</span>
                <span class="detail-content">{{ patroluser }}</span>
              </div>
            </div>
          </div>
          <div :class="['image-content', { content2: detailMode === 1 }]">
            <div class="gallery-box">
              <a-carousel arrows autoplay :dot-position="'top'">
                <div
                  slot="prevArrow"
                  class="custom-slick-arrow"
                  style="left: 10px; zindex: 1;"
                >
                  <a-icon type="left-circle" />
                </div>
                <div
                  slot="nextArrow"
                  class="custom-slick-arrow"
                  style="right: 10px;"
                >
                  <a-icon type="right-circle" />
                </div>
                <div v-for="(item, i) in repairImages" :key="i">
                  <img
                    :src="item"
                    :class="[
                      'image-style',
                      'image-size-normal',
                      { 'image-size-big': detailMode === 1 },
                    ]"
                    @click="repairIndex = i"
                  />
                </div>
              </a-carousel>
              <div class="base-detail">
                <span class="base-time">{{ repairOrderTime }}</span>
                <span class="detail-content">{{ repairPerson }}</span>
              </div>
            </div>
          </div>
        </a-spin>
        <div class="title-style" style="text-align: center;">
          {{ diseaseLocation }}
          <span class="close" @click="closePage"
            ><a-icon
              type="close-square"
              style="color: #0974869e; font-size: 16px;"
          /></span>
          <span class="close" @click="changePageMode" style="right: 52px;"
            ><a-icon
              :type="detailMode === 0 ? 'fullscreen' : 'fullscreen-exit'"
              style="color: #0974869e; font-size: 16px;"
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
      :options="options"
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
      options: {
        fullscreen: true,
      },
      repairIndex: null,
      dataLoading: true,
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
        return ['/image/images/repair_waiting1.png'];
      }
      const array = this.disease.repairPaths.split(',');
      // for (let index = 0; index < 2; index++) {
      //   array[index] = 'http://47.103.63.36:8084/FtpFile/' + array[index];
      // }
      for (const key in array) {
        array[key] = 'image/' + array[key];
      }
      return array;
    },
    repairRemark() {
      return this.repair.remarks;
    },
    diseaseData() {
      return this.disease;
    },
    detailMode() {
      return this.$store.state.detailMode;
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
        // this.disease = {};
        this.getDiseaseDetailInfo(this.currentFacilityId);
      }
    },
    currentFacilityId(newState) {
      if (this.currentShowState) {
        // this.disease = {};
        this.getDiseaseDetailInfo(this.currentFacilityId);
      }
    },
  },
  methods: {
    closePage() {
      this.$store.commit('changePointDetailState', false);
    },
    changePageMode() {
      this.$store.commit('changeDetailMode', this.detailMode === 0 ? 1 : 0);
    },
    async getDiseaseDetailInfo(id) {
      this.dataLoading = true;
      const data = await this.$Http.Map_GetPointInfo({
        params: { guid: id },
      });
      if (data[0]) {
        this.disease = data[0];
      } else {
        this.disease = {};
      }
      this.dataLoading = false;
    },
  },
};
</script>
<style lang="less" scoped>
.card-content {
  // background-color: #fff;
  width: 100%;
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
  height: 100%;
  overflow: hidden;
}
.image-style {
  width: auto;
  height: 100%;
  max-height: 400px;
  margin: auto;
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
.image-content {
  height: 200px;
  border: 1px solid #121212;
}
.content2 {
  display: inline-block;
  width: 50%;
  height: 400px;
}
.image-size-normal {
  height: 198px;
  max-height: 400px;
  overflow: hidden;
}
.image-size-big {
  height: 398px;
}
/deep/ .ant-carousel .slick-slide {
  text-align: center;
  // height: 160px;
  // line-height: 160px;
  overflow: hidden;
}
.ant-carousel .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
  z-index: 999;
}
</style>
