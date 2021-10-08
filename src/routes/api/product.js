const router = require("express").Router();
const model = require("../../models/product");
const { productUpload } = require("../../middleware/upload");
const schema = require("../../lib/validationSchema");
const { validation } = require("../../middleware/validation");
const { productMsg } = require("../../config/message");
const {deleteFile, imagePath} = require("../../lib/helper");

router.get("/", async (req, res) => {
    try {
        let products = await model.getProducts();
        products = products.map(e => JSON.parse(e.images))
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

router.get("/all", async (req, res) => {
    try {
        const products = await model.getAllProducts();
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

router.get("/:id", async (req, res) => {
    try {
        const productId = req.params.id * 1
        const product = await model.getProduct(productId);
        res.status(200).json({
            statusCode: 200,
            data: product
        });
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: productMsg.requestErr,
            errorMsg: error
        });
    }

});

router.post("/", productUpload, validation(schema.productSchema), async (req, res) => {
    try {
        let imageNames = req.files.map(e => e = e.filename);
        imageNames = JSON.stringify(imageNames);
        await model.addProduct(req.body, imageNames);
        res.status(201).json({
            statusCode: 201,
            message: productMsg.successAdd
        });
     
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: bannerMsg.requestErr
        });    
    }
});

module.exports = router;
