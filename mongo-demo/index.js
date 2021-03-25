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

//Creating and Saving Documents using Mongoose
async function createCourse() {
  const course = new Course({
    name: "Node.js Course",
    author: "Cristian",
    tags: ["node", "backend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log("Result ", result);
}

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

async function getCourses() {
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
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

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

async function getCoursesUsingQueryOperators() {
  // or
  // and

  const courses = await Course.find()
    .or([{ author: "Cristian" }, { isPublished: true }])
    .and([{ author: "Cristian" }, { isPublished: true }])
    // .find({ author: "Cristian", isPublished: true })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

async function getCoursesUsingRegularExpressions() {
  // or
  // and

  const courses = await Course.find()
    // .find({ author: "Cristian", isPublished: true })

    // Starts with Cristian
    .find({ author: /^Cris/ })

    // Ends with Custodio
    .find({ author: /Custodio$/i })

    //Contains Cristian
    .find({ author: /.*Cristian.*/i })

    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

async function updateApproachQueryFirst(id) {
  const course = await Course.findById(id);
  if (!course) return;

  course.isPublished = true;
  course.author = "Another Author";

  const result = await course.save();
  console.log(result);

  //   Another Approach
  //   course.set({
  //       isPublished: true,
  //       author: "another atuhro"
  //   })
}

getCourses();
// createCourse();
