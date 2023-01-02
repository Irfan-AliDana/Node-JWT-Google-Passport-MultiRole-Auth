const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

const { verifyToken } = require("./auth/jwt");
const authRouter = require("./routers/auth/auth.router");

app.use(express.json());
app.use(cookieParser());
app.use(authRouter);

app.get("/", (req, res) => {
    res.send("hello world");
});

app.get("/profile", verifyToken, (req, res) => {
    res.json(`profile ${req.authenticated}`);
});

module.exports = app;
