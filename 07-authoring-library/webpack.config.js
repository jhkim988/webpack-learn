const path = require("path");

/**
 * 애플리케이션 외에도 JS 라이브러리를 번들링 할 때도 webpack 을 이용한다.
 */

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    /* <script src="http://example.org/webpack-numbers.js"></script> 과 같은 방식으로 사용할 수 있도록 export 했다. */
    /* 그러나 script 태그로 참조될 때만 동작하며, CommonJS, AMD, Node.js 등의 환경에서는 사용할 수 없다. (즉, require 를 이용해서 사용하고 싶다.) */
    filename: "webpack-numbers.js",
    library: {
      name: "webpackNumbers",
      /* type 을 umd 로 설정하여 CommonJS, AMD, script 태그 에서 사용할 수 있게 한다. */
      /* library 를 번들할 때 entry 를 배열로 선언하는 것은 권장되지 않는다. */
      type: "umd",
    },
    /* 빌드하면 큰 번들이 생성된 것을 확인할 수 있다. lodash 코드가 함께 제공되기 때문인데, peer depdendency 로 취급하는 것이 좋다. */
    /* 사용자는 이미 lodash 가 설치되어 있어야 하고, 이 외부 라이브러리 제어권을 라이브러리 사용자에게 넘겨야 한다. */
    externals: {
      lodash: {
        commonjs: "lodash",
        commonjs2: "lodash",
        amd: "lodash",
        root: "_",
      },
    },
    /**
     * 종속성에서 여러 파일을 사용하는 라이브러리의 경우
     * 예시)
     * import A from 'library/one';
     * import B from 'library/two';
     *
     * 하나씩, 혹은 정규식을 사용하여 제외해야 한다.
     * externals: ['library/one', 'library/two', /^library\/.+$/,]
     */
  },
};

/**
 * 프로덕션 출력 최적화
 * packages.json
 * "main": "dist/webpack-numbers.js" (packages.json 표준)
 * 혹은
 * "module": "src/index.js" (JS 하위호환성)
 *
 * 이후에 npm 패키지로 게시
 */
