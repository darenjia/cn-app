<template>
  <div class="setting-parent">
    <div class="filter-bg setting" @click="showMenu">
      <a-icon type="setting" style="color: #ffffff; font-size: 18px;" />
      <a-divider type="vertical" />
      <a-icon type="unordered-list" style="color: #ffffff; font-size: 18px;" />
    </div>
    <div :class="[{ hide: menuState }, 'show-setting']">
      <div class="filter-bg setting-content">
        <p>
          <span>显示排行榜</span>
          <span class="switch-btn"
            ><a-switch
              checked-children="开"
              un-checked-children="关"
              default-checked
              @change="rankStateChange"
          /></span>
        </p>
        <p>
          <span>显示统计量</span>
          <span class="switch-btn"
            ><a-switch
              checked-children="开"
              un-checked-children="关"
              default-checked
              @change="statisticStateChange"
          /></span>
        </p>
        <p>
          显示统计图
          <span class="switch-btn">
            <a-switch
              checked-children="开"
              un-checked-children="关"
              default-checked
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
      isMenuShow: true,
      checkedList: ['设施'],
      plainOptions: ['设施', '病害', '维修', '人员'],
    };
  },
  computed: {
    menuState() {
      return this.isMenuShow;
    },
  },
  methods: {
    onChange(checkedValues) {
      console.log(this.checkedList);
      this.$store.commit(
        'changeMapFaciity',
        checkedValues.indexof('设施') === -1,
      );
      this.$store.commit(
        'changeMapDisease',
        checkedValues.indexof('病害') === -1,
      );
      this.$store.commit('changeMapTask', checkedValues.indexof('维修') === -1);
      this.$store.commit(
        'changeMapPerson',
        checkedValues.indexof('人员') === -1,
      );
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
