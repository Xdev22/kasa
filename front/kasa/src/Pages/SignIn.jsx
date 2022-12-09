import React, { useEffect } from "react";
import imgLog from "../assets/user_log.svg";
import { NavLink } from "react-router-dom";
import backgroundImg from "../assets/back.jpg";
import { useState } from "react";
import axios from "axios";

const SignIn = () => {
  const [errMessage, setErrMessage] = useState("");
  const [errEmailInput, setErrEmailInput] = useState("");
  const [errPasswordInput, setErrPasswordInput] = useState("");
  const [Navigate, SetNavigate] = useState(false);

  let [disabled, setDisabled] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (Navigate === true) {
      <Navigate replace to={"/home"} />;
    }
  });

  let handleLoginChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  let emailCheck = (e) => {
    if (e.target.value) {
      setErrEmailInput(null);
      setErrMessage("");
    } else {
      setErrEmailInput("errInput");
      setErrMessage("Cette valeur ne doit pas être vide");
    }
  };

  let passwordCheck = (e) => {
    if (e.target.value) {
      setErrPasswordInput(null);
      setErrMessage("");
    } else {
      setErrPasswordInput("errInput");
      setErrMessage("Cette valeur ne doit pas être vide");
    }
  };

  let handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (form.email === "" && form.password === "") {
      setErrEmailInput("errInput");
      setErrPasswordInput("errInput");
      setErrMessage("Veuillez remplir les champs");
    } else if (form.email === "") {
      setErrEmailInput("errInput");
      setErrMessage("Veuillez remplir l'email");
    } else if (form.password === "") {
      setErrPasswordInput("errInput");
      setErrMessage("Veuillez remplir le mot de passe");
    } else {
      setErrEmailInput(null);
      setErrPasswordInput(null);
      setErrMessage("");
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_URL_AUTH}/login`,
        withCredentials: true,
        data: {
          email: form.email,
          password: form.password,
        },
      })
        .then((res) => {
          // window.location = "/";
          console.log(res);
          SetNavigate(true);

          // setForm([{ email: "", password: "" }]);
        })
        .catch((err) => {
          let error = err.response.data.message;
          if (error.includes("Mot de passe")) {
            setErrMessage(error);
            setErrPasswordInput("errInput");
          } else {
            setErrPasswordInput(null);
          }
          if (error.includes("Utilisateur")) {
            setErrPasswordInput("errInput");
            setErrEmailInput("errInput");
            setErrMessage(error);
          }
        });
    }
  };

  return (
    <div className="log_layout">
      <div className="log_content">
        <div className="log_content__log_img">
          <div className="log_content__border"></div>
          <img src={imgLog} alt="connexion" />
          <div className="log_content__border"></div>
        </div>
        <form action="/">
          <label htmlFor="email"></label>
          <input
            type="text"
            id="email"
            className={
              errEmailInput === null ? "log_content__input" : errEmailInput
            }
            placeholder="Email"
            name="email"
            value={form.email}
            required
            onChange={(e) => {
              handleLoginChange(e);
              emailCheck(e);
              // ctrlMailInput(e);
            }}
          />

          <label htmlFor="password"></label>
          <input
            type="password"
            className={
              errPasswordInput === null
                ? "log_content__input"
                : errPasswordInput
            }
            id="password"
            placeholder="Mot de passe"
            name="password"
            required
            value={form.password}
            onChange={(e) => {
              handleLoginChange(e);
              passwordCheck(e);
            }}
          />
          <p className="errMessage">{errMessage}</p>

          <button
            id="submit"
            type="submit"
            disabled={disabled}
            onClick={(e) => handleLoginSubmit(e)}
          >
            Connexion
          </button>
        </form>
        <div className="log_content__border"></div>
        <br />
        <p>
          Pas de compte ?{" "}
          <NavLink to="/signUp">
            <span className="log_content__signup">S'inscrire</span>
          </NavLink>
        </p>
      </div>
      <div className="log_layout_background"> </div>
    </div>
  );
};

export default SignIn;
