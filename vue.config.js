const path = require("path");

/**
 * @type {import("@vue/cli-service").ProjectOptions}
 */
module.exports = {
  transpileDependencies: true,
  configureWebpack: {
    devtool: "source-map",
  },
};
