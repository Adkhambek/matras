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
        // parse json
        // products = products.map(e => JSON.parse(e.images))
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

router.get("model/:id", async (req, res) => {
    try {
        const productId = req.params.id * 1
        const products = await model.getProductsByCategory(productId);
        res.status(200).json({
            statusCode: 200,
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

router.post("/", productUpload, validation(schema.productSchema), async (req, res) => {
    try {
        let imageNames = req.files.map(e => e = e.filename);
        imageNames = JSON.stringify(imageNames);
        const {id} = await model.addProduct(req.body, imageNames);

        if(req.body.discount === "false" && req.body.navinla === "true") {
            if(req.body.active === "false") {
                await model.disableProduct(id); 
                await model.statusProduct("1", id);
            } else {
                await model.statusProduct("1", id);
            } 
        } else if(req.body.discount === "true" && req.body.navinla === "false") {
            if(req.body.active === "false") {
                await model.disableProduct(id); 
                await model.statusProduct("2", id);
                await model.discountProduct(req.body.discountPrice, id);
            } else {
                await model.statusProduct("2", id);
                await model.discountProduct(req.body.discountPrice, id);
            } 
        } else if(req.body.discount === "false" && req.body.navinla === "false") {
            if(req.body.active === "false") {
                await model.disableProduct(id); 
                await model.statusProduct("0", id);
            } else {
                await model.statusProduct("0", id);
            } 
        } else if(req.body.discount === "true" && req.body.navinla === "true") {
            if(req.body.active === "false") {
                await model.disableProduct(id); 
                await model.discountProduct(req.body.discountPrice, id);
            } else {
                await model.discountProduct(req.body.discountPrice, id);
            } 
        }
        
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

router.patch("/disable/:id", async (req, res) => {
    try {
        const productId = req.params.id * 1;
        await model.disableProduct(productId);

        res.status(200).json({
            statusCode: 200,
            message: productMsg.successDisable,
        });
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: productMsg.requestErr
        });    
    }
});

router.patch("/delete/:id", async (req, res) => {
    try {
        const productId = req.params.id * 1;
        await model.deleteProduct(productId);

        res.status(200).json({
            statusCode: 200,
            message: productMsg.successDelete,
        });

    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: productMsg.requestErr
        });    
    }
});

module.exports = router;
