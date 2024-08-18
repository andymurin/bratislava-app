const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].VUE_APP_API_KEY = process.env.VUE_APPAPI_KEY;
      return args;
    });
  },
});
