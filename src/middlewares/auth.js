// middlewares/auth.js
const jwt = require("jsonwebtoken");

const isAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid authentication token" });
  }
};

const isStudent = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "student") {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid authentication token" });
  }
};

module.exports = { isAdmin, isStudent };
