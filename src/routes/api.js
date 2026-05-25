const express = require("express");
const {
  registerController,
  loginController,
  forgotPasswordController,
  getAllUsersController,
} = require("../controllers/userController");
const auth = require("../middleware/auth");

const router = express.Router();

// Public routes
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forgot-password", forgotPasswordController);

// Protected routes
router.get("/v1/api/user", auth, getAllUsersController);

module.exports = router;
