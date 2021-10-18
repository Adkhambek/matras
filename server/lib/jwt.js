const jwt = require("jsonwebtoken");
const { jwtToken } = require("../config/keys");

module.exports = {
    sign: (playload) => jwt.sign(playload, jwtToken.secretKey, { expiresIn: jwtToken.expiresIn }),
    verify: (token) => jwt.verify(token, jwtToken.secretKey)
} 