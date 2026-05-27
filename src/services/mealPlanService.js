const MealPlan = require("../models/mealPlan");

const toDate = (value, fieldName) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid ${fieldName}`);
  }
  return date;
};

const toDayStart = (date) => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

const buildWeekEnd = (weekStart) => {
  const end = new Date(weekStart);
  end.setDate(end.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
};

const normalizeMeals = (meals = {}) => ({
  breakfast: meals.breakfast || null,
  lunch: meals.lunch || null,
  dinner: meals.dinner || null,
  snack: meals.snack || null,
});

const buildDefaultDays = (weekStart) => {
  const days = [];
  for (let i = 0; i < 7; i += 1) {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + i);
    days.push({ date, meals: normalizeMeals() });
  }
  return days;
};

const normalizeDays = (weekStart, days = []) => {
  if (!Array.isArray(days) || days.length === 0) {
    return buildDefaultDays(weekStart);
  }

  return days.map((day) => ({
    date: toDayStart(toDate(day.date, "day.date")),
    meals: normalizeMeals(day.meals),
  }));
};

const createMealPlan = async (userId, payload) => {
  const weekStart = toDayStart(toDate(payload.weekStart, "weekStart"));
  const weekEnd = buildWeekEnd(weekStart);
  const days = normalizeDays(weekStart, payload.days);

  const existing = await MealPlan.findOne({ userId, weekStart }).lean();
  if (existing) {
    throw new Error("Meal plan already exists for this week");
  }

  const mealPlan = await MealPlan.create({
    userId,
    title: payload.title || "",
    weekStart,
    weekEnd,
    notes: payload.notes || "",
    days,
  });

  return mealPlan;
};

const listMealPlans = async (userId, query) => {
  const filter = { userId };

  if (query.from || query.to) {
    const from = query.from ? toDayStart(toDate(query.from, "from")) : null;
    const to = query.to ? toDayStart(toDate(query.to, "to")) : null;

    filter.weekStart = {};
    if (from) {
      filter.weekStart.$gte = from;
    }
    if (to) {
      filter.weekStart.$lte = to;
    }
  }

  return MealPlan.find(filter).sort({ weekStart: -1 }).lean();
};

const getMealPlanById = async (userId, id) => {
  const mealPlan = await MealPlan.findOne({ _id: id, userId }).lean();
  if (!mealPlan) {
    throw new Error("Meal plan not found");
  }
  return mealPlan;
};

const updateMealPlan = async (userId, id, payload) => {
  const current = await MealPlan.findOne({ _id: id, userId });
  if (!current) {
    throw new Error("Meal plan not found");
  }

  if (payload.title !== undefined) {
    current.title = payload.title;
  }
  if (payload.notes !== undefined) {
    current.notes = payload.notes;
  }

  if (payload.weekStart) {
    const weekStart = toDayStart(toDate(payload.weekStart, "weekStart"));
    current.weekStart = weekStart;
    current.weekEnd = buildWeekEnd(weekStart);

    if (payload.days) {
      current.days = normalizeDays(weekStart, payload.days);
    }
  } else if (payload.days) {
    current.days = normalizeDays(current.weekStart, payload.days);
  }

  await current.save();
  return current.toObject();
};

const deleteMealPlan = async (userId, id) => {
  const result = await MealPlan.findOneAndDelete({ _id: id, userId }).lean();
  if (!result) {
    throw new Error("Meal plan not found");
  }
  return result;
};

const assignMealSlot = async (userId, id, payload) => {
  const { date, slot, productId } = payload;
  const slots = ["breakfast", "lunch", "dinner", "snack"];

  if (!slots.includes(slot)) {
    throw new Error("Invalid slot");
  }

  const targetDate = toDayStart(toDate(date, "date"));
  const mealPlan = await MealPlan.findOne({ _id: id, userId });

  if (!mealPlan) {
    throw new Error("Meal plan not found");
  }

  const day = mealPlan.days.find(
    (item) => toDayStart(item.date).getTime() === targetDate.getTime(),
  );

  if (!day) {
    throw new Error("Day not found in meal plan");
  }

  day.meals[slot] = productId || null;
  await mealPlan.save();

  return mealPlan.toObject();
};

module.exports = {
  createMealPlan,
  listMealPlans,
  getMealPlanById,
  updateMealPlan,
  deleteMealPlan,
  assignMealSlot,
};
