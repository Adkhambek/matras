const router = require("express").Router();
const model = require("../../models/interest");
const schema = require("../../lib/validationSchema");
const { validation } = require("../../middleware/validation");
const { interestMsg } = require("../../config/message");
const { pgLimit } = require("../../config/keys");

router.get("/", async (req, res) => {
    try {
        const interests = await model.getAllInterests();
        res.status(200).json({
            statusCode: 200,
            results: interests.length,
            data: interests
        });
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: interestMsg.requestErr
        });
    }
});

router.get("/page/:pageNum", async (req, res) => {
    try {
        const pageNum = req.params.pageNum * 1;
        const { total } = await model.totalInterests();
        const Totalpage = Math.ceil(total / pgLimit);
        if(pageNum === 0 || pageNum >= Totalpage) {
            res.status(200).json({
                statusCode: 400,
                error: interestMsg.invalidPage
            });
        } else {
            const offset = (pageNum - 1) * pgLimit;
            const interests = await model.pagination(offset, pgLimit); 
            res.status(200).json({
                statusCode: 200,
                results: interests.length,
                data: interests
            });
        }
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: interestMsg.requestErr
        });
    }
});

router.get("/search", async (req, res) => {
    try {
        const interests = await model.search(req.query.key);
        if(interests.length) {
            res.status(200).json({
                statusCode: 200,
                results: interests.length,
                data: interests
            });
        } else {
            res.status(404).json({
                statusCode: 404,
                error: interestMsg.notFound
            });  
        }
        
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: interestMsg.requestErr
        });
    }
});

router.post("/", validation(schema.interestSchema), async (req, res) => {
    try {
        await model.addInterest(req.body.phone);
        res.status(201).json({
            statusCode: 201,
            message: {
                accept: interestMsg.successAccept,
                connect: interestMsg.connect
            }
        }); 
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            statusCode: 400,
            error: interestMsg.requestErr
        });    
    }
});

router.patch("/check/:id", async (req, res) => {
    try {
        const interestId = req.params.id * 1;
        if(req.body.check) {
            await model.checkInterest(interestId);
            res.status(200).json({
                statusCode: 200,
                message: interestMsg.checked,
            });
        } else {
            await model.unCheckInterest(interestId);
            res.status(200).json({
                statusCode: 200,
                message: interestMsg.unchecked,
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
        const interestId = req.params.id * 1;
        await model.deleteInterest(interestId);

        res.status(200).json({
            statusCode: 200,
            message: interestMsg.successDelete,
        });

    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: interestMsg.requestErr
        });    
    }
});

module.exports = router