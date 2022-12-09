const express = require("express");

const router = express.Router();
const authCtrl = require("../controllers/authCtrl");
const auth = require("../middlewares/auth");

//Auth
router.post("/signup", authCtrl.signup);
router.post("/login", authCtrl.login);
router.post("/logout", auth, authCtrl.logout);

//verifTokken
router.get("/jwt", auth, authCtrl.verifTokken);

module.exports = router;
