const express = require("express");
const router = express.Router();
const Joi = require("joi");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");

router.use(express.json());

router.post("/", async (req, res) => {
  //// If invalid return 400 - Bad request ////
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Invalid username.");

  // if (!user.confirmed) {
  //   return res.status(404).send("Please confirm your username to login.");
  //   throw new Error("Please confirm your username to login.");
  // }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password.");

  const token = user.generateAuthToken();
  res.send(token);
});

function validate(request) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(request);
}

module.exports = router;
