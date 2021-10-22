const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const validateObjectId = require("../middlewares/validateObjectId");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user");

router.use(express.json());

router.get("/", async (req, res) => {
  const users = await User.find().sort("username");
  res.send(users);
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.get("/:id", [auth, admin, validateObjectId], async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    //// If not existing return 404 - Not found ////
    if (!user)
      return res.status(404).send("The user with the given id was not found.");
    res.send(user);
  } catch (e) {
    return res.status(404).send("The user with the given id was not found.");
  }
});

router.post("/", async (req, res) => {
  //// If invalid return 400 - Bad request ////
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(
    _.pick(req.body, ["username", "email", "password", "age", "country"])
  );

  // Password hashing //
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  user = _.pick(user, ["_id", "username", "email", "age", "country"]);
  user.token = token;

  res.header("x-auth-token", token).send(user);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  //// If invalid return 400 - Bad request ////
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findById(req.params.id);
  if (!user) return res.status(400).send("Invalid user.");

  // Password hashing //
  let password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  user = await User.findByIdAndUpdate(
    req.params.id,
    {
      username: req.body.username,
      email: req.body.email,
      password: password,
      age: req.body.age,
      country: req.body.country,
    },
    { new: true }
  );

  //// If not existing return 404 - Not found ////
  if (!user)
    return res.status(404).send("The user with the given id was not found.");

  res.send(user);
});

router.patch("/:id", [auth, validateObjectId], async (req, res) => {
  //const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.params.id);
  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  let query = { $set: {} };
  for (let key in req.body) {
    if (user[key] !== req.body[key]) {
      // if the field we have in req.body exists, we're gonna update it
      if (key === "password") {
        const salt = await bcrypt.genSalt(10);
        req.body[key] = await bcrypt.hash(req.body[key], salt);
        query.$set[key] = req.body[key];
      } else query.$set[key] = req.body[key];
    }

    await User.updateOne({ _id: req.params.id }, query, {
      runValidators: true,
    });
  }
  res.send(query);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);

    //// If not existing return 404 - Not found ////
    if (!user)
      return res.status(404).send("The user with the given id was not found.");

    res.send(user);
  } catch (e) {
    return res.status(404).send("The user with the given id was not found.");
  }
});

module.exports = router;
