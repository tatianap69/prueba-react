import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchCom from "./components/SearchCom";
import UserDetail from "./components/UserDetail";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchCom />} /> {}
        <Route path="/user/:id" element={<UserDetail />} /> {}
      </Routes>
    </Router>
  );
};

export default App;
