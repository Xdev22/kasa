import React from "react";
import imgLog from "../assets/user_log.svg";
import { NavLink } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="log_content">
      <div className="log_content__log_img">
        <div className="log_content__border"></div>
        <img src={imgLog} alt="connexion" />
        <div className="log_content__border"></div>
      </div>
      <form action="/">
        <label htmlFor="firstName"></label>
        <input type="text" id="firstName" placeholder="Prénom" />
        <br />
        <br />
        <label htmlFor="firstName"></label>
        <input type="text" id="lastName" placeholder="Nom" />
        <br />
        <br />
        <label htmlFor="email"></label>
        <input type="text" id="email" placeholder="Email" />
        <br />
        <br />
        <label htmlFor="password"></label>
        <input type="password" id="password" placeholder="Mot de passe" />
        <br />
        <br />
        <button type="submit"> Inscription</button>
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

export default SignIn;
