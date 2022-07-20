const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  pwa: {
    name: 'Timee',
    themeColor: '#ef4444',
    msTileColor: '#27272a',
    assetsVersion: '1.0.1',

    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    manifestOptions: {
      background_color: '#27272a',
      start_url: '/',
    },
  },
  transpileDependencies: true,
  chainWebpack: config => {
    config.plugin('eslint').tap(args => {
      args[0].fix = true
      return args
    })
  }
})
