import React from "react";
import { NavLink } from "react-router-dom";

const ErrorPage = (props) => {
  let errNum = props.err;
  return (
    <main>
      <div className="error_page">
        <p className="error_number">{errNum}</p>
        <p className="error_message">
          Oups! La page que vous demandez n'existe pas.
        </p>
        <NavLink to="/Home">
          <p className="error_return">Retourner sur la page d'accueil</p>
        </NavLink>
      </div>
    </main>
  );
};

export default ErrorPage;
