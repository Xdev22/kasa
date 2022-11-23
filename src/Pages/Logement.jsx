import React from "react";
import arrowLeft from "../assets/arrowLeft.svg";
import arrowRight from "../assets/arrowRight.svg";

const Logement = (pictures) => {
  return (
    <main>
      {/* <!-- Media logement --> */}
      <div className="media_logement">
        <img
          className="media_logement__images"
          src="https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-20-1.jpg"
          alt="logement"
        />
        <div className="media_logement__arrows">
          <img
            className="media_logement-arrowLeft"
            src={arrowLeft}
            alt="flèche gauche"
          />
          <img
            className="media_logement-arrowRight"
            src={arrowRight}
            alt="flèche droite"
          />
          <p className="media_logement__number">
            <span className="media_logement__imageNumber">1</span>/
            <span className="media_logement__imagesNumbers">
              {pictures.length}
            </span>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Logement;
