const NextModal = require("../models/NextModal");

exports.createModal = async (req, res) => {
  try {
    const modal = new NextModal({ ...req.body, user: req.user.id });
    await modal.save();
    res.status(201).json(modal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getModals = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const query = status ? { status } : {};
    const modals = await NextModal.find(query)
      .populate("user")
      .skip((page - 1) * limit)
      .limit(limit);
    res.json(modals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getModalById = async (req, res) => {
  try {
    const modal = await NextModal.findById(req.params.id).populate("user");
    if (!modal) {
      return res.status(404).json({ error: "Modal not found" });
    }
    res.json(modal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateModal = async (req, res) => {
  try {
    const modal = await NextModal.findById(req.params.id);
    if (!modal) {
      return res.status(404).json({ error: "Modal not found" });
    }
    if (modal.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this modal" });
    }
    Object.assign(modal, req.body);
    await modal.save();
    res.json(modal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteModal = async (req, res) => {
  try {
    const modal = await NextModal.findById(req.params.id);
    if (!modal) {
      return res.status(404).json({ error: "Modal not found" });
    }
    await NextModal.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Modal deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getModalsByUser = async (req, res) => {
  try {
    const modals = await NextModal.find({ user: req.params.userId }).populate(
      "user"
    );
    res.json(modals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
