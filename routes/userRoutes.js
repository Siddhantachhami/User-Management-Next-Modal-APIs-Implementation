const express = require("express");
const upload = require("../config/multer");
const {
  updateProfile,
  deleteProfile,
  getAuthenticatedUser,
} = require("../controllers/userController");
const { authenticateJWT, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.put("/user", upload.single("profileImage"), updateProfile);
router.delete("/user", authenticateJWT, isAdmin, deleteProfile);
router.get("/user/:userId", authenticateJWT, isAdmin, getAuthenticatedUser);

module.exports = router;
