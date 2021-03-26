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

async function updateDocumentDirectlyOnDatabase(id) {
  const result = await Course.updateOne(
    { _id: id },
    {
      $set: {
        author: "Cristian",
        isPusblished: false,
      },
    }
  );
}

async function updateDocumentDirectlyOnDatabaseAndReturnUpdatedOne(id) {
  const result = await Course.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        author: "Cristian",
        isPusblished: false,
      },
    },
    { new: true }
  );

  console.log(result);

  //   Another Approach
  //   course.set({
  //       isPublished: true,
  //       author: "another atuhro"
  //   })
}
