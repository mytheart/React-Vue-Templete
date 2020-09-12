<template>
  <div>
    <van-button type="primary" @click="onClick">toHome</van-button>
    <van-button type="primary" @click="onTest">onTest</van-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useInit } from '@/hooks';

export default defineComponent({
  name: 'Home',

  setup() {
    const { store, router, route } = useInit();

    console.log('router', router);

    console.log('route', route)

    console.log(store.state);

    function onClick() {
      console.log('click');
      router.push('/about');
    }

    function onTest() {
      store.commit('SET_DATA', { name: 'xtx', age: '17' });
    }

    return {
      onClick,
      onTest
    };
  },

  components: {}
});
</script>

<style lang="less" scoped></style>
