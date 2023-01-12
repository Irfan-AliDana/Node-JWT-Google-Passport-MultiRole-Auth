const { verify } = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) next();
    // return res.status(400).json({ err: "You are not logged in!" });

    try {
        const verifiedToken = verify(accessToken, process.env.SECRET);

        if (verifiedToken) {
            req.user = verifiedToken;
            req.authenticated = true;
            next();
        }
    } catch (err) {
        res.status(400).json({ error: err });
    }
};

const verifyGoogleLogin = (req, res, next) => {
    if (!req.authenticated) {
        const isLoggedIn = req.isAuthenticated() && req.user.id;
        if (!isLoggedIn) {
            return res.status(401).json("Unauthorized!");
        }
        next();
    }
    next();
};

const checkRoles = (roles) => (req, res, next) => {
    !roles.includes(req.user.role)
        ? res.status(401).json("You are not authorized!")
        : next();
};

module.exports = {
    verifyToken,
    verifyGoogleLogin,
    checkRoles,
};
