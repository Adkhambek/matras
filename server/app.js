require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const {PORT, secretKey} = require("./config/keys");
const cookie = require("cookie-parser");

app.use(session(
    {
        secret: secretKey,
        saveUninitialized: true,
        resave: true
    }
));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(cookie());

app.use("/images", express.static(`${__dirname}/image`));
app.use(routes);

module.exports = { PORT, app };