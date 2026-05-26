const { getTopProducts } = require("../services/productService");

const topProducts = async (req, res) => {
  try {
    const type = req.query.type ? String(req.query.type).trim() : "most-viewed";

    if (!["most-viewed", "top-rated"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "type khong hop le",
      });
    }

    const page = Number(req.query.page);
    const limit = Number(req.query.limit);

    const result = await getTopProducts({
      type,
      page,
      limit: Number.isFinite(limit) ? limit : 10,
    });

    return res.status(200).json({
      success: true,
      message: "Lay top mon an thanh cong",
      data: result.items,
      pagination: result.pagination,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Loi server",
    });
  }
};

module.exports = {
  topProducts,
};
