import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/kasa_logo.svg";
import Nav from "./Nav";

const Header = () => {
  return (
    <header>
      <NavLink to="/home">
        <div className="kasa_logo">
          <img className="kasa_logo__img" src={Logo} alt="logo de kasa" />
        </div>
      </NavLink>
      <Nav />
    </header>
  );
};

export default Header;
