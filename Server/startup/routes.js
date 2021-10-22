const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const error = require("../middlewares/error");

const home = require("../routes/home");
const auth = require("../routes/auth");
const users = require("../routes/users");
const books = require("../routes/books");
const profiles = require("../routes/profiles");
const comments = require("../routes/comments");
const orders = require("../routes/orders");
const emailController = require("../services/email.controller");

module.exports = function (app) {
  app.use(express.json());
  app.use(helmet());
  app.use(morgan("tiny"));

  //// API Routes ////
  app.use("/", home);
  app.use("/api/auth", auth);
  app.use("/api/users", users);
  app.use("/api/books", books);
  app.use("/api/profiles", profiles);
  app.use("/api/comments", comments);
  app.use("/api/orders", orders);

  app.use(error); //error middleware(use last cause error is last middleware n the pipeline)

  //// Template Engines ////
  app.use(express.static("views"));
  app.set("view engine", "ejs");
  app.set("views", "./views");

  app.use(express.static("uploads/images"));
  app.use(bodyParser.urlencoded({ extended: true }));

  //// Email ////
  app.post("/api/email", emailController.collectEmail);
  app.get("/api/email/confirm/:id", emailController.confirmEmail);
  app.post("/api/email/forget", emailController.forgetPassword);
  app.post("/api/email/reset/:id", emailController.resetPssword);
};
