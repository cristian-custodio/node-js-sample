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

  //Schema Type Options Here
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],

    //Schema Type Additional Options Here
    lowercase: true,
    // uppercase: true,
    trim: true, //Remov string paddings
  },
  author: String,

  //-----------------
  //Custom Async Validator!
  //-----------------

  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function (v, callback) {
        setTimeout(() => {
          //Do some work
          const result = v && v.length > 0;
          callback(result);
        }, 4000);

        //return if v has a value and v lenght greater than 0
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

    //Schema Type Options (These are irrelavant to type)
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
});

//Convert Models
const Course = mongoose.model("Course", courseSchema);

//Creating and Saving Documents using Mongoose
async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    category: "Web",
    author: "Cristian",
    tags: ["frontend"],
    isPublished: true,
    price: 15.8,
  });

  try {
    const result = await course.save();
    console.log("Result ", result);
  } catch (error) {
    //Itirate through multiple errors
    for (let field in error.errors) console.log(error.errors[field].message);
  }
}

createCourse();
