const router = require("express").Router();

const bannerRoutes = require("./banner");
const statisticsRoutes = require("./statistics");

router.use("/banner", bannerRoutes);
router.use("/statistics", statisticsRoutes);

module.exports = router;