/* eslint-disable no-undef */
// 创建样式对象
// 0-15
const baseUrl = '/image';
// const baseUrl = 'http://47.103.63.36:8084/FtpFile';
function createStyle() {
  return [
    {
      // 0
      url: baseUrl + '/images/point3.png',
      anchor: new AMap.Pixel(3, 3),
      size: new AMap.Size(6, 6),
    },

    {
      // 1
      url: baseUrl + '/images/Marker9.svg',
      anchor: new AMap.Pixel(3, 3),
      size: new AMap.Size(20, 20),
    },
    {
      // 2
      url: baseUrl + '/images/point4.png',
      anchor: new AMap.Pixel(3, 3),
      size: new AMap.Size(6, 6),
    },
  ];
}

export default createStyle;
