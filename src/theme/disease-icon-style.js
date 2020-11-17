/* eslint-disable no-undef */
// 创建样式对象
// 0-15
const baseUrl = '/image';
// const baseUrl = 'http://47.103.63.36:8084/FtpFile';
function createStyle() {
  return [
    {
      // 0
      url: baseUrl + '/images/cicle_yellow.png',
      anchor: new AMap.Pixel(7, 7),
      size: new AMap.Size(14, 14),
    },

    {
      // 1
      url: baseUrl + '/images/Marker9.svg',
      anchor: new AMap.Pixel(8, 16),
      size: new AMap.Size(16, 16),
    },
    {
      // 2
      url: baseUrl + '/images/cicle_green.png',
      anchor: new AMap.Pixel(7, 7),
      size: new AMap.Size(14, 14),
    },
  ];
}

export default createStyle;
