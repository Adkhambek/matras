const router = require("express").Router();

const bannerRoutes = require("./banner");
const statisticsRoutes = require("./statistics");
const modelRoutes = require("./model");
const productRoutes = require("./product");

router.use("/banners", bannerRoutes);
router.use("/statistics", statisticsRoutes);
router.use("/models", modelRoutes);
router.use("/products", productRoutes);

module.exports = router;