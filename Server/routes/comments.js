const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const validateObjectId = require("../middlewares/validateObjectId");
const { Comment, validate } = require("../models/comment");
const { User } = require("../models/user");
const { Book } = require("../models/book");

router.use(express.json());

router.get("/", async (req, res) => {
  const comments = await Comment.find().sort("created_at");
  res.send(comments);
});

router.get("/:id", validateObjectId, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    //// If not existing return 404 - Not found ////
    if (!comment)
      return res
        .status(404)
        .send("The comment with the given id was not found.");
    res.send(comment);
  } catch (e) {
    return res.status(404).send("The comment with the given id was not found.");
  }
});

router.post("/", auth, async (req, res) => {
  //// If invalid return 400 - Bad request ////
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid user.");

  const book = await Book.findById(req.body.bookId);
  if (!book) return res.status(400).send("Invalid book.");

  let comment = await Comment.findOne({ user: { _id: req.body.userId } });
  if (comment) return res.status(400).send("Comment already created.");

  comment = new Comment({
    user: {
      _id: user._id,
      username: user.username,
    },
    book: {
      _id: book._id,
      name: book.name,
    },
    comment: req.body.comment,
  });

  await comment.save();
  res.send(comment);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  //// If invalid return 400 - Bad request ////
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid user.");

  const book = await Book.findById(req.body.bookId);
  if (!book) return res.status(400).send("Invalid book.");

  const comment = await Comment.findByIdAndUpdate(
    req.params.id,
    {
      user: {
        _id: user._id,
        username: user.username,
      },
      book: {
        _id: book._id,
        name: book.name,
      },
      comment: req.body.comment,
    },
    { new: true }
  );

  //// If not existing return 404 - Not found ////
  if (!comment)
    return res.status(404).send("The comment with the given id was not found.");

  res.send(comment);
});

router.patch("/:id", [auth, validateObjectId], async (req, res) => {
  //const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const comment = await Comment.findById(req.params.id);
  if (!comment)
    return res.status(404).send("The comment with the given ID was not found.");

  let query = { $set: {} };
  for (let key in req.body) {
    if (comment[key] !== req.body[key])
      // if the field we have in req.body exists, we're gonna update it
      query.$set[key] = req.body[key];

    await Comment.updateOne({ _id: req.params.id }, query, {
      runValidators: true,
    });
  }
  res.send(query);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  try {
    const comment = await Comment.findByIdAndRemove(req.params.id);

    //// If not existing return 404 - Not found ////
    if (!comment)
      return res
        .status(404)
        .send("The comment with the given id was not found.");

    res.send(comment);
  } catch (e) {
    return res.status(404).send("The comment with the given id was not found.");
  }
});

module.exports = router;
