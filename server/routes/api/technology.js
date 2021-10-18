const router = require("express").Router(); 
const model = require("../../models/technology");
const { technologyUpload } = require("../../middleware/upload");
const schema = require("../../lib/validationSchema");
const { validation } = require("../../middleware/validation");
const { technologyMsg } = require("../../config/message");
const {deleteFile, imagePath} = require("../../lib/helper");
const { protect } = require("../../middleware/protect");

router.get("/", async (req, res) => {
    try {
        const technologies = await model.getTechnologies();
        res.status(200).json({
            statusCode: 200,
            results: technologies.length,
            data: technologies
        });
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: technologyMsg.requestErr
        });
    }

});

router.get("/all", protect, async (req, res) => {
    try {
        const technologies = await model.getAllTechnologies();
        res.status(200).json({
            statusCode: 200,
            results: technologies.length,
            data: technologies
        });
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: technologyMsg.requestErr
        });
    }    
})

router.post("/", protect, technologyUpload, validation(schema.technologySchema), async (req, res) => {
    try {
        if(req.body.active === "true") {
            await model.addTechnology(req.body, req.file.filename);
        } else {
            const {id} = await model.addTechnology(req.body, req.file.filename);
            await model.disableTechnology(id);
        }
        
        res.status(201).json({
            statusCode: 201,
            message: technologyMsg.successAdd,
        });
     
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: technologyMsg.requestErr
        });    
    }
});

router.patch("/:id", protect, technologyUpload, validation(schema.technologySchema), async (req, res) => {
    try {
        const techId = req.params.id * 1;
        const techImage = await model.getTechnologyImage(techId);
        await deleteFile(imagePath("technology", techImage.thumbnail));  

        if(req.body.active === "true") {
            await model.updateTechnology(req.body, req.file.filename, techId);
        } else {
            await model.updateTechnology(req.body, req.file.filename, techId);
            await model.disableTechnology(techId);
        }
        res.status(201).json({
            statusCode: 201,
            message: technologyMsg.successEdit,
        });
        
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: technologyMsg.requestErr
        });    
    }
});

router.patch("/delete/:id", protect, async (req, res) => {
    try {
        const technologyId = req.params.id * 1;
        await model.deleteTechnology(technologyId);

        res.status(200).json({
            statusCode: 200,
            message: technologyMsg.successDelete,
        });

    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: technologyMsg.requestErr
        });    
    }
});

module.exports = router