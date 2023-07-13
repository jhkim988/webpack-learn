const path = require("path");

// bash, CMD.exe 등의 운영체제 쉘에서의 환경 변수와는 다른 webpack 환경 변수

// --env 를 이용하여 환경 변수를 전달할 수 있다.
//
// npx webpack --env goal=local --env production --progress
// goal = local
// production = true
// progress 는 빌드 진행률을 보여주는 옵션(env 와 관련 없음)
module.exports = (env) => {
  console.log("Goal: ", env.goal);
  console.log("Production");

  return {
    entry: "./src/index.js",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
  };
};
