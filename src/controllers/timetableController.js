const Timetable = require("../models/Timetable");
const Course = require("../models/Course");
const User = require("../models/User");

const createTimetable = async (req, res) => {
  try {
    const { sessions } = req.body;
    const validSessions = [];

    for (const session of sessions) {
      const course = await Course.findById(session.course);
      const faculty = await User.findById(session.faculty);

      if (!course || !faculty) {
        return res.status(404).json({ message: "Course or faculty not found" });
      }

      validSessions.push({
        course: session.course,
        startTime: session.startTime,
        endTime: session.endTime,
        faculty: session.faculty,
        location: session.location,
      });
    }

    const newTimetable = new Timetable({ sessions: validSessions });
    await newTimetable.save();

    res
      .status(201)
      .json({
        message: "Timetable created successfully",
        timetable: newTimetable,
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTimetables = async (req, res) => {
  try {
    const timetables = await Timetable.find()
      .populate("sessions.course")
      .populate("sessions.faculty", "name");
    res.status(200).json(timetables);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTimetable = async (req, res) => {
  try {
    const { sessions } = req.body;
    const timetable = await Timetable.findById(req.params.id);
    if (!timetable) {
      return res.status(404).json({ message: "Timetable not found" });
    }

    const validSessions = [];

    for (const session of sessions) {
      const course = await Course.findById(session.course);
      const faculty = await User.findById(session.faculty);

      if (!course || !faculty) {
        return res.status(404).json({ message: "Course or faculty not found" });
      }

      validSessions.push({
        course: session.course,
        startTime: session.startTime,
        endTime: session.endTime,
        faculty: session.faculty,
        location: session.location,
      });
    }

    timetable.sessions = validSessions;
    await timetable.save();

    res
      .status(200)
      .json({ message: "Timetable updated successfully", timetable });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.findById(req.params.id);
    if (!timetable) {
      return res.status(404).json({ message: "Timetable not found" });
    }

    await timetable.remove();

    res.status(200).json({ message: "Timetable deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createTimetable,
  getTimetables,
  updateTimetable,
  deleteTimetable,
};
