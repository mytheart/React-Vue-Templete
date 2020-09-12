<template>
  <div>
    <van-button icon="plus" type="primary">按钮</van-button>
    <van-loading /> 
    <van-loading type="spinner" />

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: '',

  setup() {
    test();
    return {};
  },

  components: {}
});

function test() {}
</script>

<style lang="less" scoped></style>
