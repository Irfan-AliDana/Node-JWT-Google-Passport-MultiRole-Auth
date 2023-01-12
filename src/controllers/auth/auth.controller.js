const bcrypt = require("bcrypt");
const crypto = require("crypto");

const { Employe, Token } = require("../../models");
const { createToken } = require("../../utils/auth");
const sendEmail = require("../../utils/sendEmail");

const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const [employe] = await Employe.findOrCreate({
            where: { email },
            defaults: {
                username,
                email,
                password: hashedPassword,
                role,
            },
        });

        if (employe.email && employe.verified) {
            return res
                .status(409)
                .json({ message: "User with given email already exist" });
        }

        const token = await Token.create({
            token: crypto.randomBytes(32).toString("hex"),
            employeId: employe.id,
        });

        const url = `${process.env.BASE_URL}auth/${employe.id}/verify/${token.token}`;
        const emailSend = await sendEmail(employe.email, "Verify Email", url);

        emailSend
            ? res.status(201).json("Email send please verify")
            : res.status(201).json("Email not send");
    } catch (err) {
        res.status(400).json({ error: err });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const employe = await Employe.findOne({ where: { email } });

    if (!employe) return res.json("No Employee exist!");

    const match = await bcrypt.compare(password, employe.password);
    if (!match)
        return res
            .status(400)
            .json({ error: "Wrong username and password combination!" });

    if (!employe.verified) {
        let token = await Token.findOne({ where: { employeId: employe.id } });

        if (!token) {
            token = await Token.create({
                employeId: employe.id,
                token: crypto.randomBytes(32).toString("hex"),
            });

            const url = `${process.env.BASE_URL}auth/${employe.id}/verify/${token.token}`;
            await sendEmail(employe.email, "Verify Email", url);
        }
        return res
            .status(200)
            .send({ message: "An email send to your account. Please verify" });
    }

    const accessToken = createToken(employe);
    res.cookie("access-token", accessToken, {
        maxAge: 60 * 60 * 24 * 30 * 1000,
        httpOnly: true,
        // signed: true,
    });
    res.json("Logged In Successfully!");
};

const verifyToken = async (req, res) => {
    try {
        const employe = await Employe.findOne({ where: { id: req.params.id } });
        if (!employe) return res.status(400).json("Invalid Link");

        const token = await Token.findOne({
            where: { employeId: employe.id, token: req.params.token },
        });

        if (!token) return res.status(400).json("Invalid link");

        await Employe.update({ verified: true }, { where: { id: employe.id } });
        await Token.destroy({
            where: { employeId: employe.id },
        });

        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

module.exports = {
    login,
    register,
    verifyToken,
};
