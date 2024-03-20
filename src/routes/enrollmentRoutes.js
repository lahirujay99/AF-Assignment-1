const express = require("express");
const router = express.Router();
const enrollmentController = require("../controllers/enrollmentController");
const auth = require("../middlewares/auth");

router.post("/", auth.isStudent, enrollmentController.enrollStudent);
router.get("/", auth.isAdmin, enrollmentController.getEnrollments);
router.delete("/:id", auth.isAdmin, enrollmentController.dropEnrollment);

module.exports = router;
