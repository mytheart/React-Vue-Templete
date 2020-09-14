<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { cacheVuex } from '@/utils';
export default {
  name: 'App',
  data() {
    return {
      keepAlive: []
    };
  },
  created() {
    cacheVuex(this.$store);
  }
};
</script>
