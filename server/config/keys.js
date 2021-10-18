module.exports = {
    PORT: process.env.PORT,
    secretKey: process.env.SECRET_KEY,
    jwtToken: {
        secretKey: process.env.SECRET_KEY,
        expiresIn: process.env.JWT_EXPIRES_IN
    },
    dbUrl: process.env.DB_URL,
    apiUrl: process.env.API_BASE_URL,
    imageMaxSize: process.env.IMAGE_MAX_SIZE * 1024 * 1024,
    pgLimit: 2
}