const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
    print: "./src/print.js",
  },
  /* 오류가 발생하면 bundle.js 의 위치를 가리키므로 추적하기가 어렵다. JS는 소스맵(컴파일 된 코드를 원래 소스로 매핑) 을 제공한다. print.js 에 에러 냄 */
  devtool: "inline-source-map",
  devServer: {
    /* webpack-dev-server, 번들된 파일 접근 주소: http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename] */
    /* webpack-dev-server 는 컴파일 후 출력 파일을 작성하지 않는다. 메모리에 보관하고, 서버의 루트 경로에 마운트 된 실제 파일인 것처럼 제공한다. devMiddleware.publicPath 옵션을 사용하여 변경 가능. */
    static: "./dist",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Development",
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  optimization: {
    /* webpack-dev-server, entry 가 여러 개일 때 발생하는 문제를 방지 */
    runtimeChunk: "single",
  },
};

/**
 * 코드가 변경될 때마다 자동으로 컴파일
 * 1. watch 모드: 디펜던시 그래프 내의 모든 파일에서의 변경사항을 감시하도록 지시할 수 있다. (webpack --watch) 브라우저를 새로고침 해야한다.
 * 2. webpack-dev-server
 * 3. webpack-dev-middleware
 */
