"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/* eslint-disable no-undef */
// 创建样式对象
// 0-15
var baseUrl = '/image'; // const baseUrl = 'http://47.103.63.36:8084/FtpFile';

function createStyle() {
  return [{
    // 0
    url: baseUrl + '/images/大理石球.png',
    anchor: new AMap.Pixel(3, 3),
    size: new AMap.Size(11, 11)
  }, {
    // 1
    url: baseUrl + '/images/大理石柱.png',
    anchor: new AMap.Pixel(3, 3),
    size: new AMap.Size(11, 11)
  }, {
    // 2
    url: baseUrl + '/images/钢柱阻挡物.png',
    anchor: new AMap.Pixel(3, 3),
    size: new AMap.Size(11, 11)
  }, {
    // 7 过水雨水口
    url: baseUrl + '/images/过水雨水口.png',
    anchor: new AMap.Pixel(3, 3),
    size: new AMap.Size(11, 11)
  }, {
    // 3
    url: baseUrl + '/images/路名牌.png',
    anchor: new AMap.Pixel(3, 3),
    size: new AMap.Size(11, 11)
  }, {
    // 4
    url: baseUrl + '/images/桥墩.png',
    anchor: new AMap.Pixel(3, 3),
    size: new AMap.Size(11, 11)
  }, {
    // 5
    url: baseUrl + '/images/桥名立碑.png',
    anchor: new AMap.Pixel(3, 3),
    size: new AMap.Size(11, 11)
  }, {
    // 6
    url: baseUrl + '/images/弱电箱.png',
    anchor: new AMap.Pixel(3, 3),
    size: new AMap.Size(11, 11)
  }, {
    // 8 市政90型合流井
    url: baseUrl + '/images/市政90型合流井.png',
    anchor: new AMap.Pixel(3, 3),
    size: new AMap.Size(11, 11)
  }, {
    // 9 市政90型污水井
    url: baseUrl + '/images/市政90型污水井.png',
    anchor: new AMap.Pixel(3, 3),
    size: new AMap.Size(11, 11)
  }, {
    // 10 市政90型雨水井
    url: baseUrl + '/images/市政90型雨水井.png',
    anchor: new AMap.Pixel(3, 3),
    size: new AMap.Size(11, 11)
  }, {
    // 11 市政方井
    url: baseUrl + '/images/市政方井.png',
    anchor: new AMap.Pixel(3, 3),
    size: new AMap.Size(11, 11)
  }, {
    // 12 市政红白立杆
    url: baseUrl + '/images/市政红白立杆.png',
    anchor: new AMap.Pixel(3, 3),
    size: new AMap.Size(11, 11)
  }, {
    // 13 市政桥梁限载牌
    url: baseUrl + '/images/市政桥梁限载牌.png',
    anchor: new AMap.Pixel(3, 3),
    size: new AMap.Size(11, 11)
  }, {
    // 14 雨水检查井
    url: baseUrl + '/images/雨水检查井.png',
    anchor: new AMap.Pixel(3, 3),
    size: new AMap.Size(11, 11)
  }, {
    // 15 雨水口
    url: baseUrl + '/images/雨水口.png',
    anchor: new AMap.Pixel(3, 3),
    size: new AMap.Size(11, 11)
  }];
}

var _default = createStyle;
exports["default"] = _default;