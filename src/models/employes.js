module.exports = (sequelize, DataTypes) => {
    const Employe = sequelize.define("Employe", {
        username: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });

    Employe.associate = (models) => {
        Employe.hasMany(models.Token);
    };

    return Employe;
};
