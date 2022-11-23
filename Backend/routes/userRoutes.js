const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const userCtrl = require("../controllers/userCtrl");

router.get("/", auth, userCtrl.getAllUsers);
router.get("/:id", auth, userCtrl.getOneUser);
router.put("/:id", auth, userCtrl.updateOneUser);
router.delete("/:id", auth, userCtrl.deleteOneUser);

module.exports = router;
