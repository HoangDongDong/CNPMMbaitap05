const express = require("express");
const auth = require("../middleware/auth");
const mealPlanController = require("../controllers/mealPlanController");

const router = express.Router();

router.post("/", auth, mealPlanController.createMealPlan);
router.get("/", auth, mealPlanController.listMealPlans);
router.get("/:id", auth, mealPlanController.getMealPlan);
router.put("/:id", auth, mealPlanController.updateMealPlan);
router.delete("/:id", auth, mealPlanController.deleteMealPlan);
router.patch("/:id/assign", auth, mealPlanController.assignMealSlot);

module.exports = router;
