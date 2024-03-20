const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongodbURI = process.env.MONGODB_URI;

const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const timetableRoutes = require("./routes/timetableRoutes");
const roomRoutes = require("./routes/roomRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/timetables", timetableRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/enrollments", enrollmentRoutes);

// MongoDB connection
mongoose
  .connect(mongodbURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
