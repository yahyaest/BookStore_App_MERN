const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 3, maxlength: 50 },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  confirmed: {
    type: Boolean,
    default: true,
  },
  password: { type: String, required: true, minlength: 5, maxlength: 1024 },
  age: { type: Number, required: true, min: 0 },
  country: { type: String, required: true, minlength: 3, maxlength: 50 },
  ordered_books: { type: Array, default: [] },
  liked_books: { type: Array, default: [] },
  date_joined: {
    type: Date,
    required: true,
    default: Date.now,
  },
  isAdmin: { type: Boolean, default: false },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
    //    process.env.bookstore_jwtPrivateKey
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    age: Joi.number().min(0).required(),
    country: Joi.string().min(3).max(50).required(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
