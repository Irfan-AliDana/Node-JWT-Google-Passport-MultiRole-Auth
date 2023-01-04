const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
};

const AUTH_OPTIONS = {
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google/callback",
};

const googlePassportAuth = passport.use(
    new GoogleStrategy(
        AUTH_OPTIONS,
        (accessToken, refreshToken, profile, done) => {
            console.log(profile);
            return done(null, profile);
        }
    )
);

const serializeUser = passport.serializeUser((user, done) => {
    return done(null, user.id);
});

const deserializeUser = passport.deserializeUser((id, done) => {
    console.log(id);
    return done(null, { id: id });
});

module.exports = {
    googlePassportAuth,
    serializeUser,
    deserializeUser,
};
