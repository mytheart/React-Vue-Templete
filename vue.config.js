const path = require('path');

module.exports = {
  lintOnSave: 'warning',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.37.8:8069', // 齐强本地
        // target: 'http://10.43.46.186:8069', // 测试
        ws: true,
        changeOrigin: true
      }
    }
  },
  productionSourceMap: false,
  filenameHashing: false,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-px-to-viewport')({
            unitToConvert: 'px',
            viewportWidth: 375,
            unitPrecision: 3,
            viewportUnit: 'vw',
            selectorBlackList: ['.ignore'],
            minPixelValue: 1,
            mediaQuery: false
          })
        ]
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  },
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach(type =>
      addStyleResource(config.module.rule('less').oneOf(type))
    );
  },
  assetsDir: 'adminweb',
  outputDir: 'build'
};

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, './src/assets/less/index.less')]
    });
}
