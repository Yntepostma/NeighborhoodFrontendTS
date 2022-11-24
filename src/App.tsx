import { Sign } from "crypto";
import React from "react";
import "./App.css";
import { HomePage, SignupPage } from "./Pages";

function App() {
  return (
    <div className="App">
      <SignupPage />
      {/* <HomePage /> */}
    </div>
  );
}

export default App;
