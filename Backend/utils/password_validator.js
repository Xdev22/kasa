const passwordValidator = require("password-validator");

const passwordSchema = new passwordValidator()
  .is()
  .min(8, "Le mot de passe doit contenir au minimum 8 caractères.") // Minimum length 8
  .is()
  .max(50, "Le mot de passe doit contenir au maximum 50 caractères.") // Maximum length 100
  .has()
  .uppercase(1, "Le mot de passe doit contenir une majuscule.") // Must have uppercase letters
  .has()
  .lowercase(1, "Le mot de passe doit contenir une minuscule.") // Must have lowercase letters
  .has()
  .digits(1, "Le mot de passe doit contenir au moins un chiffre.") // Must have at least 2 digits
  .has()
  .not()
  .spaces(0, "Le mot de passe ne doit pas contenir d'espace.") // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blacklist these value

module.exports = passwordSchema;
