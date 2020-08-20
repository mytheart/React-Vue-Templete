import axios from 'axios';
import { Toast } from 'vant';

import { logPlugin, showToast, clearToast, setHeaders } from '../utils';
import globalConfig from '../../config';

const http = axios.create({
  // baseURL: `http://192.168.37.8:8069`,
  baseURL: globalConfig.API_URL,
  timeout: '10000',
  method: 'post'
});

http.interceptors.request.use(
  config => {
    const { loading = true } = config;

    // 日志打印
    globalConfig.LOG_PRINT && logPlugin(config, 'request');
    // loading处理
    loading && showToast();
    // 设置请求头
    setHeaders(config);

    return config;
  },
  error => {
    console.log('request-Error', error);
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  response => {
    globalConfig.LOG_PRINT && logPlugin(response);

    clearToast();

    const { success, errMsg } = response.data;
    if (!success) {
      Toast.fail(errMsg);
    }

    return response.data;
  },
  error => {
    console.log('response-rrror', error);
    clearToast();
    return Promise.reject(error);
  }
);

export default http;
