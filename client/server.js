require("dotenv").config();
const path = require("path");
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const PORT = 7000;

const app = express();

app.use(`/${process.env.API_BASE_URL}`, createProxyMiddleware({
    target: process.env.API_URL,
    changeOrigin: true
}));

app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(process.cwd(), "server", "image")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});



