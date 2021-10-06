const router = require("express").Router();
const model = require("../../models/model");
const { modelValidation } = require("../../middleware/validation");
const { modelMsg } = require("../../config/message");

router.get("/", async (req, res) => {
    try {
        const models = await model.getActiveModels();
        res.status(200).json({
            statusCode: 200,
            results: models.length,
            data: models
        });
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: modelMsg.requestErr
        });
    }
});

router.get("/all", async (req, res) => {
    try {
        const models = await model.getAllModels();
        res.status(200).json({
            statusCode: 200,
            results: models.length,
            data: models
        });
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: modelMsg.requestErr
        });
    }
});

router.post("/", modelValidation, async (req, res) => {
    try {
        await model.addModel(req.body.name);

        res.status(201).json({
            statusCode: 201,
            message: modelMsg.successAdd,
        });

    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: modelMsg.requestErr
        });    
    }
})

router.get("/:id", async (req, res) => {
    try {
        const modelId = req.params.id * 1;
        const models = await model.getModel(modelId);
        res.status(200).json({
            statusCode: 200,
            data: models
        });
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: modelMsg.requestErr
        });
    }
});

router.patch("/:id", modelValidation, async (req, res) => {
    try {
        const modelId = req.params.id * 1;
        await model.updateModel(req.body.name, modelId);
        res.status(200).json({
            statusCode: 200,
            message: modelMsg.successEdit
        });   
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: modelMsg.requestErr,
            detail: error
        });
    }
    
});

router.patch("/disable/:id", async (req, res) => {
    try {
        const modelId = req.params.id * 1;
        await model.disableModel(modelId);

        res.status(200).json({
            statusCode: 200,
            message: modelMsg.successDisable,
        });

    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: modelMsg.requestErr
        });    
    }
});

module.exports = router



