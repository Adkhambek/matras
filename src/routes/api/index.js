const router = require("express").Router();

const bannerRoutes = require("./banner");
const statisticsRoutes = require("./statistics");
const modelRoutes = require("./model");

router.use("/banners", bannerRoutes);
router.use("/statistics", statisticsRoutes);
router.use("/models", modelRoutes);

module.exports = router;