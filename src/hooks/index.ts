import { useRouter, useRoute, Router, RouteLocationNormalizedLoaded } from 'vue-router';
import { Store, useStore } from 'vuex';

interface initHook {
  store: Store<any>;
  route: RouteLocationNormalizedLoaded;
  router: Router;
}

export function useInit(): initHook {
  const router = useRouter();
  const route = useRoute();
  const store = useStore();
  
  return {
    store,
    route,
    router
  };
}
