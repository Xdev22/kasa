const mongoose = require("mongoose");

const dotenv = require("dotenv");
const result = dotenv.config();

//Faire le lien afin de connecter le server à la base de donnée
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.${process.env.DB_KEY}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => {
    console.log("Connexion à MongoDB échouée !");
    console.log(error);
  });

module.exports = mongoose;
