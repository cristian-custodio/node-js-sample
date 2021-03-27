const Joi = require("joi");
const mongoose = require("mongoose");

//Create Models
const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: { type: String, minlength: 3, maxlength: 10 },
    isGold: { type: Boolean, default: false },
    phone: { type: String, required: true },
  })
);

//Validation Customer body
function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(3).max(10).required(),
    isGold: Joi.boolean(),
    phone: Joi.string(),
  };

  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
