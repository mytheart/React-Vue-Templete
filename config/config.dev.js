// 鹊接口地址
const API_URL = '';
// const API_URL = 'http://192.168.37.8:8069';

// 埋点上报 url
const REPORT_URL = '';

const LOG_PRINT = true;

const VCONSOLE = true;

const ENV = 'dev';

// 开发环境下不掉 浙政钉获取code 和 获取管理员用户信息接口，可直接在浏览器中调试
const ADMIN_INFO = ((level = 3) => {
  return {
    cityCode: '330100',
    cityName: '杭州市',
    countyCode: level === 3 ? '330102' : '',
    countyName: level === 3 ? '上城区' : '',
    infoKey: '05f10adc8c4048eb8c46533f5c0fc578',
    level,
    provinceCode: '330000',
    provinceName: '浙江省'
  };
})();

const config = {
  ENV,
  API_URL,
  REPORT_URL,
  ADMIN_INFO,
  LOG_PRINT,
  VCONSOLE
};

export default config;
