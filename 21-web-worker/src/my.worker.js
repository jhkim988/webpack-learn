self.onmessage = function (event) {
  const action = event.data;
  console.log("my.index message received!", action);
  switch (action.type) {
    case "sum": {
      self.postMessage({
        type: "answer",
        data: action.args.reduce((a, b) => a + b),
      });
      break;
    }
    default: {
      console.error(
        "my.worker.js Error: Unsupported Operation Exception",
        action
      );
    }
  }
};
