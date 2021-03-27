const Joi = require("joi");
const mongoose = require("mongoose");

////Define Schema & Create Models
const Genre = mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: { type: String, minlength: 3, maxlength: 10 },
  })
);

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(genre, schema);
}

exports.genre = Genre;
exports.validate = validateGenre;
