import React from "react";
import { useState } from "react";

import imgLog from "../assets/user_log.svg";
import { Navigate, NavLink } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const SignUp = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [Navigate, SetNavigate] = useState(false);

  let handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // let configFetch = {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   },
  //   mode: "cors",
  //   data: {
  //     firstName: form.firstName,
  //     lastName: form.lastName,
  //     email: form.email,
  //     password: form.password,
  //   },
  // };

  useEffect(() => {
    if (Navigate === true) {
      <Navigate replace to={"/home"} />;
    }
  });

  let handleSignUpSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_URL_AUTH}/signup`,
      withCredentials: true,
      data: {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      },
    })
      .then((res) => {
        console.log(res);
        SetNavigate(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="log_content">
      <div className="log_content__log_img">
        <div className="log_content__border"></div>
        <img src={imgLog} alt="connexion" />
        <div className="log_content__border"></div>
      </div>
      <form action="/">
        <label htmlFor="firstName"></label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={form.firstName}
          placeholder="Prénom"
          onChange={(e) => handleSignUpChange(e)}
        />

        <label htmlFor="firstName"></label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={form.lastName}
          placeholder="Nom"
          onChange={(e) => handleSignUpChange(e)}
        />

        <label htmlFor="email"></label>
        <input
          type="text"
          id="email"
          name="email"
          value={form.email}
          placeholder="Email"
          onChange={(e) => handleSignUpChange(e)}
        />

        <label htmlFor="password"></label>
        <input
          type="password"
          id="password"
          name="password"
          value={form.password}
          placeholder="Mot de passe"
          onChange={(e) => handleSignUpChange(e)}
        />

        <button
          type="submit"
          onClick={(e) => {
            handleSignUpSubmit(e);
          }}
        >
          Inscription
        </button>
      </form>
      <div className="log_content__border"></div>
      <br />
      <p>
        Vous avez déjà un compte ?{" "}
        <NavLink to="/signIn">
          <span className="log_content__signup">Se connecter</span>
        </NavLink>
      </p>
    </div>
  );
};

export default SignUp;
