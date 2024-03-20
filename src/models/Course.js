const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  credits: { type: Number, required: true },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
