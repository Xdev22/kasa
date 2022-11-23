import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Data from "../Data/homes.json";

const Nav = () => {
  const [loged, setLoged] = useState(false);

  //Functions
  const logout = () => {
    //fonction se deconnecter
    setLoged(false);
  };

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/Home">Accueil</NavLink>
        </li>
        <li>
          <NavLink to="/A_propos">A propos</NavLink>
        </li>
      </ul>
      {/* Si l'utilisateur est connecté */}
      {loged ? (
        <>
          <NavLink to="/profil">
            <img src={Data[0].host.picture} alt="profil" />
          </NavLink>
          <i
            className="fa-solid fa-arrow-right-to-bracket"
            onClick={logout}
          ></i>
        </>
      ) : (
        // sinon
        <NavLink to="/signIn">
          <i className="fa-solid fa-arrow-right-to-bracket"></i>
        </NavLink>
      )}
    </nav>
  );
};

export default Nav;
