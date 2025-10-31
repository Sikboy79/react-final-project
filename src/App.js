import React from "react";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import "./App.css";
import { BrowserRouter as Router, Route, Routes,  } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/'element={<Home/>}></Route>
          <Route path='/:id' element={<Search/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
