const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const registerController = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  if (password.length < 8) {
    return next(new AppError("Password must be at least 8 characters", 400));
  }

  const user = await User.findOne({ email });

  if (user) {
    return next(new AppError("User already exists", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { id } = await User.create({
    email,
    password: hashedPassword,
  });

  const token = generateToken(id, email);

  res.status(201).json({
    status: "success",
    message: "User has registered successfully",
    data: null,
    token,
  });
});

const loginController = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return next(new AppError("Invalid password", 400));
  }

  const token = generateToken(user.id, user.email);

  res.status(200).json({
    status: "success",
    message: "User has logged in successfully",
    data: null,
    token,
  });
});

const getCurrentUser = catchAsync(async (req, res, next) => {
  const user = req.user;

  const existUser = await User.findById(user.id).select("-password -__v");

  if (!existUser) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user: existUser,
    },
  });
});

const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError("Please provide email", 400));
  }

  const user = await User.findOne({ email }).select("-password -__v");

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 mins
  await user.save({ validateBeforeSave: false });

  // backend/controllers/auth.controller.js - forgotPassword function
  const frontendUrl = process.env.FRONTEND_URL;
  const resetUrl = `${frontendUrl}/reset?token=${resetToken}`;

  console.log(resetUrl);

  try {
    await sendEmail({
      to: email,
      subject: "Password Reset Instructions",
      html: `
        <p>You requested a password reset.</p>
        <p>This link will expire in 10 minutes.</p>
        <button style="background-color: #667eea; color: #ffffff; padding: 10px 20px; border-radius: 5px; text-decoration: none;">
          <a href="${resetUrl}">Reset your password</a>
        </button>
        <p>Or copy this link if the button doesn't work:</p>
        <p>${resetUrl}</p>
        <p>If you did not request this, you can safely ignore this email.</p>
      `,
    });

    res.status(200).json({
      status: "success",
      message: "Reset instructions have been sent to your email",
      data: null,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError("Failed to send reset email. Try again later.", 500)
    );
  }
});

const resetPassword = catchAsync(async (req, res, next) => {
  const { resetToken } = req.params;
  const { password } = req.body;

  if (!resetToken || !password) {
    return next(new AppError("Please provide reset token and password", 400));
  }

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Token invalid or expired", 400));
  }

  if (password.length < 8) {
    return next(new AppError("Password must be at least 8 characters", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  const token = generateToken(user.id, user.email);

  res.status(200).json({
    status: "success",
    message: "User has reset password successfully",
    data: null,
    token,
  });
});

module.exports = {
  registerController,
  loginController,
  getCurrentUser,
  forgotPassword,
  resetPassword,
};
