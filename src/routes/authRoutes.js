/**
 * AUTH ROUTES
 * Dinh tuyen va gan middleware bao mat
 */

const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

const {
  forgotPasswordLimiter,
  resetPasswordLimiter,
} = require("../middlewares/rateLimiter");
const {
  validateForgotPassword,
  validateResetPassword,
} = require("../middlewares/validators");

router.post(
  "/forgot-password",
  forgotPasswordLimiter,
  validateForgotPassword,
  authController.forgotPassword,
);

router.post(
  "/reset-password",
  resetPasswordLimiter,
  validateResetPassword,
  authController.resetPassword,
);

module.exports = router;
