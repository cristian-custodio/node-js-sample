const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

//Route Parameters
app.get("/api/courses/:id", (req, res) => {
  res.send(req.params);
});

//Query Parameters
//http://localhost:5000/api/courses/1?sortby=name
app.get("/api/courses/:id", (req, res) => {
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
