const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  location: { type: String, required: true },
});

const timetableSchema = new mongoose.Schema({
  sessions: [sessionSchema],
});

const Timetable = mongoose.model("Timetable", timetableSchema);
module.exports = Timetable;
