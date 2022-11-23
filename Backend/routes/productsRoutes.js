const express = require("express");
const router = express.Router();
const productsCtrl = require("../controllers/productsCtrl");
const auth = require("../middlewares/auth");
const app = require("../app");
const multer = require("../middlewares/multer");

router.get("/", multer, productsCtrl.getAllProducts);

module.exports = router;
