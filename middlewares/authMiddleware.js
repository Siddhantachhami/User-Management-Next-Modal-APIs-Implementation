const jwt = require("jsonwebtoken");
const User = require("../models/User");
const httpStatus = require("http-status");

exports.authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: "Unauthorized", error: err.message });
  }
};

exports.adminMiddleware = (req, res, next) => {
  if (!req.user) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }

  if (req.user.role !== "admin") {
    return res.status(httpStatus.FORBIDDEN).json({ message: "Forbidden" });
  }

  next();
};
