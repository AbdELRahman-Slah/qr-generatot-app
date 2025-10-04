const express = require("express");
const authRouter = express.Router();
const {
  registerController,
  loginController,
  getCurrentUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controller");
const verifyToken = require("../middlewares/verifyToken");

authRouter
  .post("/register", registerController)
  .post("/login", loginController)
  .get("/me", verifyToken, getCurrentUser)
  .post("/forgot-password", forgotPassword)
  .post("/reset-password/:resetToken", resetPassword);

module.exports = authRouter;
