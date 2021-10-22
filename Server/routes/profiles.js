const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const validateObjectId = require("../middlewares/validateObjectId");
const { Profile, validate } = require("../models/profile");
const { User } = require("../models/user");
router.use(express.json());

router.get("/", async (req, res) => {
  const profiles = await Profile.find().sort("name");
  res.send(profiles);
});

router.get("/me", async (req, res) => {
  const user = await User.findById(req.user._id);
  const profile = await Profile.find({
    user: {
      _id: req.user._id,
      username: user.username,
    },
  });

  res.send(profile[0]);
});

router.get("/:id", validateObjectId, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    //// If not existing return 404 - Not found ////
    if (!profile)
      return res
        .status(404)
        .send("The profile with the given id was not found.");
    res.send(profile);
  } catch (e) {
    return res.status(404).send("The profile with the given id was not found.");
  }
});

router.post("/", auth, async (req, res) => {
  //// If invalid return 400 - Bad request ////
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid user.");

  let profile = await Profile.findOne({ user: { _id: req.body.userId } });
  if (profile) return res.status(400).send("Profile already created.");

  profile = new Profile({
    user: {
      _id: user._id,
      username: user.username,
    },
    age: req.body.age,
    country: req.body.country,
  });

  await profile.save();
  res.send(profile);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  //// If invalid return 400 - Bad request ////
  const { error } = validate(req.body);
 if (error) return res.status(400).send(error.details[0].message);
 
   const user = await User.findById(req.body.userId);
   if (!user) return res.status(400).send("Invalid user.");

  const profile = await Profile.findByIdAndUpdate(
    req.params.id,
    {
      user: {
        _id: user._id,
        username: user.username,
      },
      age: req.body.age,
      country: req.body.country,
      ordered_books: req.body.ordered_books,
      liked_books: req.body.liked_books,
    },
    { new: true }
  );

  //// If not existing return 404 - Not found ////
  if (!profile)
    return res.status(404).send("The profile with the given id was not found.");

  res.send(profile);
});

router.patch("/:id", [auth, validateObjectId], async (req, res) => {
  //const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const profile = await Profile.findById(req.params.id);
  if (!profile)
    return res.status(404).send("The profile with the given ID was not found.");

  let query = { $set: {} };
  for (let key in req.body) {
    if (profile[key] && profile[key] !== req.body[key])
      // if the field we have in req.body exists, we're gonna update it
      query.$set[key] = req.body[key];

    await Profile.updateOne({ _id: req.params.id }, query, {
      runValidators: true,
    });
  }
  res.send(query);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  try {
    const profile = await Profile.findByIdAndRemove(req.params.id);

    //// If not existing return 404 - Not found ////
    if (!profile)
      return res
        .status(404)
        .send("The profile with the given id was not found.");

    res.send(profile);
  } catch (e) {
    return res.status(404).send("The profile with the given id was not found.");
  }
});

module.exports = router;
