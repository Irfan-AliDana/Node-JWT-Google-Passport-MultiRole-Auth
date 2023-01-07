const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const express = require("express");
const passport = require("passport");
const path = require("path");

require("dotenv").config();

const app = express();

const { verifyToken, verifyGoogleLogin } = require("./middlewares/auth");
const authRouter = require("./routers/auth/auth.router");

const {
    googlePassportAuth,
    serializeUser,
    deserializeUser,
} = require("./middlewares/passport");

googlePassportAuth;
serializeUser;
deserializeUser;
app.use(express.json());
app.use(express.urlencoded()); //This function decode the data sends through html forms
app.use(cookieParser());
app.use(
    cookieSession({
        name: "session",
        maxAge: 60 * 60 * 24 * 1000,
        keys: [process.env.KEY_1, process.env.KEY_2],
    })
);
app.use(passport.initialize()); //This is a middleware that sets up the passport session
// Populated by two functions inside of passport
// One function, to serialize the user data to the session. To determine in our case what the cookie will store.
// Other function is deserialize the user data. To take it from the cookie and set it to a value that is made available to us by express.
// The deserialize function saves the user session from the cookie and places it into this request object.
app.use(passport.session()); //Authenticates the session coming from the cookie using the secret keys
// Sets the req.user property inside of express request object

app.use("/auth", authRouter);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/profile", verifyToken, verifyGoogleLogin, (req, res) => {
    res.json(`profile page`);
});

module.exports = app;
