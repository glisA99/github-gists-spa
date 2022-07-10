import React from "react";
import { Route, Routes, useNavigate } from "react-router";
import "./App.css";
import GistList from "./components/GistList";
import { Navbar } from "./components/Navbar";

function App() {

  const navigate = useNavigate();

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <React.Fragment>
            <div className="home-content-div">
              <h1>Show most recent github gists</h1>
              <button 
                className="button-c"
                onClick={() => {
                  navigate("/gists");
                }}
              >
                SHOW GISTS
              </button>
            </div>
          </React.Fragment>
        }>
        </Route>
        <Route
          path="/gists"
          element={
            <React.Fragment>
              <div className="header-div" style={{textAlign: "center"}}>
                <p style={{ margin: 0 }}>
                  <b>Most recent GitHub Gists:</b>
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
