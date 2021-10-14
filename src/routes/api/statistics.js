const router = require("express").Router();
const model = require("../../models/statistics");
const schema = require("../../lib/validationSchema");
const { validation } = require("../../middleware/validation");
const { statisticsMsg } = require("../../config/message");
const { protect } = require("../../middleware/protect")

router.get("/", async (req, res) => {
    try {
        const statistics = await model.getStatistics();
        res.status(200).json({
            statusCode: 200,
            data: statistics
        });
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: statisticsMsg.requestErr
        });
    }

});

router.get("/update", protect, async(req, res) => {
    try {
        const statistics = await model.getStatisticsForUpdate();
        res.status(200).json({
            statusCode: 200,
            data: statistics
        });
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: statisticsMsg.requestErr
        });
    }   
})

router.patch("/update", protect, validation(schema.statisticsSchema), async (req, res) => {
    try {
        await model.updateStatistics(req.body);
        res.status(200).json({
            statusCode: 200,
            message: statisticsMsg.successEdit
        });   
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: statisticsMsg.requestErr,
            detail: error
        });
    }
    
});

module.exports = router

