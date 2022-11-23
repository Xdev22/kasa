//////////////////////////Require//////////////////////////////////////
const User = require("../models/User");
const ObjectId = require("mongoose").Types.ObjectId;
const bcrypt = require("bcrypt");
// Validateur de mdp
const passwordValidator = require("../utils/password_validator");
//////////////////////////fonctions//////////////////////////////////////

// Password function
const passwordFunction = (password) => {
  const passwordVerify = passwordValidator.validate(password, {
    details: true,
  });
  let message = "";

  //si le mot de passe n'est pas bon:  // [0] : correspond a un message
  if (passwordVerify[0]) {
    message = passwordVerify[0].message;
    return { Boolean: false, message };

    //si il n'y a pas d'index c'est qu'il est bon
  } else {
    return { Boolean: true, password: password };
  }
};

//////////////////////////Controllers//////////////////////////////////////

exports.getAllUsers = (req, res) => {
  User.find()
    .select("-password")
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => res.status(400).json({ err }));
};

exports.getOneUser = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    redirect("/error");
    res.status(404).json({ message: `L'utilisateur n'existe pas. ` });
  } else {
    User.findOne({ _id: req.params.id })
      .select("-password")
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => res.status(404).json({ err }));
  }
};

exports.updateOneUser = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    redirect("/error");
    res.status(404).json({ message: `L'utilisateur n'existe pas. ` });
  } else {
    User.findOne({ _id: req.params.id })
      .then((user) => {
        if (user && user.id === req.auth.userId) {
          //Si il n'y a pas de password et de file dans la req
          if (!req.body.password && !req.file) {
            User.updateOne(
              { _id: req.params.id },
              {
                $set: {
                  email: req.body.email,
                  bio: req.body.bio,
                  phone: {
                    countryCode: req.body.phone.countryCode,
                    phoneNumber: req.body.phone.phoneNumber,
                  },
                },
              }
            ).then(() => {
              res.status(200).json({ message: "User Updated !" });
            });
            //Si il n'y a pas de password mais un file
          } else if (!req.body.password && req.file) {
            User.updateOne(
              { _id: req.params.id },
              {
                $set: {
                  email: req.body.email,
                  bio: req.body.bio,
                  picture: `${req.protocol}://${req.get(
                    "host"
                  )}/client/public/uploads/${req.file.filename}`,
                  phone: {
                    countryCode: req.body.phone.countryCode,
                    phoneNumber: req.body.phone.phoneNumber,
                  },
                },
              }
            ).then(() => {
              res.status(200).json({ message: "User Updated !" });
            });
          }
          //   Si il y a un password et un file
          else if (req.body.password && req.file) {
            //Promise pour recuperer le resultat de la verif du mdp
            let passwordCheked = Promise.resolve(
              passwordFunction(req.body.password)
            );

            passwordCheked.then((obj) => {
              //Si le password ne remplie pas les conditions
              if (obj.Boolean === false) {
                res.status(409).json(obj.message);
              } else {
                bcrypt
                  .hash(req.body.password, 10)
                  .then((hash) => {
                    User.updateOne(
                      { _id: req.params.id },
                      {
                        $set: {
                          email: req.body.email,
                          password: hash,
                          bio: req.body.bio,
                          picture: `${req.protocol}://${req.get(
                            "host"
                          )}/client/public/uploads/${req.file.filename}`,
                          phone: {
                            countryCode: req.body.phone.countryCode,
                            phoneNumber: req.body.phone.phoneNumber,
                          },
                        },
                      }
                    ).then(() => {
                      res.status(200).json({ message: "User Updated !" });
                    });
                  })
                  .catch((err) => res.status(500).json({ err }));
              }
            });

            //si il n'y a pas de file mais un password
          } else {
            //Promise pour recuperer le resultat de la verif du mdp
            let passwordCheked = Promise.resolve(
              passwordFunction(req.body.password)
            );

            passwordCheked.then((obj) => {
              //Si le password ne remplie pas les conditions
              if (obj.Boolean === false) {
                res.status(409).json(obj.message);
              } else {
                bcrypt
                  .hash(req.body.password, 10)
                  .then((hash) => {
                    User.updateOne(
                      { _id: req.params.id },
                      {
                        $set: {
                          email: req.body.email,
                          password: hash,
                          bio: req.body.bio,

                          phone: {
                            countryCode: req.body.phone.countryCode,
                            phoneNumber: req.body.phone.phoneNumber,
                          },
                        },
                      }
                    ).then(() => {
                      res.status(200).json({ message: "User Updated !" });
                    });
                  })
                  .catch((err) => res.status(500).json({ err }));
              }
            });
          }
        } else {
          res.status(401).json({ message: "Vous n'êtes pas autorisé." });
        }
      })
      .catch((err) => res.status(404).json({ err }));
  }
};

exports.deleteOneUser = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    redirect("/error");
    res.status(404).json({ message: `L'utilisateur n'existe pas. ` });
  } else {
    User.findOne({ _id: req.params.id })
      .then((user) => {
        if (user && user.id === req.auth.userId) {
          User.deleteOne({ _id: req.params.id })
            .then(() =>
              res
                .status(200)
                .json({ message: "L'utilisateur à bien été supprimé." })
            )
            .catch((err) => res.status(400).json({ err }));
        } else {
          res.status(401).json({ message: "Vous n'êtes pas autorisé." });
        }
      })
      .catch((err) => res.status(404).json({ err }));
  }
};
