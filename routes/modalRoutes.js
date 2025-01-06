const express = require("express");
const { authenticateJWT, isAdmin } = require("../middlewares/authMiddleware");
const modalController = require("../controllers/modalController");

const router = express.Router();

router.post("/", authenticateJWT, isAdmin, modalController.createModal);

router.get("/", modalController.getModals);

router.get("/:id", modalController.getModalById);

router.put("/:id", authenticateJWT, isAdmin, modalController.updateModal);
router.delete("/:id", authenticateJWT, isAdmin, modalController.deleteModal);
router.get("/user/:userId", modalController.getModalsByUser);

module.exports = router;
