import React from "react";
import "./App.css";
import GistList from "./components/GistList";

function App() {
  return (
    <div className="App">
      <div className="header-div">
        <p style={{ margin: 0 }}><b>Gists</b></p>
      </div>
      <div className="content-div">
        <GistList />
      </div>
      <div id="fade-in-image" />
    </div>
  );
}

export default App;
