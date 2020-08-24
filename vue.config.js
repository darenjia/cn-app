// const path = require('path');
module.exports = {
  assetsDir: './',
  publicPath: '',
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.200.67:8111', // 后端接口地址
        changeOrigin: true, // 是否允许跨越
        pathRewrite: {
          '^/api': '', // 重写,
        },
      },
      '/image': {
        target: 'http://47.103.63.36:8084', // 后端接口地址
        changeOrigin: true, // 是否允许跨越
        pathRewrite: {
          '^/image': '/FtpFile', // 重写,
        },
      },
    },
  },
  transpileDependencies: ['vue-echarts', 'resize-detector'],
};
