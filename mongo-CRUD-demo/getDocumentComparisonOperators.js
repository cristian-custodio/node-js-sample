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

async function getCoursesUsingQueryComparisonOperators() {
  //Comparison query operators
  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte (greater than or equal to)
  // lt (less than)
  // n
  // nin (not in)
  const courses = await Course.find({ price: { $in: [10, 15, 20] } })
    // .find({ price: { $gte: 10, $lte: 20 } })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}
