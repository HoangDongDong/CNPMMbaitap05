const Product = require("../models/product");

const getTopProducts = async ({ type, page = 1, limit = 10 }) => {
  const safePage = Number.isFinite(page) && page > 0 ? page : 1;
  const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 10;
  const skip = (safePage - 1) * safeLimit;

  const sort = type === "top-rated" ? { rating: -1 } : { sold: -1 };

  const [items, total] = await Promise.all([
    Product.find().sort(sort).skip(skip).limit(safeLimit).lean(),
    Product.countDocuments(),
  ]);

  const totalPages = safeLimit > 0 ? Math.ceil(total / safeLimit) : 0;

  return {
    items,
    pagination: {
      total,
      page: safePage,
      limit: safeLimit,
      totalPages,
    },
  };
};

module.exports = {
  getTopProducts,
};
