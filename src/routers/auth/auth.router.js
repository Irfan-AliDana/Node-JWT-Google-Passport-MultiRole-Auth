const express = require("express");
const passport = require("passport");

const authRouter = express.Router();

const { login, register } = require("../../controllers/auth/auth.controller");

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.get(
    "/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
);

authRouter.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/failure",
        successRedirect: "/",
    }),
    (req, res) => {
        console.log("Google has called us back");
    }
);

authRouter.get("/failure", (req, res) => {
    res.send("failed to log in");
});

module.exports = authRouter;
