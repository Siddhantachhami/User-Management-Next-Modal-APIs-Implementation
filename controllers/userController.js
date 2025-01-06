const User = require("../models/User");
const cloudinary = require("../config/cloudnary");
const bcrypt = require("bcryptjs");

const updateProfile = async (req, res) => {
  try {
    const { userId, name, email, password } = req.body;
    let profileImage = req.body.profileImage;
    let hashedPassword = password;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    if (req.file) {
      const cloudinaryResponse = await cloudinary.uploader.upload(
        req.file.path
      );
      profileImage = cloudinaryResponse.secure_url;
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { name, email, password: hashedPassword, profileImage },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Profile updated successfully", updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (deletedUser.profileImage) {
      const publicId = deletedUser.profileImage.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAuthenticatedUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Authenticated user retrieved successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { deleteProfile, updateProfile, getAuthenticatedUser };
