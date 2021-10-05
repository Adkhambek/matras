const router = require("express").Router();
const model = require("../../models/banner");
const { bannerValidation } = require("../../middleware/validation");
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

router.post("/", bannerValidation, async (req, res) => {
    try {
        await model.addBanner(req.body.title, req.file.filename);

        res.status(201).json({
            statusCode: 201,
            message: bannerMsg.successAdd,
        });

    } catch (error) {
        return res.status(400).json({
            statusCode: 400,
            error: bannerMsg.requestErr
        });    
    }
})

router.patch("/:id", async (req, res) => {
    const bannerId = req.params.id * 1;
    return bannerImageUpload(req, res, async err => {
        if (err) {
            return res.status(400).json({
                statusCode: 400,
                detail: err.message
            })
        } else {
            if (req.fileFormatError) {
                return res.status(400).json({
                    statusCode: 400,
                    detail: req.fileFormatError
                })
            } else if (!req.file) {
                return res.status(400).json({
                    statusCode: 400,
                    detail: bannerMsg.imageEmptyErr
                })
            } else {
                await bannerSchema.validateAsync(req.body);
                const banner = await model.getBanner(bannerId);
                await deleteFile(`${imagePath}/banner/${banner.image}`);
                await model.updateBanner(req.body.title, req.file.filename, bannerId);

                return res.status(201).json({
                    statusCode: 201,
                    message: bannerMsg.successEdit
                });
            }

        }
    })
    //     if(error.name === "ValidationError") {
    //       return  res.status(400).json({
    //             statusCode: 400,
    //             detail: error.details[0].message
    //         })
    //     } else {
    //        return res.status(400).json({
    //             statusCode: 400,
    //             error: bannerMsg.requestErr
    //         }); 
    //     }

    // }

})


module.exports = router;