const jwt = require("../lib/jwt");
const { fetch } = require("../lib/database");
const { authMsg } = require("../config/message");
const model = require("../models/auth");

exports.protect = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return res.status(400).json({
            statusCode: 400,
            error: authMsg.notLogin,
        });
    } else {
        try {
            const decoded = jwt.verify(token);
            const { username } = await model.findById(decoded.id);
            if (!username) {
                return res.status(401).json({
                    statusCode: 401,
                    error: authMsg.notExist,
                });
            } else {
                req.currentUser = username;
                return next();
            }
        } catch (error) {
            if (error.name === "JsonWebTokenError") {
                return res.status(400).json({
                    statusCode: 400,
                    error: authMsg.invalidToken,
                });
            } else if (error.name === "JsonExpiredError") {
                return res.status(400).json({
                    statusCode: 400,
                    error: authMsg.tokenExpired,
                });
            }
        }
    }
};
