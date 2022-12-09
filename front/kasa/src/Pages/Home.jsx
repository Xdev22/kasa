import React from "react";
import { NavLink } from "react-router-dom";
import BannerHome from "../Components/BannerHome";
import Footer from "../Components/Footer";
import Data from "../Data/homes.json";
import Logement from "./Logement";

const home = () => {
  return (
    <>
      <>
        <BannerHome />
      </>

      <>
        <main className="main_home">
          <div className="main_home__cards">
            {Data.map((logement, i) => (
              <NavLink
                to={`/logement/${logement.id}`}
                pictures={logement.pictures}
                key={logement.id}
              >
                <div
                  className="main_home__cards__card"
                  key={i}
                  id={logement.id}
                >
                  <img src={logement.cover} alt={logement.title} />
                  <p className="main_home__cards__card__title">
                    {logement.title}
                  </p>
                </div>
              </NavLink>
            ))}
          </div>
        </main>
        <Footer />
      </>
    </>
  );
};

export default home;
