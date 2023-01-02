module.exports = (sequelize, DataTypes) => {
    const Employes = sequelize.define("employes", {
        username: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
        },
    });

    return Employes;
};
