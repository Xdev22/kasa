import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/kasa_logo_white.svg";

const Footer = () => {
  return (
    <footer>
      <div>
        <NavLink to="/">
          <img src={Logo} alt="logo Kasa" />
        </NavLink>
        <p>
          <i className="fa-regular fa-copyright"></i> 2020 Kasa. All rights
          reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
