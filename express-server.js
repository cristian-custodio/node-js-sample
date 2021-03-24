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

  const { error } = validateCourse(req.body);

  if (error) return res.status(400).send(error.details[0].message);

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
    return res.status(404).send("The course with the given id was not found");
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  //lookup course with given ID
  //if not exist return 404

  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given id was not found");

  //validate the course
  //If Invalid, return 400 - bad request

  const { error } = validateCourse(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  //update course

  course.name = req.body.name;
  res.send(course);

  //reutrn the updated course
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

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
}

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given id was not found");

  //delete
  const index = courses.indexOf(course);
  courses.splice(index);

  //return the same course

  res.send(course);
});
