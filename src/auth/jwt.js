const express = require("express");
const { sign, verify } = require("jsonwebtoken");

const createToken = (employe) => {
    const accessToken = sign(
        { username: employe.username, email: employe.email },
        "secret"
    );

    return accessToken;
};

const verifyToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken)
        return res.status(400).json({ err: "You are not logged in!" });

    try {
        const verifiedToken = verify(accessToken, "secret");

        if (verifiedToken) {
            req.authenticated = true;
            next();
        }
    } catch (err) {
        res.status(400).json({ error: err });
    }
};

module.exports = {
    createToken,
    verifyToken,
};
