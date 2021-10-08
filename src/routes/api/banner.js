const router = require("express").Router();
const model = require("../../models/banner");
const { bannerUpload } = require("../../middleware/upload");
const schema = require("../../lib/validationSchema");
const { validation } = require("../../middleware/validation");
const { bannerMsg } = require("../../config/message");
const {deleteFile, imagePath} = require("../../lib/helper");

router.get("/", async (req, res) => {
    try {
        const banners = await model.getBanners();
        res.status(200).json({
            statusCode: 200,
            results: banners.length,
            data: banners
        });
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: bannerMsg.requestErr
        });
    }

});

router.get("/all", async (req, res) => {
    try {
        const banners = await model.getAllBanners();
        res.status(200).json({
            statusCode: 200,
            results: banners.length,
            data: banners
        });
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: bannerMsg.requestErr
        });
    }

});

router.get("/:id", async (req, res) => {
    try {
        const bannerId = req.params.id * 1;
        const banner = await model.getBanner(bannerId);
        res.status(200).json({
            statusCode: 200,
            data: banner
        });
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: bannerMsg.requestErr
        });
    }

});

router.post("/", bannerUpload, validation(schema.bannerSchema), async (req, res) => {
    try {
        await model.addBanner(req.body.title, req.file.filename);
        res.status(201).json({
            statusCode: 201,
            message: bannerMsg.successAdd,
        });
     
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: bannerMsg.requestErr
        });    
    }
});

router.patch("/:id", bannerUpload, validation(schema.bannerSchema), async (req, res) => {
    try {
        const bannerId = req.params.id * 1;
        const banner = await model.getBanner(bannerId);
        await deleteFile(imagePath("banner", banner.image));
        await model.updateBanner(req.body.title, req.file.filename, bannerId);
        res.status(200).json({
            statusCode: 200,
            message: bannerMsg.successEdit
        });   
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: bannerMsg.requestErr,
            detail: error
        });
    }
    
});

router.patch("/disable/:id", async (req, res) => {
    try {
        const bannerId = req.params.id * 1;
        await model.disableBanner(bannerId);

        res.status(200).json({
            statusCode: 200,
            message: bannerMsg.successDisable,
        });

    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: bannerMsg.requestErr
        });    
    }    
});

router.patch("/delete/:id", async (req, res) => {
    try {
        const bannerId = req.params.id * 1;
        await model.deleteBanner(bannerId);

        res.status(200).json({
            statusCode: 200,
            message: bannerMsg.successDelete,
        });

    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: bannerMsg.requestErr
        });    
    }     
});


module.exports = router;