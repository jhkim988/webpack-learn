const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
/**
 * webpack 4 에서 web worker 설정 방법 - worker loader 설정
 * webpack 5 에서는 worker loader 가 내장돼 있기 때문에 설정할 필요 없다.
 */

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  // module: {
  //   /* 이름이 .worker.js 로 끝나는 파일들을 대상으로 한다. */
  //   rules: [{ test: /\.worker\.js$/, use: { loader: "worker-loader" } }],
  // },
  plugins: [new HtmlWebpackPlugin({ title: "Web Workers" })],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    // clean: true,
  },
};
