const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((err) => console.error("Could not connect to MongoDB...", err));

//Define Schema
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    // match:/pattern/
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
  },
  author: String,

  //-----------------
  //Custom Validator!
  //-----------------

  tags: {
    type: Array,
    validate: {
      validator: function (v) {
        //return if v has a value and v lenght greater than 0
        return v && v.length > 0;
      },
      message: "A course should have at least one tag",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  //Conditional on whether the price will be required if the course is published
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200,
  },
});

//Convert Models
const Course = mongoose.model("Course", courseSchema);

//Creating and Saving Documents using Mongoose
async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    category: "web",
    author: "Cristian",
    tags: [],
    isPublished: true,
    price: 15,
  });

  try {
    const result = await course.save();
    console.log("Result ", result);
  } catch (error) {
    console.log(error.message);
  }
}

createCourse();
