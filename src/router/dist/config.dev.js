"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _MainPage = _interopRequireDefault(require("../components/MainPage"));

var _DetailCard = _interopRequireDefault(require("../components/first/DetailCard"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = [{
  path: '/',
  name: '首页',
  component: _MainPage["default"],
  redirect: 'first',
  children: [{
    path: 'first',
    name: '1',
    components: {
      left: function left() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('../components/first/LeftPage.vue'));
        });
      },
      right: function right() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('../components/first/StatisticDiseaseDetail.vue'));
        });
      },
      center: _DetailCard["default"]
    }
  }, {
    path: 'second',
    name: '2',
    components: {
      left: function left() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('../components/second/LeftPage.vue'));
        });
      },
      right: function right() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('../components/second/RightPage.vue'));
        });
      },
      center: _DetailCard["default"]
    }
  }, {
    path: 'third',
    name: '3',
    components: {
      left: function left() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('../components/third/LeftPage.vue'));
        });
      },
      right: function right() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('../components/third/RightPage.vue'));
        });
      },
      center: _DetailCard["default"]
    }
  }, {
    path: 'fourth',
    name: '4',
    components: {
      left: function left() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('../components/fourth/LeftPage.vue'));
        });
      },
      right: function right() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('../components/fourth/RightPage.vue'));
        });
      },
      center: _DetailCard["default"]
    }
  }, {
    path: 'fifth',
    name: '5',
    components: {
      left: function left() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('../components/fifth/LeftPage.vue'));
        });
      },
      right: function right() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('../components/fifth/LeftPage.vue'));
        });
      },
      center: _DetailCard["default"]
    }
  }]
}];
var _default = router;
exports["default"] = _default;