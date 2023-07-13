const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
/**
 * 코드 스플리팅
 * 코드를 다양한 번들로 분할하고, 요청에 따라 로드하거나 병렬로 로드할 수 있다.
 * 더 작은 번들을 만들고, 리소스 우선순위를 제어하기 위해 사용한다. 로드 시간에 영향을 끼칠 수 있다.
 *
 * 방법
 * 1. entry 설정을 이용하여 수동으로 분할한다.
 * - index.js, another-module.js 둘 다 lodash 를 가져와서 양쪽 번들에 중복으로 포함된다.
 * entry: {
    index: './src/index.js',
    another: './src/another-module.js',
  },
 * 2. entry dependencies 또는 SplitChunksPlugin 을 사용하여 중복 청크를 제거하고 청크를 분할한다.
 * - dependOn 옵션을 통해 청크간 모듈을 공유한다.
 *  index: {
      import: './src/index.js',
      dependOn: 'shared',
    },
    another: {
      import: './src/another-module.js',
      dependOn: 'shared',
    },
    shared: 'lodash',

    SplitChunksPlugin 을 이용한 방식
    optimization: {
     splitChunks: {
       chunks: 'all',
     },
   },
 * 3. Dynamic Imports 모듈 내에서 인라인 함수 호출을 통해 코드를 분할한다.
  import() 구문 이용 - 내부적으로 promises 를 사용하므로 폴리필을 사용해야 한다.
 
 * Prefetching/Preloading modules
 * 모듈을 가져올 때 인라인 지시문을 사용하여 webpack 이 브라우저에 리소스 힌트를 줄 수 있다.
 * prefetching: 향후 일부 탐색에 리소스가 필요할 수 있다.
 * preload: 현재 탐색 중에 리소스도 필요하다.
 * 
 * import( \/* webpackPrefetch: true *\/ './path/to/LoginModal.js' )
 * 페이지 head 에 <link rel="prefetch" href="login-modal-chunk.js"> 를 추가하고 브라우저에 login-modal-chunk.js 를 유휴 시간에 미리 가져오도록 지시한다.
 * webpack 은 부모 청크가 로드된 후 프리페치 힌트를 추가한다.
 * 
 * 프리로드 vs 프리페치
 * 1. 프리로드 청크는 부모 청크와 병렬로 로드를 시작한다. 프리페치 청크는 부모 청크가 로드 완료된 후에 로드를 시작한다.
 * 2. 프리로드 청크는 중간 우선순위를 가지며, 즉시 다운로드 된다. 프리페치 청크는 브라우저가 유휴 상태일 때 다운로드 된다.
 * 3. 프리로드 청크는 부모 청크에서 즉시 요청 돼야 한다. 프리페치 청크는 나중에 언제라도 사용될 수 있다.
 * 4. 지원하는 브라우저에 차이가 있다.
 * 프리로드 예시 - 별도의 chunk 에 있어야 하는, 큰 라이브러리에 의존하는 Component
 * 프리로드를 잘못 사용하면 성능이 저하될 수도 있다. dynamic import 의 프리로드는 비동기를 스크립트를 통해 수행할 수 있다.(서버사이드 렌더링 시 유용)
 * 
 * 분석 도구를 이용하여 출력을 분석하여 어디서 모듈이 종료됐는지 확인할 수 있다.
 */

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
