const router = require("express").Router();

const bannerRoutes = require("./banner");
const statisticsRoutes = require("./statistics");
const modelRoutes = require("./model");
const productRoutes = require("./product");
const technologyRoutes = require("./technology");
const addressRoutes = require("./address");
const interestRoutes = require("./interest");
const orderRoutes = require("./order");
const authRoutes = require("./auth"); 

router.use("/banners", bannerRoutes);
router.use("/statistics", statisticsRoutes);
router.use("/models", modelRoutes);
router.use("/products", productRoutes);
router.use("/technologies", technologyRoutes);
router.use("/address", addressRoutes);
router.use("/interests", interestRoutes);
router.use("/orders", orderRoutes);
router.use("/auth", authRoutes);

module.exports = router;