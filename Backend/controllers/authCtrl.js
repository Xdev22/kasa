//////////////////////////Require//////////////////////////////////////
const User = require("../models/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Validateur de mdp
const passwordValidator = require("../utils/password_validator");
//NodeMailer
const nodemailer = require("nodemailer");

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

//NodeMailer

const nodeMailerFunction = (mailto, firstName, lastName) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    secureConnection: false,
    port: 587,
    tls: { ciphers: "SSLv3", rejectUnauthorized: false },
    auth: {
      user: "kasa_immo@outlook.fr",
      pass: "Lol93370!",
    },
  });

  const mailOptions = {
    from: "kasa_immo@outlook.fr",
    to: `${mailto}`,
    subject: "Confirmation d'inscription",
    text: `
    Bonjour ${firstName},

    Nous vous souhaitons la bienvenue sur Kasa !
    Vous pouvez dès à présent vous connecter sur notre plateforme et louer un bien ou mettre le votre en ligne en suivant les étapes disponibles sur votre espace personnel. 

    Nous vous souhaitons une agréable journée !

    Kasa`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email envoyé: " + info.response);
    }
  });
};

// Create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET);
};

//////////////////////////Controllers//////////////////////////////////////

exports.signup = (req, res) => {
  //Promise pour recuperer le resultat de la verif du mdp
  let passwordCheked = Promise.resolve(passwordFunction(req.body.password));
  passwordCheked.then((obj) => {
    console.log(obj);
    if (obj.Boolean === false) {
      res.status(400).json(obj.message);
    } else {
      bcrypt
        .hash(obj.password, 10)
        .then((hash) => {
          const user = new User({
            ...req.body,
            phoneNumber: req.body.phoneNumber,
            password: hash,
          });
          user
            .save()
            .then((user) => {
              //Envoie du mail de confirmation
              // nodeMailerFunction(user.email, user.firstName, user.lastName);
              //On retourne le cookie afin d'authentifier la personne
              const token = createToken(user.id);
              res.cookie("jwt", token, { httpOnly: true });
              res
                .status(201)
                .json({ message: `User created ! UserId: ${user._id}` });
            })
            .catch((err) => {
              // console.log(err);
              if (err.errors.hasOwnProperty("email")) {
                // console.log("marche");
                return res.status(400).json({
                  message: "Cette adresse mail est déjà utilisé.",
                });
              } else {
                return res.status(400).json({ err });
              }
            });
        })
        .catch((err) => res.status(500).json({ err }));
    }
  });
};

exports.login = (req, res) => {
  User.findOne({ email: req.body.email } || { phone: [0 + phoneNumber] }).then(
    (user) => {
      if (!user) {
        res.status(404).json({ message: "Utilisateur introuvable" });
      } else {
        bcrypt.compare(req.body.password, user.password).then((valid) => {
          if (!valid) {
            res.status(401).json({ message: "Mot de passe incorrect" });
          } else {
            const token = createToken(user.id);
            console.log(user.firstName + " " + user.lastName);
            res.cookie("jwt", token, { httpOnly: true });
            res.status(200).json({ userId: user.id });
          }
        });
      }
    }
  );
};

exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({ message: "User discounected" });
  res.redirect = "/";
};

exports.verifTokken = (req, res) => {
  if (req.auth.userId) {
    res.status(200).json(req.auth.userId);
  } else {
    throw "No token";
  }
};
