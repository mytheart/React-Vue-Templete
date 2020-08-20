import { Toast } from 'vant';
import { hex_md5 } from './md5';
import settings from '../../settings';
import store from '../store';

/**
 * 防抖
 * @param {f} handle
 * @param {*} delay
 */
export function debounce(handle, delay = 200) {
  var timer = null;
  return function() {
    var _self = this,
      _args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      handle.apply(_self, _args);
    }, delay);
  };
}

/**
 * 打印请求/响应日志
 * @param {*} response axios请求/响应参数
 * @param {*} type 类型
 */
export function logPlugin(response = {}, type = 'response') {
  if (type === 'response') {
    const {
      config: { url },
      data
    } = response;
    console.log(`r-${url}`, data);
  } else {
    const { url, data } = response;
    console.log(`c-${url}`, data);
  }
}

/**
 * 显示loading
 * @param {*} config vant Loading配置
 */
export function showToast(config = {}) {
  Toast({
    type: 'loading',
    message: '加载中...',
    duration: 0,
    forbidClick: true,
    ...config
  });
}

/**
 * 清除loading
 */
export function clearToast() {
  Toast.clear();
}

/**
 * 缓存Vuex里的数据，解决页面刷新Vuex数据丢失问题
 * @param {*} type 缓存方式 sessionStorage 和 localStorage ,默认是sessionStorage
 */
export function cacheVuex(store, type = sessionStorage) {
  if (type.getItem('_store')) {
    store.replaceState(
      Object.assign({}, store.state, JSON.parse(type.getItem('_store')))
    );
  }
  window.addEventListener('beforeunload', () => {
    type.setItem('_store', JSON.stringify(store.state));
  });
}

export function setHeaders(config = {}) {
  const timestamp = +new Date();
  const headers = {
    'bq-timestamp': timestamp,
    'bq-sign': hex_md5(`${settings.appid}${timestamp}${config.url}`),
    'bq-user-info': store.state.global.adminInfo.infoKey
  };

  config.headers = {
    ...config.headers,
    ...headers
  };
}

/**
 * 对象处理，避免将undefined和null都转换成''，避免页面显示null或undefined
 */
export function nullTran(obj = {}) {
  const temp = [null, undefined, 'null', 'undefined'];
  Object.keys(obj).forEach(el => {
    obj[el] = temp.includes(obj[el]) ? '' : obj[el];
  });
}

/**
 * 深拷贝
 * @param {*} obj
 */
export function deepClone(obj = {}) {
  return JSON.parse(JSON.stringify(obj));
}
