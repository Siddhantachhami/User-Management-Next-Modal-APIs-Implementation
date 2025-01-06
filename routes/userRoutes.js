const express = require("express");
const upload = require("../config/multer");
const {
  updateProfile,
  deleteProfile,
  getAuthenticatedUser,
} = require("../controllers/userController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.put(
  "/user",
  authMiddleware,
  upload.single("profileImage"),
  updateProfile
);
router.delete("/user", authMiddleware, adminMiddleware, deleteProfile);
router.get("/user", authMiddleware, getAuthenticatedUser);

module.exports = router;
