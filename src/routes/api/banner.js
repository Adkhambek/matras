const router = require("express").Router();
const model = require("../../models/banner");
const { bannerSchema } = require("../../lib/validationSchema");
const { bannerImageUpload } = require("../../lib/malter");
const {imageMaxSize} = require("../../config/keys");

router.get("/", async (req, res) => {
    try {
        const banners =  await model.getBanners();
        res.status(200).json({
            statusCode: 200,
            results: banners.length,
            data: banners
        });  
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: "Your request could not be processed. Please try it again"
        });
    }
    
});

router.post("/", async (req, res) => {     
    try { 
        await bannerImageUpload(req, res);
        await bannerSchema.validateAsync(req.body);
        await model.addBanner(req.body.title, req.file.filename);

        res.status(201).json({
            statusCode: 201,
            message: "The banner was added successfully!",
        }); 
        
    } catch (error) {
        if(error.name === "ValidationError") {
            res.status(400).json({
                statusCode: 400,
                errorName: "ValidationError",
                detail: error.details[0].message
            })
        } else if(error.code == "LIMIT_FILE_SIZE") {
            res.status(400).json({
                statusCode: 400,
                errorName: "LIMIT_FILE_SIZE",
                detail: `File size cannot be larger than ${imageMaxSize}!`
            })
        } else if(req.fileFormatError) {
            res.status(400).json({
                statusCode: 400,
                errorName: "fileFormatError",
                detail: req.fileFormatError
            })  
        } else if(!req.file) {
            res.status(400).json({
                statusCode: 400,
                errorName: "fileEmptyError",
                detail: "File is required!"
            })   
        }
         else {
            res.status(400).json({
                statusCode: 400,
                error: "Your request could not be processed. Please try it again"
            }); 
        }
    }
})

// router.patch("/:id", async (req, res) => {
//     const bannerId = req.params.id * 1;
//     try {
//         const result = await bannerSchema.validateAsync(req.body);
//         await model.updateBanner(req.body, bannerId);

//         res.status(201).json({
//             statusCode: 201,
//             message: "The banner was updated successfully!",
//             result
//         }); 
//     } catch (error) {
//         if(error.name === "ValidationError") {
//             res.status(400).json({
//                 statusCode: 400,
//                 errorName: "ValidationError",
//                 detail: error.details
//             })
//         } else {
//             res.status(400).json({
//                 statusCode: 400,
//                 error: "Your request could not be processed. Please try it again"
//             }); 
//         }
         
//     }
    
// })


module.exports = router;