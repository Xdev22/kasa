import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import cookie from "js-cookie";
import axios from "axios";
import Home from "../Pages/Home";

import Data from "../Data/homes.json";
import { UidContext } from "./AppContext";

const Nav = () => {
  const uid = useContext(UidContext);

  const [loged, setLoged] = useState();

  useEffect(() => {
    if (uid) {
      setLoged(true);
    }
  }, [uid]);

  const logout = async () => {
    await axios({
      method: "post",
      url: `http://localhost:8000/api/user/auth/logout`,
      withCredentials: true,
    })
      .then(() => {
        cookie.remove("jwt", { expires: 1 });
        // window.location = "/home";
      })
      .catch((err) => {
        console.log(err);
      });

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
            <img src={Data[9].host.picture} alt="profil" />
          </NavLink>
          <NavLink to="/Home" replace={true}>
            <i
              className="fa-solid fa-arrow-right-to-bracket"
              onClick={logout}
            ></i>
          </NavLink>
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
