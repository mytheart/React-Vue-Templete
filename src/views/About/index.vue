<template>
  <div>
    about
    <p>{{ count }}</p>
    <button @click="addCount">++</button>
    <p>
      <button @click="router.back()">router.back</button>
    </p>
    <p>{{ data }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, toRef, ref, reactive, toRefs, computed } from 'vue';
import { useInit } from '@/hooks';
import { mapState } from 'vuex';
export default defineComponent({
  name: 'About',

  setup() {
    const { store, route, router } = useInit();

   const test = computed(()=>{
      return {
      ...mapState('global', ['globalName', 'count'])
    }})
    
    console.log('test', mapState('global', ['globalName', 'count']))

    function addCount() {
      store.commit('global/ADD_COUNT', 10);
      console.log(store.state.global.count);
    }

    const { data } = useRequest('11', []);

    console.log('request', data);

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
      route,
      data
    };
  },

  components: {}
});

function getData() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res([1, 2, 3]);
    }, 10000);
  });
}

function useRequest(url: string, ori: any) {
  const result = reactive({
    data: ori
  });
  new Promise((res, rej) => {
    getData()
      .then(da => {
        // res({ da });
        // data.value = da;
        // data = da;
        result.data = da;
      })
      .catch(error => {
        rej({
          error
        });
      });
  });

  return {
    ...toRefs(result)
  };
}
</script>

<style lang="less" scoped></style>
