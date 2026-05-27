const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { connectDatabase } = require("../config/database");
const User = require("../models/user");
const Product = require("../models/product");

const initSqlPath =
  process.env.INIT_SQL_PATH ||
  path.resolve(
    __dirname,
    "..",
    "..",
    "..",
    "project",
    "WebNauAn",
    "backend",
    "database",
    "init.sql",
  );

const extractValueTuples = (valuesText) => {
  const tuples = [];
  let inQuote = false;
  let depth = 0;
  let start = -1;

  for (let i = 0; i < valuesText.length; i += 1) {
    const char = valuesText[i];
    const prev = valuesText[i - 1];

    if (char === "'" && prev !== "\\") {
      inQuote = !inQuote;
    }

    if (!inQuote) {
      if (char === "(" && depth === 0) {
        depth = 1;
        start = i + 1;
      } else if (char === "(" && depth > 0) {
        depth += 1;
      } else if (char === ")" && depth === 1) {
        tuples.push(valuesText.slice(start, i));
        depth = 0;
        start = -1;
      } else if (char === ")" && depth > 1) {
        depth -= 1;
      }
    }
  }

  return tuples;
};

const splitFields = (tupleText) => {
  const fields = [];
  let inQuote = false;
  let current = "";

  for (let i = 0; i < tupleText.length; i += 1) {
    const char = tupleText[i];
    const prev = tupleText[i - 1];

    if (char === "'" && prev !== "\\") {
      inQuote = !inQuote;
      current += char;
      continue;
    }

    if (char === "," && !inQuote) {
      fields.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  if (current.trim()) {
    fields.push(current.trim());
  }

  return fields;
};

const parseValue = (raw) => {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  if (trimmed.toUpperCase() === "NULL") {
    return null;
  }

  if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
    return trimmed.slice(1, -1).replace(/''/g, "'");
  }

  if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
    return Number(trimmed);
  }

  return trimmed;
};

const parseInsertRows = (sql, tableName) => {
  const regex = new RegExp(
    `INSERT\\s+INTO\\s+${tableName}\\s*\\(([^)]+)\\)\\s*VALUES\\s*([\\s\\S]*?);`,
    "gi",
  );
  const rows = [];
  let match = null;

  while ((match = regex.exec(sql)) !== null) {
    const columns = match[1]
      .split(",")
      .map((col) => col.trim().replace(/`/g, ""));
    const valuesText = match[2];
    const tuples = extractValueTuples(valuesText);

    tuples.forEach((tupleText) => {
      const fields = splitFields(tupleText).map(parseValue);
      const row = {};
      columns.forEach((column, index) => {
        row[column] = fields[index];
      });
      rows.push(row);
    });
  }

  return rows;
};

const toSafeNumber = (value, fallback) =>
  Number.isFinite(value) ? value : fallback;

const buildUsername = (rawUsername, email, index) => {
  if (rawUsername) {
    return String(rawUsername).trim();
  }

  if (email && String(email).includes("@")) {
    return String(email).split("@")[0];
  }

  return `user${index + 1}`;
};

const buildProducts = (recipes, categories, recipeCategories) => {
  const categoryMap = new Map(categories.map((item) => [item.id, item.name]));
  const recipeCategoryMap = new Map();

  recipeCategories.forEach((item) => {
    if (!recipeCategoryMap.has(item.recipe_id)) {
      recipeCategoryMap.set(item.recipe_id, []);
    }
    recipeCategoryMap.get(item.recipe_id).push(item.category_id);
  });

  return recipes.map((recipe) => {
    const categoryIds = recipeCategoryMap.get(recipe.id) || [];
    const categoryNames = categoryIds
      .map((id) => categoryMap.get(id))
      .filter(Boolean);
    const primaryCategory = categoryNames[0] || "Mon an";

    const calories = toSafeNumber(recipe.calories, 300);
    const basePrice = Math.round((calories * 200) / 1000) * 1000;
    const price = Math.min(200000, Math.max(15000, basePrice));

    const tags = [...categoryNames, recipe.difficulty]
      .filter(Boolean)
      .map((tag) => String(tag));

    const sold = toSafeNumber(recipe.id, 1) * 3;

    return {
      name: recipe.title,
      description: recipe.description || "",
      category: primaryCategory,
      price,
      rating: 4 + (recipe.id % 2) * 0.5,
      stock: 100,
      sold,
      isPromo: recipe.id % 5 === 0,
      isNew: recipe.id > 30,
      isBestSeller: sold > 120,
      images: recipe.cover_image_url ? [recipe.cover_image_url] : [],
      tags,
    };
  });
};

const seed = async () => {
  if (!fs.existsSync(initSqlPath)) {
    throw new Error(`init.sql not found at ${initSqlPath}`);
  }

  const sql = fs.readFileSync(initSqlPath, "utf8");
  const users = parseInsertRows(sql, "users");
  const recipes = parseInsertRows(sql, "recipes");
  const categories = parseInsertRows(sql, "categories");
  const recipeCategories = parseInsertRows(sql, "recipe_categories");

  await connectDatabase();

  const shouldReset = process.env.SEED_RESET !== "false";
  if (shouldReset) {
    await User.deleteMany({});
    await Product.deleteMany({});
  }

  const passwordHash = await bcrypt.hash("admin123", 10);
  const userDocs = users.map((user, index) => ({
    username: buildUsername(user.username, user.email, index),
    email: user.email,
    fullName: user.full_name || user.fullName || "",
    role: user.role || "user",
    password: passwordHash,
  }));

  const productDocs = buildProducts(recipes, categories, recipeCategories);

  if (userDocs.length) {
    await User.insertMany(userDocs, { ordered: false });
  }

  if (productDocs.length) {
    await Product.insertMany(productDocs, { ordered: false });
  }

  console.log("Seed completed", {
    users: userDocs.length,
    products: productDocs.length,
  });
};

seed()
  .catch((error) => {
    console.error("Seed failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
