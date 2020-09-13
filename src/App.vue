<template>
  <van-cell title="显示分享面板" @click="showShare = true" />

  <van-share-sheet
    v-model:show="showShare"
    title="立即分享给好友"
    :options="options"
  />

  <router-view />
</template>

<script>
export default {
  data() {
    return {
      showShare: false,
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' }
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' }
        ]
      ]
    };
  }
};
</script>

<style lang="less">
@import './assets/less/reset.less';
</style>
