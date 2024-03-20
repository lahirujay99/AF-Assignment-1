const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const auth = require("../middlewares/auth");

router.post("/", auth.isAdmin, courseController.createCourse);
router.get("/", courseController.getCourses);
router.put("/:id", auth.isAdmin, courseController.updateCourse);
router.delete("/:id", auth.isAdmin, courseController.deleteCourse);

module.exports = router;
