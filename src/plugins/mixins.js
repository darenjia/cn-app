import mqtt from 'mqtt';
export default {
  data() {
    return {
      client: {},
    };
  },
  methods: {
    mqttMsg() {
      if (!this.$options.openMqTT) {
        return;
      }
      const options = {
        connectTimeout: 40000,
        username: 'cnmq',
        password: 'cnmq',
        clean: true,
      };
      var client = (this.client = mqtt.connect(
        'ws://47.103.63.36:15675/ws',
        options,
      ));
      this.client.on('connect', e => {
        console.log('连接成功！！！');
        client.subscribe('tongzhi123', { qos: 0 }, error => {
          if (!error) {
            console.log('订阅成功');
          } else {
            console.log('订阅失败');
          }
        });
      });
      // 接收消息处理
      this.client.on('message', (topic, message) => {
        console.log('收到来自', topic, '的消息', message.toString());
        if (this.receiveMessageSuccess) {
          this.receiveMessageSuccess(message.toString());
        }
      });
    },
  },
  mounted: function () {
    if (this.$options.openMqTT) {
      this.mqttMsg();
    }
  },
  beforeDestory() {
    if (this.client && this.client.connected) {
      this.client.end();
    }
  },
};
