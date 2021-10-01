const router = require("express").Router();

const BannerRoutes = require("./banner");

router.use("/banner", BannerRoutes);

module.exports = router;