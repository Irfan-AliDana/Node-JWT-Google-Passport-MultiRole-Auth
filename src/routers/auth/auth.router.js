const express = require("express");
const passport = require("passport");

const authRouter = express.Router();

const {
    login,
    register,
    verifyToken,
} = require("../../controllers/auth/auth.controller");
const validation = require("../../middlewares/validation");
const employeSchema = require("../../validations/employe.validation");

authRouter.post("/register", validation(employeSchema), register);

authRouter.post("/login", login);

authRouter.get("/:id/verify/:token", verifyToken);

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
