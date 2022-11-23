import React from "react";
import Banner from "../assets/banner__home.jpg";

const BannerHome = () => {
  return (
    <div className="banner__home">
      <img src={Banner} alt="bannière" />
      <p>Chez vous, partout et ailleurs</p>
    </div>
  );
};

export default BannerHome;
