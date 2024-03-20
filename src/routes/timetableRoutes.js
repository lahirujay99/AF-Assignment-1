const express = require("express");
const router = express.Router();
const timetableController = require("../controllers/timetableController");
const auth = require("../middlewares/auth");

router.post("/", auth.isAdmin, timetableController.createTimetable);
router.get("/", timetableController.getTimetables);
router.put("/:id", auth.isAdmin, timetableController.updateTimetable);
router.delete("/:id", auth.isAdmin, timetableController.deleteTimetable);

module.exports = router;
