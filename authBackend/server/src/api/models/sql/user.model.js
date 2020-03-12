
// const Enum = require('../../../util/enums');
const Enum = require('../../../config/constants');
const logger = require('../../utils/logger');

module.exports = function (sequelize, DataTypes) {
    const Op = sequelize.Op;
    const User = sequelize.define('User', {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
        },
        fullName: {
            type: DataTypes.STRING,
            trim: true,
            validate: {
                len: [1, 128],
            },
        },
        gender: {
            // type: DataTypes.ENUM,
            // values: Enum.gender,
            // trim: true,
            type: DataTypes.STRING,
            allowNull:true
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
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [8, 128],
            },
        },
        phoneNo: {
            type: DataTypes.STRING,
            trim: true,
            allowNull:true
        },
    }, {
        indexes: [{
            unique: true,
            fields: ['email', 'phoneNo'],
        }],
    });


    return User;
};
