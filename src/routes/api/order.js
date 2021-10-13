const router = require("express").Router();
const model = require("../../models/order");
const schema = require("../../lib/validationSchema");
const { validation } = require("../../middleware/validation");
const { orderMsg } = require("../../config/message");
const { pgLimit } = require("../../config/keys");

router.get("/", async (req, res) => {
    try {
        const orders = await model.getAllOrders();
        res.status(200).json({
            statusCode: 200,
            results: orders.length,
            data: orders
        });
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: orderMsg.requestErr
        });
    }
});

router.get("/page/:pageNum", async (req, res) => {
    try {
        const pageNum = req.params.pageNum * 1;
        const { total } = await model.totalOrders();
        const Totalpage = Math.ceil(total / pgLimit);
        if(pageNum === 0 || pageNum > Totalpage) {
            res.status(200).json({
                statusCode: 400,
                error: orderMsg.invalidPage
            });
        } else {
            const offset = (pageNum - 1) * pgLimit;
            const orders = await model.pagination(offset, pgLimit); 
            res.status(200).json({
                statusCode: 200,
                results: orders.length,
                data: orders
            });
        }
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: orderMsg.requestErr
        });
    }
});

router.get("/search", async (req, res) => {
    try {
        console.log(req.query.key);
        const orders = await model.search(req.query.key);
        if(orders.length) {
            res.status(200).json({
                statusCode: 200,
                results: orders.length,
                data: orders
            });
        } else {
            res.status(404).json({
                statusCode: 404,
                error: orderMsg.notFound
            });  
        }
        
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: orderMsg.requestErr
        });
    }
});

router.post("/", validation(schema.orderSchema), async (req, res) => {
    try {
        await model.addOrder(req.body);
        res.status(201).json({
            statusCode: 201,
            message: {
                accept: orderMsg.successAccept,
                connect: orderMsg.connect
            }
        }); 
        
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: orderMsg.requestErr
        });    
    }
});

router.patch("/check/:id", async (req, res) => {
    try {
        const orderId = req.params.id * 1;
        if(req.body.check) {
            await model.checkOrder(orderId);
            res.status(200).json({
                statusCode: 200,
                message: orderMsg.checked,
            });
        } else {
            await model.unCheckOrder(orderId);
            res.status(200).json({
                statusCode: 200,
                message: orderMsg.unchecked,
            });
        }
      } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: orderMsg.requestErr
        });    
    }
});

module.exports = router