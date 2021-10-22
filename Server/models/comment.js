const mongoose = require("mongoose");
const Joi = require("joi");

const commentSchema = new mongoose.Schema({
  user: {
    type: new mongoose.Schema({
      username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
      },
    }),
    required: true,
  },
  book: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
      },
    }),
  },
  comment: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1000,
  },
  like_counter: { type: Number, default: 0, min: 0 },
  dislike_counter: { type: Number, default: 0, min: 0 },
  comment_replies: { type: Array, default: [] },
  like_submitter: { type: Array, default: [] },
  dislike_submitter: { type: Array, default: [] },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

function validateComment(comment) {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    bookId: Joi.objectId().required(),
    comment: Joi.string().min(3).max(1000).required(),
  });
  return schema.validate(comment);
}

exports.Comment = Comment;
exports.commentSchema = commentSchema;
exports.validate = validateComment;
