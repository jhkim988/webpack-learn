import _ from "lodash";
import "./style.css"; // webpack 의 style-loader, css-loader 를 설정했으므로 import 가능
import Icon from "./icon.svg";
import Data from "./data.xml";
import Notes from "./data.csv";
import HIS from "./his_exported_data.json";

function component() {
  const element = document.createElement("div");
  element.innerHTML = _.join(["hello", "webpack"], " ");
  element.classList.add("hello");

  const myIcon = new Image();
  myIcon.src = Icon;
  element.appendChild(myIcon);

  console.log(Data);
  console.log(Notes);
  return element;
}

document.body.appendChild(component());
