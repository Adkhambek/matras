const router = require("express").Router(); 
const model = require("../../models/technology");
const { technologyUpload } = require("../../middleware/upload");
const schema = require("../../lib/validationSchema");
const { validation } = require("../../middleware/validation");
const { technologyMsg } = require("../../config/message");
const {deleteFile, imagePath} = require("../../lib/helper");

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

router.post("/", technologyUpload, validation(schema.technologySchema), async (req, res) => {
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

module.exports = router