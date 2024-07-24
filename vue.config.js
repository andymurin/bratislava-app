const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].VUE_APP_GOOGLE_API_KEY = process.env.VUE_APP_GOOGLE_API_KEY;
      return args;
    });
  },
});
