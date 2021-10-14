const router = require("express").Router();
const model = require("../../models/auth");
const schema = require("../../lib/validationSchema");
const { validation } = require("../../middleware/validation");
const { authMsg } = require("../../config/message");
const jwt = require("../../lib/jwt")
const {protect} = require("../../middleware/protect");

router.post("/login", validation(schema.loginSchema), async (req, res) => {
        try {
            const id = await model.checkLogin(req.body);
            if(id) {
                const token = "Bearer " + jwt.sign(id);
                res.status(200).json({
                    statusCode: 200,
                    token
                });
            } else {
                res.status(401).json({
                    statusCode: 401,
                    error: authMsg.incorrectLogin
                });
            }   
        } catch (error) {
            res.status(400).json({
                statusCode: 400,
                error: authMsg.requestErr
            });
        }
});

router.get("/test", protect, async(req, res) => {
    res.send("ok");
});

module.exports = router