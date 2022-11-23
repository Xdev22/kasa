const mongoose = require("../db/db");

const uniqueValidator = require("mongoose-unique-validator");
const { isEmail } = require("validator");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trimp: true,
      lowercase: true,
      validate: [isEmail],
    },
    password: { type: String, required: true, minlength: 8, maxlength: 100 },
    firstName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 25,
      trimp: true,
    },
    //trimp permet de supprimer les espaces après l'entrée des données
    //lowercase permet de tout mettre en miniscule
    lastName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 25,
      trimp: true,
    },
    phone: {
      countryCode: { type: String, required: false },
      phoneNumber: { type: Number, required: false },
    },

    admin: { type: Boolean, default: false },
    picture: { type: String, default: "" },
    bio: { type: String, default: "Hey, j'utilise Kasa !", maxlength: 126 },
    notation: { type: Number, default: 0, max: 5 },
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.mongoose.model("User", userSchema);
