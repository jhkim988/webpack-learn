import _ from "lodash";
// import Print from "./print";

function component() {
  const element = document.createElement("div");
  element.innerHTML = _.join(["hello", "webpack"], " ");
  // element.onclick = Print.bind(null, "hello webpack!");
  return element;
}
document.body.appendChild(component());
