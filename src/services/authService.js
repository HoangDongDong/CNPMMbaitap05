/**
 * AUTHENTICATION SERVICE
 * Xu ly logic nghiep vu cho Forgot/Reset Password
 */

const bcrypt = require("bcrypt");
const User = require("../models/user");
const { sendOtpEmail } = require("../config/email");

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const forgotPassword = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Email not found");
    }

    const otp = generateOtp();
    const otpExpiresTime = new Date(Date.now() + 10 * 60 * 1000);

    user.resetOtp = otp;
    user.resetOtpExpires = otpExpiresTime;
    await user.save();

    await sendOtpEmail(email, otp);

    return {
      success: true,
      message: "OTP sent successfully to your email. Valid for 10 minutes.",
    };
  } catch (error) {
    console.error("Error in forgotPassword:", error.message);
    throw new Error(
      error.message || "Failed to process forgot password request",
    );
  }
};

const resetPassword = async (email, otp, newPassword) => {
  try {
    const user = await User.findOne({ email }).select(
      "+resetOtp +resetOtpExpires",
    );

    if (!user) {
      throw new Error("User not found");
    }

    const storedOtp = user.resetOtp;
    const otpExpires = user.resetOtpExpires;

    if (!storedOtp) {
      throw new Error(
        "No reset request found. Please request a new password reset.",
      );
    }

    if (storedOtp !== otp) {
      throw new Error("Invalid OTP");
    }

    if (new Date() > otpExpires) {
      user.resetOtp = null;
      user.resetOtpExpires = null;
      await user.save();
      throw new Error("OTP has expired. Please request a new password reset.");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetOtp = null;
    user.resetOtpExpires = null;
    await user.save();

    return {
      success: true,
      message:
        "Password reset successfully. You can now login with your new password.",
    };
  } catch (error) {
    console.error("Error in resetPassword:", error.message);
    throw new Error(error.message || "Failed to reset password");
  }
};

const verifyEmailExists = async (email) => {
  try {
    const user = await User.findOne({ email });
    return !!user;
  } catch (error) {
    console.error("Error in verifyEmailExists:", error.message);
    throw error;
  }
};

module.exports = {
  forgotPassword,
  resetPassword,
  verifyEmailExists,
  generateOtp,
};
