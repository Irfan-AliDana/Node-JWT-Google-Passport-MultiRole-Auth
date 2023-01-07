const yup = require("yup");

const employeSchema = yup.object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(3).max(10),
    role: yup.string().required(),
});

module.exports = employeSchema;
