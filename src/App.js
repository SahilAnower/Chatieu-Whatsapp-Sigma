import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./Sidebar";
import SingleChat from "./SingleChat";
import Login from "./Login"
import {useStateValue} from "./StateProvider"

function App() {

  const [{user}, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Routes>
              <Route path="/rooms/:roomId" element={
                <>
                  <SingleChat />
                </>
              } />
              <Route path="/" element={<></>} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
