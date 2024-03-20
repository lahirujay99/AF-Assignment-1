const Enrollment = require("../models/Enrollment");
const User = require("../models/User");
const Course = require("../models/Course");

const enrollStudent = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    const student = await User.findById(studentId);
    const course = await Course.findById(courseId);

    if (!student || student.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const existingEnrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId,
    });
    if (existingEnrollment) {
      return res
        .status(400)
        .json({ message: "Student is already enrolled in this course" });
    }

    const newEnrollment = new Enrollment({
      student: studentId,
      course: courseId,
    });
    await newEnrollment.save();

    res.status(201).json({ message: "Student enrolled successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("student", "name email")
      .populate("course", "name code");
    res.status(200).json(enrollments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const dropEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    await enrollment.remove();

    res.status(200).json({ message: "Enrollment dropped successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { enrollStudent, getEnrollments, dropEnrollment };
