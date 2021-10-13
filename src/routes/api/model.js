const router = require("express").Router();
const model = require("../../models/model");
const schema = require("../../lib/validationSchema");
const { validation } = require("../../middleware/validation");
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

router.post("/", validation(schema.modelSchema), async (req, res) => {
    try {
        if(req.body.active) {
            await model.addModel(req.body.name);
        } else {
            const {id} = await model.addModel(req.body.name);
            await model.disableModel(id);
        }
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

router.patch("/:id", validation(schema.modelSchema), async (req, res) => {
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

router.patch("/active/:id", async (req, res) => {
    try {
        const modelId = req.params.id * 1;
        if(req.body.active) {
            await model.activeModel(modelId);
            res.status(200).json({
                statusCode: 200,
                message: modelMsg.successActive,
            });
        } else {
            await model.disableModel(modelId);
            res.status(200).json({
                statusCode: 200,
                message: modelMsg.successDisable,
            });
        }
        

    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: modelMsg.requestErr
        });    
    }
});

router.patch("/delete/:id", async (req, res) => {
    try {
        const modelId = req.params.id * 1;
        await model.deleteModel(modelId);

        res.status(200).json({
            statusCode: 200,
            message: modelMsg.successDelete,
        });

    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: modelMsg.requestErr
        });    
    }
});

module.exports = router



