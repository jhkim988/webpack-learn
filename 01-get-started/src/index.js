import _ from "lodash";

function component() {
  const element = document.createElement("div");
  element.innerHTML = _.join(["hello", "webpack"], " "); // need lodash
  return element;
}

document.body.appendChild(component());
