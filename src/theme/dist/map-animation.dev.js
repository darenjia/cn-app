"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CircleShow = CircleShow;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* eslint-disable no-unused-vars */

/* eslint-disable no-undef */

/* 地图水波扩散特效 Start */
var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
var cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame;
/**
 * sos告警圆形范围绘制(只有存在map对象时才可以使用)
 * @param radius 半径
 * @param level 层数
 * @param point BMap.Point对象，圆的中心点
 * @param color  颜色对象，包含{fillColor,fillOpacity}
 * @constructor
 */

function CircleShow(radius, level, point, color, icon, map) {
  console.log(radius); // if (!window.map || !window.BMap || !window.BMap.Circle) {
  //   return undefined;
  // }

  this.radius = radius;
  this.level = level;
  this.point = point;
  this.color = color; // 创建 AMap.Icon 实例：
  // var mapIcon = new AMap.Icon({
  //   size: new AMap.Size(20, 20),
  //   // 图标尺寸
  //   image: icon, // Icon的图像
  //   imageSize: new AMap.Size(20, 20), // 根据所设置的大小拉伸或压缩图片
  // });
  // eslint-disable-next-line no-unused-vars
  // const marker = new AMap.Marker({
  //   map: map,
  //   icon: mapIcon,
  //   position: point,
  //   offset: new AMap.Pixel(-14, -5),
  // });

  if (Number.isNaN(this.level)) {
    this.level = 1;
  } // 至少1层


  if (!this.color || !this.color.fillColor) {
    this.color = {
      fillColor: 'blue',
      // 默认蓝色
      fillOpacity: 0.3 // 默认初始透明度0.3

    };
  } // 计算平均每段扩展距离的透明度


  this.endOpacity = 0.1; // 终止透明度设置为0.1

  this.speedOpacity = (this.color.fillOpacity - this.endOpacity) / this.radius; // 每米的透明度
  // 先加一层红色的覆盖物，加在图片上表示覆盖范围

  /* this.circle0 = new BMap.Circle(this.point,this.radius,{
        fillColor:"white",
        fillOpacity: 0.2,
        strokeWeight: 1 ,
        strokeColor:"white",
        strokeOpacity: 0.2,
        enableEditing:false
    });
    map.addOverlay(this.circle0); */
  // 按层数循环构造覆盖物，并加在图片上

  this.circles = [];

  for (var i = 1; i < this.level; i++) {
    var circle = new AMap.Circle({
      center: point,
      icon: 'direct.png',
      radius: radius,
      // 半径
      fillColor: this.color.fillColor,
      // 圆形填充颜色
      fillOpacity: 0.2,
      // 填充透明度
      strokeWeight: 1,
      strokeColor: this.color.fillColor,
      // 线条颜色，为了保证感觉无线条，和填充颜色一致即可
      strokeOpacity: 0.2,
      // 线条透明度，为了保证感觉无线条，和填充颜色透明度一致即可
      zIndex: 50
    });
    this.circles.push(circle);
    circle.setMap(map);
  }

  this.clock = new Array(this.level);
}
/**
 * 动画启动
 * @param distance 波纹间隔时间（单位ms）
 * @param t0 扩散一次所需的时间
 */


CircleShow.prototype.start = function (distance, t0) {
  var _self = this;
  /**
   * 定义动画函数
   * @param startTime 启动的初始时间
   * @param circle 圆形覆盖物对象
   * @param index 序号
   */


  function animateStart(startTime, circle, index) {
    // 计算时间差
    var time = new Date().getTime() - startTime;

    if (time < 0) {
      circle.setRadius(0); // 半径
      // circle.setFillOpacity(_self.color.fillColor);   //透明度
      // circle.setStrokeOpacity(_self.color.fillOpacity);   //透明度
      // 如果未达到执行实现则直接等待

      _self.clock[index] = window.requestAnimationFrame(animateStart.bind(null, startTime, circle, index));
      return;
    } // 计算当前半径
    // 匀减速运动下，每隔t时间，应该扩散的半径:
    // r=r0*(2*t*t0-t*t)/t0
    // 其中，r0为最终的扩散半径，即this.radius


    var r = Math.floor(_self.radius * (2 * time / t0 - time * time / t0 / t0));
    var opacity = 0;

    if (time >= t0) {
      // 达到运行时间之后
      // 设置圆形覆盖物的样式
      circle.setRadius(_self.radius); // 半径
      // circle.setFillOpacity(_self.endOpacity);    //透明度
      // circle.setStrokeOpacity(_self.endOpacity);  //透明度

      startTime = new Date().getTime() + distance; // 起始时间设置为当前时间加上1倍的时间间隔

      _self.clock[index] = window.requestAnimationFrame(animateStart.bind(null, startTime, circle, index));
    } else {
      // 计算透明度
      opacity = _self.color.fillOpacity - Number.parseFloat((_self.speedOpacity * r).toFixed(5)); // 四舍五入小数点后5位
      // 设置圆形覆盖物的样式
      // circle.setRadius(r); // 半径
      // circle.setFillOpacity(opacity); // 透明度
      // circle.setStrokeOpacity(opacity); // 透明度

      circle.setOptions({
        fillOpacity: opacity,
        strokeOpacity: opacity,
        radius: r
      });
      _self.clock[index] = window.requestAnimationFrame(animateStart.bind(null, startTime, circle, index));
    }
  } // 循环每一层执行动画


  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = this.circles.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2),
          index = _step$value[0],
          circle = _step$value[1];

      animateStart(new Date().getTime() + index * distance, circle, index);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};
/**
 * 停止动画.
 */


CircleShow.prototype.stop = function () {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = this.clock[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var caf = _step2.value;
      window.cancelAnimationFrame(caf);
    } // 重置覆盖物样式

  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = this.circles[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var circle = _step3.value;
      circle.setRadius(0); // 半径
      // circle.setFillOpacity(this.color.fillOpacity);     //透明度
      // circle.getStrokeOpacity(this.color.fillOpacity);    //透明度
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  this.clock = null;
};
/**
 * 移除覆盖物.
 */


CircleShow.prototype.remove = function (map) {
  // 停止动画
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = this.clock[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var caf = _step4.value;
      window.cancelAnimationFrame(caf);
    } // map.remove(this.circle);

  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
        _iterator4["return"]();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = this.circles[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var circle = _step5.value;
      map.remove(circle);
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
        _iterator5["return"]();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }
};
/* 地图水波扩散特效 End */