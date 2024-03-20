const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
  resources: [{ type: String }],
  bookings: [
    {
      startTime: { type: Date, required: true },
      endTime: { type: Date, required: true },
      course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    },
  ],
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
