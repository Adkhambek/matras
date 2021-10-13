const router = require("express").Router();

const bannerRoutes = require("./banner");
const statisticsRoutes = require("./statistics");
const modelRoutes = require("./model");
const productRoutes = require("./product");
const technologyRoutes = require("./technology");
const addressRoutes = require("./address");

router.use("/banners", bannerRoutes);
router.use("/statistics", statisticsRoutes);
router.use("/models", modelRoutes);
router.use("/products", productRoutes);
router.use("/technologies", technologyRoutes);
router.use("/address", addressRoutes);

module.exports = router;