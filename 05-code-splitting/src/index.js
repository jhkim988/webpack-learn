/*
import _ from "lodash";

function component() {
  const element = document.createElement("div");
  element.innerHTML = _.join(["hello", "webpack"], " ");
  return element;
}
document.body.appendChild(component());
*/

function component_dynamicImport() {
  return import("lodash")
    .then(({ default: _ }) => {
      const element = document.createElement("div");
      element.innerHTML = _.join(["hello", "webpack"], " ");
      return element;
    })
    .catch((err) => "An error occurred while loading the component");
}
component_dynamicImport().then((component) => {
  document.body.appendChild(component);
});

/*
async function component_async() {
  const element = document.createElement("div");
  const { default: _ } = await import("lodash");
  element.innerHTML = _.join(["hello", "webpack"], " ");
  return element;
}

component_async().then((component) => {
  document.body.appendChild(component);
});
*/
