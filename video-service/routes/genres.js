const express = require("express");
const router = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");


//Define Schema
const genreSchema = new mongoose.Schema({
  name: { type: [String], minlength: 3, maxlength: 5 },
});

//Create Models
const Genre = mongoose.model("Genre", genreSchema);

//Route Handler Functions (Considered a Middleware Function)
router.get("/", async (req, res) => {
  const result = await Genre.find({});

  res.send(result);
});

router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({
    name: req.body.name,
  });

  const result = await genre.save();

  res.send(result);
});

router.put("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  // const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;

  const result = await genre.save();

  res.send(result);
});

router.delete("/:id", async (req, res) => {
  // const genre = genres.find((c) => c.id === parseInt(req.params.id));
  const result = await Genre.findByIdAndRemove(req.params.id);

  if (!result)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

router.get("/:id", async (req, res) => {
  // const genre = genres.find((c) => c.id === parseInt(req.params.id));

  const result = await Genre.findById(req.params.id);

  if (!result)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(result);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(genre, schema);
}

module.exports = router;
