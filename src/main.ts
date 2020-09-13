import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import { Button, Loading , DropdownMenu, DropdownItem, ShareSheet, Cell} from 'vant';

const app = createApp(App);

app
  .use(Button)
  .use(ShareSheet)
  .use(Cell)
  .use(Loading)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(store)
  .use(router)
  .mount('#app');
