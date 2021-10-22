const mongoose = require("mongoose");
const Joi = require("joi");

const orderSchema = new mongoose.Schema({
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

  is_shiped: { type: Boolean, default: false },

  order_key: {
    type: String,
    default: Math.random().toString(36).substring(2, 15).slice(0, 10),
  },

  order_date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

function validateOrder(order) {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    bookId: Joi.objectId().required(),
  });
  return schema.validate(order);
}

exports.Order = Order;
exports.orderSchema = orderSchema;
exports.validate = validateOrder;
