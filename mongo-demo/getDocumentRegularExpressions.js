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
