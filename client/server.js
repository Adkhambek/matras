require("dotenv").config();
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const PORT = 7000;

const app = express();

app.use(`/${process.env.API_BASE_URL}`, createProxyMiddleware({
    target: process.env.API_URL,
    changeOrigin: true
}));

app.use("/", (req, res) => {
    res.send("OK");
});


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});



