import React from "react";
import ReactDOM from "react-dom";
import Board from "./Board";
import "./index.css";

function App() {
  return (

      <Board size="10" />

  );
}

ReactDOM.render(<App />, document.getElementById("root"));
