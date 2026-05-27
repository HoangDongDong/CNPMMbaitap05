const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema(
  {
    breakfast: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },
    lunch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },
    dinner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },
    snack: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },
  },
  { _id: false },
);

const daySchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    meals: {
      type: mealSchema,
      default: () => ({}),
    },
  },
  { _id: false },
);

const mealPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      default: "",
      trim: true,
    },
    weekStart: {
      type: Date,
      required: true,
    },
    weekEnd: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
      default: "",
      trim: true,
    },
    days: {
      type: [daySchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

mealPlanSchema.index({ userId: 1, weekStart: 1 }, { unique: true });

const MealPlan = mongoose.model("MealPlan", mealPlanSchema);

module.exports = MealPlan;
