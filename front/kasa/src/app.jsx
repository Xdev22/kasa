import React from "react";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { UidContext } from "./Components/AppContext";
import { getUser } from "./actions/user.actions";

// import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Apropos from "./Pages/A_propos";
import ErrorPage from "./Pages/ErrorPage";
import Home from "./Pages/Home";
import Logement from "./Pages/Logement";
import Profil from "./Pages/Profil";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { set } from "mongoose";

const App = () => {
  //hooks

  const [re, setRe] = useState(false);
  //Stock l'user Id
  const [uid, setUid] = useState(null);
  //Permet de declancher une action
  const dispatch = useDispatch();

  useEffect(() => {
    const getToken = () => {
      axios({
        method: "get",
        url: "http://localhost:8000/api/user/auth/jwt",
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data);
          console.log(res);
        })
        .catch((err) => {
          console.log("No token");
        });
    };
    getToken();
    //si il y a un uid on lance l'action pour recuperer les infos de l'users
    if (uid) dispatch(getUser(uid));
    if (re) {
      setRe(false);
      return;
    }
  }, []);

  let reload = () => {
    setRe(true);
  };
  return (
    <div id="block_page">
      {console.log(uid + "test")}
      <UidContext.Provider value={uid}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="logement/:logementId" element={<Logement />} />
          <Route
            path="/signIn"
            element={
              uid !== null ? (
                <Navigate replace to={"/error"}></Navigate>
              ) : (
                <SignIn />
              )
            }
          />
          <Route path="/signUp" element={uid !== null ? null : <SignUp />} />
          <Route
            path="/profil"
            element={
              uid !== null ? (
                <Profil />
              ) : (
                <Navigate replace to={"/signIn"}></Navigate>
              )
            }
          />

          <Route path="/A_propos" element={<Apropos />} />
          <Route path="/error" element={<ErrorPage err={404} />} />
          <Route path="*" element={<ErrorPage err={404} />} />
        </Routes>
        {/* <Footer /> */}
      </UidContext.Provider>
    </div>
  );
};

export default App;
