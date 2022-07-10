import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import GistList from "./components/GistList";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <React.Fragment>asdasdads</React.Fragment>
        }>
        </Route>
        <Route
          path="/gists"
          element={
            <React.Fragment>
              <div className="header-div">
                <p style={{ margin: 0 }}>
                  <b>Gists</b>
                </p>
              </div>
              <div className="content-div">
                <GistList />
              </div>
              <div id="fade-in-image" />
            </React.Fragment>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
