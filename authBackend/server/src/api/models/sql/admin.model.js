const Enum = require('../../../config/constants');

module.exports = function (sequelize, DataTypes) {

    const Admin = sequelize.define('Admin', {
    
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        activationCode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            lowercase: true,
            trim: true,
            validate: {
                isEmail: true,
                notEmpty: true,
                is: /^\S+@\S+\.\S+$/,
            },
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM,
            values: Enum.role,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        }

    });

    return Admin;

};