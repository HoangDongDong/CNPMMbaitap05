const express = require("express");
const router = express.Router();

const { topProducts } = require("../controllers/productController");

router.get("/products/top", topProducts);

module.exports = router;
