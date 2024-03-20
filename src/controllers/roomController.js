const Room = require("../models/Room");

const createRoom = async (req, res) => {
  try {
    const { name, capacity, resources } = req.body;
    const newRoom = new Room({ name, capacity, resources });
    await newRoom.save();

    res
      .status(201)
      .json({ message: "Room created successfully", room: newRoom });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateRoom = async (req, res) => {
  try {
    const { name, capacity, resources } = req.body;
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    room.name = name || room.name;
    room.capacity = capacity || room.capacity;
    room.resources = resources || room.resources;

    await room.save();

    res.status(200).json({ message: "Room updated successfully", room });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    await room.remove();

    res.status(200).json({ message: "Room deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const bookRoom = async (req, res) => {
  try {
    const { startTime, endTime, courseId } = req.body;
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const isOverlapping = room.bookings.some(
      (booking) =>
        (startTime >= booking.startTime && startTime < booking.endTime) ||
        (endTime > booking.startTime && endTime <= booking.endTime)
    );

    if (isOverlapping) {
      return res
        .status(400)
        .json({ message: "Room is already booked for the specified time" });
    }

    room.bookings.push({ startTime, endTime, course: courseId });
    await room.save();

    res.status(200).json({ message: "Room booked successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createRoom, getRooms, updateRoom, deleteRoom, bookRoom };
