const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

//Parameters
app.get("/api/courses/:id", (req, res) => {
  res.send(req.params.id);
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
