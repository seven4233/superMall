const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {

    // devServer: {
    //   open: true,
    //   host: 'localhost'
    // }
  }
})
