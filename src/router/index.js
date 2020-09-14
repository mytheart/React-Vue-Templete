import Vue from 'vue';
import VueRouter from 'vue-router';

import settings from '../../settings';

import Home from '../views/Home';
import About from '../views/About';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: settings.prefix
  },
  {
    path: `${settings.prefix}`,
    name: 'Home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    path: `${settings.prefix}/about`,
    name: 'About',
    component: About,
    meta: {
      title: 'About'
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  next();
});

export default router;
