import axios from 'axios';
import service from './dataApi';
// import qs from 'qs'

const instance = axios.create({
  baseURL: '/api',
  timeout: 20000,
});
const Http = {};
for (const key in service) {
  const api = service[key];
  Http[key] = async function (params, isFormData, config = {}) {
    const url = api.url;
    let newParams = {};
    if (params && isFormData) {
      newParams = new FormData();
      for (const key in params) {
        newParams.append(key, params[key]);
      }
    } else {
      if (params && api.method === 'get') {
        newParams = { params: params };
      }
      newParams = params;
    }
    let res = {};
    try {
      res = await instance[api.method](url, newParams, config);
    } catch (err) {
      res = err;
    }
    return res;
  };
}
// 添加拦截器
// 请求拦截
instance.interceptors.request.use(
  config => {
    // config.headers = { 'Access-Control-Allow-Origin': '*' };
    // console.log(config);
    return config;
  },
  error => {
    console.log(error);
  },
);
instance.interceptors.response.use(
  res => {
    if (res.data) {
      return res.data;
    }
    return [];
  },
  () => {
    return [];
  },
);
export default Http;
