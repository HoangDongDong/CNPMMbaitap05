const mealPlanService = require("../services/mealPlanService");

const createMealPlan = async (req, res) => {
  try {
    const mealPlan = await mealPlanService.createMealPlan(
      req.user.id,
      req.body,
    );

    return res.status(201).json({
      success: true,
      message: "Meal plan created",
      data: mealPlan,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to create meal plan",
    });
  }
};

const listMealPlans = async (req, res) => {
  try {
    const items = await mealPlanService.listMealPlans(req.user.id, req.query);
    return res.status(200).json({
      success: true,
      message: "Meal plans retrieved",
      data: items,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to list meal plans",
    });
  }
};

const getMealPlan = async (req, res) => {
  try {
    const mealPlan = await mealPlanService.getMealPlanById(
      req.user.id,
      req.params.id,
    );

    return res.status(200).json({
      success: true,
      message: "Meal plan retrieved",
      data: mealPlan,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message || "Meal plan not found",
    });
  }
};

const updateMealPlan = async (req, res) => {
  try {
    const mealPlan = await mealPlanService.updateMealPlan(
      req.user.id,
      req.params.id,
      req.body,
    );

    return res.status(200).json({
      success: true,
      message: "Meal plan updated",
      data: mealPlan,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update meal plan",
    });
  }
};

const deleteMealPlan = async (req, res) => {
  try {
    await mealPlanService.deleteMealPlan(req.user.id, req.params.id);

    return res.status(200).json({
      success: true,
      message: "Meal plan deleted",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message || "Meal plan not found",
    });
  }
};

const assignMealSlot = async (req, res) => {
  try {
    const mealPlan = await mealPlanService.assignMealSlot(
      req.user.id,
      req.params.id,
      req.body,
    );

    return res.status(200).json({
      success: true,
      message: "Meal slot assigned",
      data: mealPlan,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to assign meal slot",
    });
  }
};

module.exports = {
  createMealPlan,
  listMealPlans,
  getMealPlan,
  updateMealPlan,
  deleteMealPlan,
  assignMealSlot,
};
