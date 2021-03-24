const express = require("express");
const Joi = require("joi");
const { rest } = require("underscore");
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "course 1" },
  { id: 2, name: "course 2" },
  { id: 3, name: "course 3" },
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
  //Example Validation Using JOI

  const schema = {
    name: Joi.string().min(3).required(),
  };

  const result = Joi.validate(req.body, schema);

  if (result.error) {
    res.status(400).send(result.error);
  }

  console.log(result);

  //   if (error) {
  //     rest.status(400).send(error);
  //     return;
  // }

  //Example validation
  //   if (!req.body.name || req.body.name.length < 3) {
  //     res
  //       .status(400)
  //       .send("Nam is required and shoudl be a minimum 3 characters");
  //     return;
  //   }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});

//Route Parameters
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send("The course with the given id was not found");
  res.send(course);
});

//Query Parameters
//http://localhost:5000/api/courses?sortby=name
app.get("/api/courses/", (req, res) => {
  res.send(req.query);
});

//Environment Variables
//PORT
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

//Restful resources using express
// app.get();
// app.post();
// app.put();
// app.delete();
