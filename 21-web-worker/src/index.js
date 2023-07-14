// webpack 4 에서 web worker 사용 방법
/*
import Worker from "./my.worker.js";
const worker = new Worker();
*/

// webpack 5 에서 webworker 사용 방법
const worker = new Worker(new URL("./my.worker.js", import.meta.url));

worker.postMessage({ type: "sum", args: [1, 2, 3, 4, 5] });

worker.onmessage = function (event) {
  const action = event.data;
  switch (action.type) {
    case "answer": {
      console.log("index.js answer - ", action.data);
      break;
    }
    default: {
      console.error("index.js Error: Unsupported Operation Exception", event);
    }
  }
};

function component() {
  const btn = document.createElement("button");
  btn.innerHTML = "button";
  return btn;
}

document.body.appendChild(component());
