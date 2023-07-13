const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.js",
    print: "./src/print.js",
  },

  /* HtmlWebPackPlugin 이 index.html 을 생성하고 자동으로 모든 번들이 추가된다. */
  plugins: [
    new HtmlWebpackPlugin({
      title: "Output Management",
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    /* 빌드 전에 dist 폴더를 정리 한다.*/
    clean: true,
  },
};
/* Manifest - webpack 의 output 을 다른 방식으로 관리. WebpackManifestPlugin 로 메니페스트 데이터를 json 으로 추출할 수 있다. */
