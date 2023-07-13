import _ from "lodash";
import "./style.css"; // webpack 의 style-loader, css-loader 를 설정했으므로 import 가능
import Icon from "./icon.svg";
import Data from "./data.xml";
import Notes from "./data.csv";
import toml from "./data.toml";
import yaml from "./data.yaml";
import json5 from "./data.json5";

function component() {
  const element = document.createElement("div");
  element.innerHTML = _.join(["hello", "webpack"], " ");
  element.classList.add("hello");

  const myIcon = new Image();
  myIcon.src = Icon;
  element.appendChild(myIcon);

  console.log(Data);
  console.log(Notes);

  console.log(toml.title, toml.owner.name);
  console.log(yaml.title, yaml.owner.name);
  console.log(json5.title, json5.owner.name);
  return element;
}

document.body.appendChild(component());
