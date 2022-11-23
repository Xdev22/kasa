import React from "react";
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <main>
      <div class="error_page">
        <p class="error_number">404</p>
        <p class="error_message">
          Oups! La page que vous demandez n'existe pas.
        </p>
        <NavLink to="/Home">
          <p class="error_return">Retourner sur la page d'accueil</p>
        </NavLink>
      </div>
    </main>
  );
};

export default ErrorPage;
