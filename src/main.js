import Vue from 'vue';
// import VuePageStack from 'vue-page-stack';
import App from './App.vue';
import router from './router';
import store from './store';
import http from './http';
import settings from '../settings';
import config from '../config';
import { Row, Col } from 'vant';

import '@/assets/less/reset.less';
import '@/assets/less/index.less';

// Vue.use(VuePageStack, { router });

// 开发环境下面使用vConsole进行调试
if (config.VCONSOLE) {
  const VConsole = require('vconsole');
  new VConsole();
}

Vue.use(Row).use(Col);

Vue.config.productionTip = false;

Vue.prototype.$http = http;
Vue.prototype.$settings = settings;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
