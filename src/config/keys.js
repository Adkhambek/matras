module.exports = {
    PORT: process.env.PORT,
    secretKey: process.env.SECRET_KEY,
    dbUrl: process.env.DB_URL,
    apiUrl: process.env.API_BASE_URL,
    imageMaxSize: process.env.IMAGE_MAX_SIZE * 1024 * 1024
}