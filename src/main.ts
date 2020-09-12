import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import { Button, Loading } from 'vant';

const app = createApp(App);

app
  .use(Button)
  .use(Loading)
  .use(store)
  .use(router)
  .mount('#app');
