const express = require("express");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/authMiddleware");
const modalController = require("../controllers/modalController");

const router = express.Router();
router.post("/", authMiddleware, adminMiddleware, modalController.createModal);
router.get("/", authMiddleware, modalController.getModals);
router.get("/:id", authMiddleware, modalController.getModalById);
router.put("/:id", authMiddleware, modalController.updateModal);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  modalController.deleteModal
);
router.get("/user/:userId", authMiddleware, modalController.getModalsByUser);

module.exports = router;
