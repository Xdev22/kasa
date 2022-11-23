import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Apropos from "./Pages/A_propos";
import ErrorPage from "./Pages/ErrorPage";
import Home from "./Pages/Home";
import Logement from "./Pages/Logement";
import Profil from "./Pages/Profil";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";

const App = () => {
  return (
    <div id="block_page">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="logement/:logementId" element={<Logement />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/A_propos" element={<Apropos />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
