const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((err) => console.error("Could not connect to MongoDB...", err));

//Define Schema
const courseSchema = new mongoose.Schema({
  //String
  //Number
  //Date
  //Buffer
  //Boolean
  //ObjectID
  //Array
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

//Convert Models
const Course = mongoose.model("Course", courseSchema);

//Pagination
async function getCoursesPagination() {
  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course.find({ author: "Cristian", isPublished: true })
    .skip((pageNumber - 1)(pageSize))
    .limit(pageSize)
    .sort({ name: 1 })
    .count();
  console.log(courses);
}
