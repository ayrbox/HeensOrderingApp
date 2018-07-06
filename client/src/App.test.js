import React from "react";
import ReactDOM from "react-dom";
import IndexView from "./views/";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<IndexView />, div);
  ReactDOM.unmountComponentAtNode(div);
});
