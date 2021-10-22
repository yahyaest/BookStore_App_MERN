const mongoose = require("mongoose");
const Joi = require("joi");

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 100 },
  author: { type: String, required: true, minlength: 3, maxlength: 50 },
  genre: { type: String, required: true, minlength: 3, maxlength: 50 },
  publisher: { type: String, required: true, minlength: 3, maxlength: 50 },
  date: { type: String, required: true, minlength: 3, maxlength: 50 },
  summary: { type: String, required: true, minlength: 3, maxlength: 1000 },
  about_author: { type: String, required: true, minlength: 3, maxlength: 500 },
  rate: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
  image: { type: String },
});

const Book = mongoose.model("Book", bookSchema);

function validateBook(book) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    author: Joi.string().min(3).max(50).required(),
    genre: Joi.string().min(3).max(50).required(),
    publisher: Joi.string().min(3).max(50).required(),
    date: Joi.string().min(3).max(50).required(),
    summary: Joi.string().min(3).max(1000).required(),
    about_author: Joi.string().min(3).max(500).required(),
    rate: Joi.number().min(0).required(),
    price: Joi.number().min(0).required(),
    image: Joi.string(),
  });
  return schema.validate(book);
}

exports.Book = Book;
exports.bookSchema = bookSchema;
exports.validate = validateBook;
