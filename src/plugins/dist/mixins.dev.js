"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mqtt = _interopRequireDefault(require("mqtt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  data: function data() {
    return {
      client: {}
    };
  },
  methods: {
    mqttMsg: function mqttMsg() {
      var _this = this;

      if (!this.$options.openMqTT) {
        return;
      }

      var options = {
        connectTimeout: 40000,
        username: 'cnmq',
        password: 'cnmq',
        clean: true
      };

      var client = this.client = _mqtt["default"].connect('ws://47.103.63.36:15675/ws', options);

      this.client.on('connect', function (e) {
        console.log('连接成功！！！');
        client.subscribe('tongzhi123', {
          qos: 0
        }, function (error) {
          if (!error) {
            console.log('订阅成功');
          } else {
            console.log('订阅失败');
          }
        });
      }); // 接收消息处理

      this.client.on('message', function (topic, message) {
        console.log('收到来自', topic, '的消息', message.toString());

        if (_this.receiveMessageSuccess) {
          _this.receiveMessageSuccess(message.toString());
        }
      });
    }
  },
  mounted: function mounted() {
    if (this.$options.openMqTT) {
      this.mqttMsg();
    }
  },
  beforeDestory: function beforeDestory() {
    if (this.client && this.client.connected) {
      this.client.end();
    }
  }
};
exports["default"] = _default;