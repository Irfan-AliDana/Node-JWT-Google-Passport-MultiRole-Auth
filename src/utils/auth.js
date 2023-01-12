const { sign } = require("jsonwebtoken");

const createToken = (employe) => {
    const accessToken = sign(
        {
            username: employe.username,
            email: employe.email,
            role: employe.role,
        },
        process.env.SECRET
    );

    return accessToken;
};

module.exports = {
    createToken,
};
