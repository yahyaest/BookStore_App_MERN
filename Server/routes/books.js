const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const validateObjectId = require("../middlewares/validateObjectId");
const { Book, validate } = require("../models/book");
router.use(express.json());
// muter configuration
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/images/");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      new Date().toISOString().replace(/:/g, "-") + file.originalname
    );
  },
});

const fileFilter = (req, file, callback) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  )
    callback(null, true);
  else {
    callback(new Error("Image type should be jpeg or jpg or png"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

router.get("/", async (req, res) => {
  const books = await Book.find().sort("name");
  res.send(books);
});

router.get("/:id", validateObjectId, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    //// If not existing return 404 - Not found ////
    if (!book)
      return res.status(404).send("The book with the given id was not found.");
    res.send(book);
  } catch (e) {
    return res.status(404).send("The book with the given id was not found.");
  }
});

router.post("/", auth, upload.single("image"), async (req, res) => {
  //// If invalid return 400 - Bad request ////
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const book = new Book({
    name: req.body.name,
    author: req.body.author,
    genre: req.body.genre,
    publisher: req.body.publisher,
    date: req.body.date,
    summary: req.body.summary,
    about_author: req.body.about_author,
    rate: req.body.rate,
    price: req.body.price,
    image: req.file.filename,
  });

  await book.save();
  res.send(book);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  //// If invalid return 400 - Bad request ////
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const book = await Book.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      author: req.body.author,
      genre: req.body.genre,
      publisher: req.body.publisher,
      date: req.body.date,
      summary: req.body.summary,
      about_author: req.body.about_author,
      rate: req.body.rate,
      price: req.body.price,
    },
    { new: true }
  );

  //// If not existing return 404 - Not found ////
  if (!book)
    return res.status(404).send("The book with the given id was not found.");

  res.send(book);
});

router.patch("/:id", [auth, validateObjectId], async (req, res) => {
  //const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const book = await Book.findById(req.params.id);
  if (!book)
    return res.status(404).send("The book with the given ID was not found.");

  let query = { $set: {} };
  for (let key in req.body) {
    if (book[key] && book[key] !== req.body[key])
      // if the field we have in req.body exists, we're gonna update it
      query.$set[key] = req.body[key];

    await Book.updateOne({ _id: req.params.id }, query, {
      runValidators: true,
    });
  }
  res.send(query);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  try {
    const book = await Book.findByIdAndRemove(req.params.id);

    //// If not existing return 404 - Not found ////
    if (!book)
      return res.status(404).send("The book with the given id was not found.");

    res.send(book);
  } catch (e) {
    return res.status(404).send("The book with the given id was not found.");
  }
});

module.exports = router;
