const express = require("express");
const { sign, verify } = require("jsonwebtoken");

const createToken = (employe) => {
    const accessToken = sign(
        { username: employe.username, email: employe.email },
        process.env.SECRET
    );

    return accessToken;
};

const verifyToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken)
        return res.status(400).json({ err: "You are not logged in!" });

    try {
        const verifiedToken = verify(accessToken, process.env.SECRET);

        if (verifiedToken) {
            req.authenticated = true;
            next();
        }
    } catch (err) {
        res.status(400).json({ error: err });
    }
};

const verifyGoogleLogin = (req, res, next) => {
    const isLoggedIn = req.isAuthenticated() && req.user.id;
    if (!isLoggedIn) {
        return res.status(401).json("Unauthorized!");
    }
    next();
};

module.exports = {
    createToken,
    verifyToken,
    verifyGoogleLogin,
};
