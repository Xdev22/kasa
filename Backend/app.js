const express = require("express");
const app = express();
const cors = require("cors");

//Extraire le corps json des req
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cookie Parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//mongoose
const mongoose = require("./db/db");

//morgan (logger http)
const morgan = require("morgan");
app.use(morgan("dev"));

//Réglage de la sécurité CORS
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

//Appel des routes

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productsRoutes = require("./routes/productsRoutes");

app.use("/api/users", userRoutes);
app.use("/api/user/auth", authRoutes);
app.use("/api/products", productsRoutes);

module.exports = app;
