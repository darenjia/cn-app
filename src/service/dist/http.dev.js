"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _dataApi = _interopRequireDefault(require("./dataApi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import qs from 'qs'
var instance = _axios["default"].create({
  baseURL: '/api',
  timeout: 20000
});

var Http = {};

var _loop = function _loop(key) {
  var api = _dataApi["default"][key];

  Http[key] = function _callee(params, isFormData) {
    var config,
        url,
        newParams,
        _key,
        res,
        _args = arguments;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            config = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
            url = api.url;
            newParams = {};

            if (params && isFormData) {
              newParams = new FormData();

              for (_key in params) {
                newParams.append(_key, params[_key]);
              }
            } else {
              if (params && api.method === 'get') {
                newParams = {
                  params: params
                };
              }

              newParams = params;
            }

            res = {};
            _context.prev = 5;
            _context.next = 8;
            return regeneratorRuntime.awrap(instance[api.method](url, newParams, config));

          case 8:
            res = _context.sent;
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](5);
            res = _context.t0;

          case 14:
            return _context.abrupt("return", res);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[5, 11]]);
  };
};

for (var key in _dataApi["default"]) {
  _loop(key);
} // 添加拦截器
// 请求拦截


instance.interceptors.request.use(function (config) {
  // config.headers = { 'Access-Control-Allow-Origin': '*' };
  // console.log(config);
  return config;
}, function (error) {
  console.log(error);
});
instance.interceptors.response.use(function (res) {
  if (res.data) {
    return res.data;
  }

  return [];
}, function () {
  return [];
});
var _default = Http;
exports["default"] = _default;