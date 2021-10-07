const router = require("express").Router();
const model = require("../../models/product");
const { productValidation } = require("../../middleware/validation");
const { productMsg } = require("../../config/message");
const {deleteFile, imagePath} = require("../../lib/helper");

router.get("/", async (req, res) => {
    try {
        const products = await model.getProducts();
        res.status(200).json({
            statusCode: 200,
            results: products.length,
            data: products
        });
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: productMsg.requestErr,
            errorMsg: error
        });
    }

});

module.exports = router;
