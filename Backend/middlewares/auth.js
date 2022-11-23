const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const result = dotenv.config();
const User = require("../models/User");

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.id;
    req.auth = { userId };

    User.findOne({ _id: userId })
      .select("-password")
      .then((user) => {
        console.log("userId qui fait la requête  (middleware auth)");
        console.log(userId);

        if (user.id === userId) {
          next();
        } else {
          throw "Non autorisé !";
        }
      })
      .catch((error) => res.status(404).json({ error }));
  } catch (error) {
    res.status(401).json({ error });
  }
};
