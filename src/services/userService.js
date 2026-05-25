const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/user");

// Register Service
const registerService = async (name, email, password) => {
  try {
    // Check for duplicate email
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    return {
      success: true,
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  } catch (error) {
    throw error;
  }
};

// Login Service
const loginService = async (email, password) => {
  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Invalid email or password");
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1h" },
    );

    return {
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  } catch (error) {
    throw error;
  }
};

// Forgot Password Service
const forgotPasswordService = async (email) => {
  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }

    // Generate random reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Save token to database
    await user.update({
      resetPasswordToken: resetToken,
    });

    // Mock email sending (in production, you would send actual email)
    return {
      success: true,
      message: "Password reset link sent to email successfully",
      resetToken, // In production, don't return this to client
      mockEmailInfo: {
        to: email,
        subject: "Password Reset Request",
        body: `Use this token to reset your password: ${resetToken}`,
      },
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  registerService,
  loginService,
  forgotPasswordService,
};
