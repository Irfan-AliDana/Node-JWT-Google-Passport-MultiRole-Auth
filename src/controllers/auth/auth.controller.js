const bcrypt = require("bcrypt");

const { employes } = require("../../models");
const { createToken } = require("../../utils/auth");

const register = (req, res) => {
    const { username, email, password, role } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        employes
            .create({
                username: username,
                email: email,
                password: hash,
                role: role,
            })
            .then(() => {
                res.json("Employe Registered");
            })
            .catch(() => {
                if (err) {
                    res.status(400).json({ error: err });
                }
            });
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const employe = await employes.findOne({ where: { email: email } });

    if (!employe) return res.json("No Employee exist!");

    bcrypt.compare(password, employe.password).then((match) => {
        if (!match)
            return res
                .status(400)
                .json({ error: "Wrong username and password combination!" });
        const accessToken = createToken(employe);
        res.cookie("access-token", accessToken, {
            maxAge: 60 * 60 * 24 * 30 * 1000,
            httpOnly: true,
            // signed: true,
        });
        res.json("Logged In Successfully!");
    });
};

module.exports = {
    login,
    register,
};
