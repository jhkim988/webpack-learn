const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * dist 에 배포된 데이터는 브라우저에서 캐싱된다. 이 때 dist 가 변경되는 경우 캐시를 컨트롤 해야한다.
 * output.filename 의 substitutions(대괄호)을 이용하여 출력 파일 이름 지정
 * [contenthash]: 애셋의 컨텐츠에 따라 고유한 해시 추가
 *
 * 여러 개의 entry 에 대해 단일 런타임 번들을 생성
 * optimization: {
 *  runtimeChunk: 'single',
 * }
 * 
 * lodash, react 등 타사 라이브러리는 변경될 가능성이 적기 때문에 별도의 vendor chunk 로 추출
 * optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
 * 
 * index.js 를 바꾸면 main 의 해시만 바뀌어야 하지만, runtime 과 vendor 도 바뀐다.(vendor 는 바뀔 필요가 없음. 바뀌지 않으면 브라우저에서 캐싱 이용함)
 * module.id 가 해석 순서에 따라 증가하기 때문에, 해석 순서가 변경되면 ID 도 변경된다.
 * 즉, main 번들 변경 -> module.id 가 바뀌어 vendor 번들 변경 -> runtime 번들은 새로운 모듈 참조를 포함하므로 변경
 * { moduleIds: "deterministic" } 옵션을 이용하여 해결한다. -> index.js 를 바꾸어도 vendor 의 해시가 바뀌지 않음을 확인할 수 있다.
 */

module.exports = {
  entry: "./src/index.js",
  plugins: [new HtmlWebpackPlugin({ title: "Cacheing" })],
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  optimization: {
    moduleIds: "deterministic",
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
};
