const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.js",
    print: "./src/print.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Progressive Web Applications",
    }),
    // new WorkboxPlugin.GenerateSW({
    //   clientsClaim: true,
    //   skipWaiting: true,
    // }), // build 하면 service-worker.js 와 precache-manifest 가 생긴다. (workbox.js?)

    new WorkboxPlugin.InjectManifest({
      swSrc: path.resolve(__dirname, "my-service-worker.js"),
      //   swDest: "my-service-worker.js",
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
