const path = require("path");
const toml = require("toml");
const yaml = require("yamljs");
const json5 = require("json5");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  // JS 외에도 로더, 내장 에셋 모듈이 지원하는 다른 유형의 파일도 포함할 수 있다.
  // css 파일을 import 하려면 style-loader, css-loader 를 설치하고 module 설정에 추가하면 된다.
  module: {
    rules: [
      {
        test: /\.css/i,
        use: ["style-loader", "css-loader"], // 모듈 로더는 체인으로 연결되고, 각 로더는 리소스에 변형을 적용한다. 첫 번째 로더의 결과가 다음 로더로 전달된다. 마지막 로더는 JS 를 반환해야한다.
      },
      {
        test: /\.(png|svg|jpg|jpeg|git)$/i,
        type: "asset/resource", // webpack 5 에서 추가된 애셋 모듈
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },

      // csv, xml 도 가능. json 은 기본 내보내기만 가능하고, import { foo } from './data.json' 의 방식에선 경고 노출됨
      {
        test: /\.(csv|tsv)/i,
        use: ["csv-loader"],
      },
      {
        test: /\.xml/i,
        use: ["xml-loader"],
      },

      // webpack loader 대신 custom parser
      {
        test: /\.toml/i,
        type: "json",
        parser: {
          parse: toml.parse,
        },
      },
      {
        test: /\.yaml/i,
        type: "json",
        parser: {
          parse: yaml.parse,
        },
      },
      {
        test: /\.json5/i,
        type: "json",
        parser: {
          parse: json5.parse,
        },
      },
    ],
  },
};
