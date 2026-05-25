const {
  registerService,
  loginService,
  forgotPasswordService,
} = require("../services/userService");
const User = require("../models/user");

// Register Controller
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and password",
      });
    }

    const result = await registerService(name, email, password);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Registration failed",
    });
  }
};

// Login Controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const result = await loginService(email, password);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};

// Forgot Password Controller
const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide an email address",
      });
    }

    const result = await forgotPasswordService(email);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message || "Forgot password request failed",
    });
  }
};

// Get All Users Controller (Protected)
const getAllUsersController = async (req, res) => {
  try {
    // Fetch all users, excluding the password field
    const users = await User.findAll({
      attributes: ["id", "name", "email", "role", "createdAt", "updatedAt"],
    });

    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      count: users.length,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve users",
    });
  }
};

module.exports = {
  registerController,
  loginController,
  forgotPasswordController,
  getAllUsersController,
};
