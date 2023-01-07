const { sign } = require("jsonwebtoken");

const createToken = (employe) => {
    const accessToken = sign(
        { username: employe.username, email: employe.email },
        process.env.SECRET
    );

    return accessToken;
};

module.exports = {
    createToken,
};
