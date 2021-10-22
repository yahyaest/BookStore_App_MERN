const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const validateObjectId = require("../middlewares/validateObjectId");
const { Order, validate } = require("../models/order");
const { User } = require("../models/user");
const { Book } = require("../models/book");

router.use(express.json());

router.get("/", async (req, res) => {
  const orders = await Order.find().sort("order_date");
  res.send(orders);
});

router.get("/:id", validateObjectId, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    //// If not existing return 404 - Not found ////
    if (!order)
      return res.status(404).send("The order with the given id was not found.");
    res.send(order);
  } catch (e) {
    return res.status(404).send("The order with the given id was not found.");
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

  let order = await Order.findOne({ user: { _id: req.body.userId } });
  if (order) return res.status(400).send("Order already created.");

  order = new Order({
    user: {
      _id: user._id,
      username: user.username,
    },
    book: {
      _id: book._id,
      name: book.name,
    },
  });

  await order.save();
  res.send(order);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  //// If invalid return 400 - Bad request ////
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid user.");

  const book = await Book.findById(req.body.bookId);
  if (!book) return res.status(400).send("Invalid book.");

  const order = await Order.findByIdAndUpdate(
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
    },
    { new: true }
  );

  //// If not existing return 404 - Not found ////
  if (!order)
    return res.status(404).send("The order with the given id was not found.");

  res.send(order);
});

router.patch("/:id", [auth, validateObjectId], async (req, res) => {
  //const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const order = await Order.findById(req.params.id);
  if (!order)
    return res.status(404).send("The order with the given ID was not found.");

  let query = { $set: {} };
  for (let key in req.body) {
    if (order[key] !== req.body[key])
      // if the field we have in req.body exists, we're gonna update it
      query.$set[key] = req.body[key];

    await Order.updateOne({ _id: req.params.id }, query, {
      runValidators: true,
    });
  }
  res.send(query);
});

router.delete("/:id", [auth, validateObjectId], async (req, res) => {
  try {
    const order = await Order.findByIdAndRemove(req.params.id);

    //// If not existing return 404 - Not found ////
    if (!order)
      return res.status(404).send("The order with the given id was not found.");

    res.send(order);
  } catch (e) {
    return res.status(404).send("The order with the given id was not found.");
  }
});

module.exports = router;
