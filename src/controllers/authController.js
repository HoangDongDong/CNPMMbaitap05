/**
 * AUTHENTICATION CONTROLLER
 * Xu ly request, goi service va tra response
 */

const authService = require("../services/authService");

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await authService.forgotPassword(email);

    return res.status(200).json({
      success: true,
      message: result.message,
      data: {
        email: email,
      },
    });
  } catch (error) {
    console.error("Error in forgotPassword controller:", error.message);

    let statusCode = 500;
    let message = "Internal server error";

    if (error.message.includes("not found")) {
      statusCode = 404;
      message = error.message;
    } else if (error.message.includes("Failed")) {
      statusCode = 500;
      message = error.message;
    } else {
      statusCode = 400;
      message = error.message;
    }

    return res.status(statusCode).json({
      success: false,
      message: message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const result = await authService.resetPassword(email, otp, newPassword);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error("Error in resetPassword controller:", error.message);

    let statusCode = 500;
    let message = "Internal server error";

    if (error.message.includes("not found")) {
      statusCode = 404;
      message = error.message;
    } else if (
      error.message.includes("Invalid") ||
      error.message.includes("expired")
    ) {
      statusCode = 400;
      message = error.message;
    } else {
      statusCode = 400;
      message = error.message;
    }

    return res.status(statusCode).json({
      success: false,
      message: message,
    });
  }
};

module.exports = {
  forgotPassword,
  resetPassword,
};
