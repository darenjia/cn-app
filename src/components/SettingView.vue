<template>
  <div class="setting-parent">
    <div class="filter-bg setting" @click="showMenu">
      <a-icon type="setting" style="color: #ffffff; font-size: 18px;" />
      <a-divider type="vertical" />
      <a-icon type="unordered-list" style="color: #ffffff; font-size: 18px;" />
    </div>
    <div :class="[{ hide: !menuState }, 'show-setting']">
      <div class="filter-bg setting-content">
        <p>
          <span>显示排行榜</span>
          <span class="switch-btn"
            ><a-switch
              checked-children="开"
              un-checked-children="关"
              v-model="showRankList"
              @change="rankStateChange"
          /></span>
        </p>
        <p>
          <span>显示统计量</span>
          <span class="switch-btn"
            ><a-switch
              checked-children="开"
              un-checked-children="关"
              v-model="showStatistic"
              @change="statisticStateChange"
          /></span>
        </p>
        <p>
          显示统计图
          <span class="switch-btn">
            <a-switch
              checked-children="开"
              un-checked-children="关"
              v-model="showStatisticGraph"
              @change="statisticGraphStateChange"
            />
          </span>
        </p>
        <h6 class="divider"></h6>
        <p>
          地图移动
          <span class="switch-btn">
            <a-switch
              checked-children="开"
              un-checked-children="关"
              default-checked
              @change="mapStateChange"
            />
          </span>
        </p>
        <p>
          地图模式
        </p>
        <p>
          <a-checkbox-group
            v-model="checkedList"
            :options="plainOptions"
            @change="onChange"
          />
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SettingView',
  data() {
    return {
      isMenuShow: false,
      showRankList: true,
      showStatistic: true,
      showStatisticGraph: true,
      checkedList: [],
      plainOptions: ['设施', '病害', '维修', '人员'],
    };
  },
  created() {
    const store = this.$store.state;
    if (store.mapShowFacility) {
      this.checkedList.push('设施');
    }
    if (store.mapShowDisease) {
      this.checkedList.push('病害');
    }
    if (store.mapShowTask) {
      this.checkedList.push('维修');
    }
    if (store.mapShowPerson) {
      this.checkedList.push('人员');
    }
    this.showRankList = store.showRankList;
    this.showStatistic = store.showStatistic;
    this.showStatisticGraph = store.showStatisticGraph;
  },
  computed: {
    menuState() {
      return this.isMenuShow;
    },
  },
  methods: {
    onChange(checkedValue) {
      this.$store.commit('changeMapType', checkedValue.toString());
    },
    rankStateChange(checked) {
      this.$store.commit('changeRankListState', checked);
    },
    statisticStateChange(checked) {
      this.$store.commit('changeStatisticState', checked);
    },
    mapStateChange(checked) {
      this.$store.commit('changeMapTask', checked ? 0 : 1);
    },
    showMenu() {
      this.isMenuShow = !this.isMenuShow;
    },
    statisticGraphStateChange(checked) {
      this.$store.commit('changeStatisticGraphState', checked);
    },
  },
};
</script>
<style lang="less" scoped>
.setting {
  cursor: pointer;
  top: auto;
  bottom: 0px;
  border-radius: 5px;
  text-align: center;
  line-height: 36px;
}
.show-setting {
  width: 160px;
  position: absolute;
  top: -268px;
  left: -40px;
  color: #ffffff;
  .setting-content {
    position: relative;
    padding: 10px;
  }
  .switch-btn {
    float: right;
  }
  .divider {
    height: 1px;
    background-color: #ffffff;
  }
  .setting-parent {
    position: relative;
  }
  /deep/ .ant-checkbox-group {
    .ant-checkbox-wrapper {
      color: #ffffff !important;
    }
  }
}
.hide {
  display: none;
}
</style>
