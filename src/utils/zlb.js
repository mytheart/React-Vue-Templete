import Vue from 'vue';
import { Toast } from 'vant';
import { parse } from 'qs';

import config from '../../config';
import { hex_md5 } from '../assets/lib/md5';

Vue.use(Toast);

/**
 * 获取页面请求参数
 */
export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

/**
 * 补零格式化
 *
 * @param {number|string} n 字符
 * @returns
 */
export function formatNumber(n) {
  n = n.toString(); // eslint-disable-line

  return n[1] ? n : `0${n}`;
}

/**
 * 日期格式化
 * 不传递参数时，获取当前日期
 *
 * @param {string} t 日期
 * @returns yyyy-mm-dd hh:mm:ss
 */
export function formatTime(t, s1 = '-', s2 = ':') {
  const date = t ? new Date(t) : new Date();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return `${[year, month, day].map(formatNumber).join(s1)} ${[
    hour,
    minute,
    second
  ]
    .map(formatNumber)
    .join(s2)}`;
}

/**
 * loading 加载
 *
 * @param  {string} msg 加载提示信息
 */
export function showLoading(msg) {
  const message = msg || '加载中...';

  Toast.loading({
    duration: 0,
    forbidClick: true,
    loadingType: 'spinner',
    message
  });
}

// 清除 loading
export function clearLoading() {
  Toast.clear();
}

/**
 * 信息提示
 *
 * @param  {string} message 提示信息
 * @param  {string} type 类型，可选 fail、success 和 html
 */
export function showToast(message, type) {
  Toast({
    type,
    message
  });
}

// 浙里办开发配置
const appDevHeader = {
  // name: '浙里办测试',
  appId: '16CC8654C',
  dataSources: '3',
  token: '31E92846ADD20400B25AEAB6AB442289'
};

// 浙里办正式配置
const appProdHeader = {
  // name: '浙里办小程序',
  appId: '5B55A65AC',
  dataSources: '3',
  token: '66821E8A880EE9B3AD5A2C5969C37878'
};

const appHeader = config.env === 'pro' ? appProdHeader : appDevHeader;

// 请求公用头部信息
export const requestHeaders = {
  organizationId: '002485195',
  // appId: '4B88B64D4',
  // dataSources: '3',
  // token: '123',
  ...appHeader
};

/**
 * 格式化请求 headers
 *
 * @param {string} TradeCode 交易 code
 */
export function formatHeaders(TradeCode) {
  const { organizationId, appId, dataSources, token } = requestHeaders;

  return `${organizationId}${appId}${token}${dataSources}${TradeCode}${formatTime()}`;
}

/**
 * 生成签名对象数据
 *
 * @param {*} tradeCode 接口交易码
 * @param {*} app app对象
 */
export function getSign(tradeCode) {
  return {
    tradeCode,
    RequestTime: formatTime(),
    sign: hex_md5(formatHeaders(tradeCode)).toUpperCase()
  };
}

/**
 * 生成统一请求头部
 *
 * @param  {string} tradeCode 接口交易码
 */
export function getHeaders(tradeCode, opts = {}) {
  const { dataSources } = opts;

  const target = {
    ...requestHeaders,
    ...getSign(tradeCode)
  };

  if (dataSources) {
    target.dataSources = dataSources;
  }

  return target;
}

/**
 * 浙里办 APP，在一个新的窗口加载一个新的页面
 *
 * @param  {string} url 加载路径
 */
export function openLink(url) {
  // eslint-disable-next-line no-undef
  dd.ready(
    {
      developer: 'daip@dtdream.com',
      usage: ['dd.biz.util.openLink'],
      remark: '打开窗口'
    },
    function() {
      // eslint-disable-next-line no-undef
      dd.biz.util.openLink({
        url
      });
    }
  );
}
