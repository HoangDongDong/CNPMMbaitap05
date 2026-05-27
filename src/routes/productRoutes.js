const express = require("express");
const router = express.Router();

const {
  topProducts,
  listProductsController,
} = require("../controllers/productController");

router.get("/products/top", topProducts);
router.get("/products", listProductsController);

module.exports = router;
