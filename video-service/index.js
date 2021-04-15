const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./middleware/logger");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const express = require("express");
const { urlencoded } = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/video-service")
  .then(() => {
    console.log("Connected to MongoDb...");
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB...", err);
  });

//Set environment on node using the following
//export NODE_ENV=production (On Terminal)
//Code to run only on development
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan enabled...");
}

//Db work...
dbDebugger("Connected to the database");

console.log("Application Name: " + config.get("name"));
// console.log("Mail Server: " + config.get("mail.host"));
// console.log("Mail Server: " + config.get("mail.password"));

//Middleware Function
//Built in middleware functions
app.use(express.json()); //req.body
app.use(express.urlencoded()); //when submitting form information through a URL (req.body)
//app.use(express.urlencoded({ extended: true })); //allows extended data through forms such as arrays
app.use(express.static("public")); //serve static assets

//Custom imported Middleware function
app.use(logger);
app.use("/api/genres", genres);
app.use("/api/customers", customers);

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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
