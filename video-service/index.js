const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const Joi = require("joi");
const logger = require("./logger");
const express = require("express");
const { urlencoded } = require("express");
const app = express();

//Set environment on node using the following
//export NODE_ENV=production (On Terminal)
//Code to run only on development
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan enabled...");
}

console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
console.log("Mail Server: " + config.get("mail.password"));

//Middleware Function
//Built in middleware functions
app.use(express.json()); //req.body
app.use(express.urlencoded()); //when submitting form information through a URL (req.body)
//app.use(express.urlencoded({ extended: true })); //allows extended data through forms such as arrays
app.use(express.static("public")); //serve static assets

//Custom imported Middleware function
app.use(logger);

// //Creating a Custom Middleware Function (Moved to seperate Module)
// app.use((req, res, next) => {
//   console.log("Logging..");
//   next();
// });

app.use((req, res, next) => {
  console.log("Authenticating..");
  next();
});

//Third-party Middleware functions
app.use(helmet()); //Helps secure your apps by setting various HTTP headers
// app.use(morgan("tiny")); //HTTP request logger

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Romance" },
];

//Route Handler Functions (Considered a Middleware Function)
app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.post("/api/genres", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

app.put("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});

app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(genre, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
