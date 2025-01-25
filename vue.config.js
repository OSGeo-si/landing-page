const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/', // This is the default value, you can change it to '/landing-page/' if your app is going to be hosted at https://myusername.github.io/landing-page/
  // publicPath: process.env.NODE_ENV === 'production' ? '/landing-page/' : '/',

})
