const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");
const auth = require("../middlewares/auth");

router.post("/", auth.isAdmin, roomController.createRoom);
router.get("/", roomController.getRooms);
router.put("/:id", auth.isAdmin, roomController.updateRoom);
router.delete("/:id", auth.isAdmin, roomController.deleteRoom);
router.post("/:id/book", auth.isAdmin, roomController.bookRoom);

module.exports = router;
