const mongoose = require("mongoose");
const Joi = require("joi");

const profileSchema = new mongoose.Schema({
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
  age: { type: Number, required: true, min: 0 },
  country: { type: String, required: true, minlength: 3, maxlength: 50 },
  ordered_books: { type: Array },
  liked_books: { type: Array },
});

const Profile = mongoose.model("Profile", profileSchema);

function validateProfile(profile) {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    age: Joi.number().min(0).required(),
    country: Joi.string().min(3).max(50).required(),
    ordered_books: Joi.array(),
    liked_books: Joi.array(),
  });
  return schema.validate(profile);
}

exports.Profile = Profile;
exports.profileSchema = profileSchema;
exports.validate = validateProfile;
