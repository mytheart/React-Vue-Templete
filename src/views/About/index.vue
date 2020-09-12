<template>
  <div>
    about
    <p>
      {{ count }}
    </p>
    <button @click="addCount">++</button>
    <p>
      <button @click="router.back()">router.back</button>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, toRef } from 'vue';
import { useInit } from '@/hooks';
export default defineComponent({
  name: 'About',

  setup() {
    const { store, route, router } = useInit();
    console.log('store.state', store.state);

    function addCount() {
      store.commit('global/ADD_COUNT', 10);
      console.log(store.state.global.count);
    }

    watch(
      () => store.state.global.count,
      (now, prev) => {
        console.log('count变化了', now, prev);
      }
    );

    return {
      count: toRef(store.state.global, 'count'),
      addCount,
      router,
      route
    };
  },

  components: {}
});
</script>

<style lang="less" scoped></style>
