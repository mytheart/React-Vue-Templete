import { createRouter, RouteRecordRaw, createMemoryHistory } from "vue-router";
import Home from "../views/Home/index.vue";
import About from "../views/About/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: '/home'
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: About
  }
];

const router = createRouter({
  history: createMemoryHistory(),
  routes
});

export default router;
