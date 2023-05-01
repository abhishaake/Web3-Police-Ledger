import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/UI/header/Header";
import Login from "./components/Login";

import Home from "./pages/Home/Home";
import Technology from "./pages/Technology/Technology";
import Register from "./pages/Register/Register";
import Lookup from "./pages/Lookup/Lookup";

function App() {


  useEffect(() => {

    //temp();

  }, []);

  return (
   
    <>
       <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lookup" state="abhishek" element={<Lookup />} />
        <Route path="/technology" element={<Technology />} />
      </Routes>
    </>
  );
}

export default App;
