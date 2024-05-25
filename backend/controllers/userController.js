import crypto from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { sendPasswordResetEmail } from "../utils/sendEmail.js";
import expressAsyncHandler from "express-async-handler";

// Create token
const createToken = (id) => {
  console.log("JWT_SECRET (createToken):", process.env.JWT_SECRET); // Log the secret
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token expiry
  });
};

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
});

// Register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  try {
    // Check if user already exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Validate email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
});

// Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: createToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Get all users (admin only)
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
  console.log(getUsers);
});

const generateResetToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

const forgotPassword = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = generateResetToken();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
    await user.save();

    await sendPasswordResetEmail(user, user.resetPasswordToken);

    res.status(200).json({ message: "Password reset email sent", resetToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const getResetPasswordToken = expressAsyncHandler(async (req, res) => {
  const { token } = req.params;

  // Serve a simple HTML form for password reset
  res.send(`
      <form action="/reset-password" method="POST">
        <input type="hidden" name="token" value="${token}" />
        <label for="newPassword">New Password:</label>
        <input type="password" name="newPassword" required />
        <button type="submit">Reset Password</button>
      </form>
    `);
});

const resetPassword = expressAsyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Password reset token is invalid or has expired" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password has been reset" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  forgotPassword,
  getResetPasswordToken,
  resetPassword,
  // sendPasswordResetLink,
  // verifyEmailLink,
  // resetPassword,
  // verifyemail,
};
