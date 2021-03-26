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

//Return Count
async function getCoursesCount() {
  //Comparison query operators
  // eq (equal)
  // ne (not equal)
  // gt (greater than or equal to)
  // lt (less than)
  // n
  // nin (not in)
  const courses = await Course.find({ author: "Cristian", isPublished: true })
    .limit(10)
    .sort({ name: 1 })
    .count();
  console.log(courses);
}
