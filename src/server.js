/**
 * SERVER ENTRY POINT
 * Khoi dong Express server
 */

require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log("\n" + "=".repeat(60));
  console.log("Server started successfully!");
  console.log(`Server running on: http://localhost:${PORT}`);
  console.log("=".repeat(60) + "\n");

  console.log("Available Routes:");
  console.log("  POST http://localhost:" + PORT + "/api/auth/forgot-password");
  console.log("  POST http://localhost:" + PORT + "/api/auth/reset-password");
  console.log("  GET  http://localhost:" + PORT + "/api/products/top");
  console.log("  GET  http://localhost:" + PORT + "/api/health\n");
});

process.on("SIGTERM", () => {
  console.log("\nSIGTERM received. Closing server...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("\nSIGINT received. Closing server...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err.message);
  process.exit(1);
});
