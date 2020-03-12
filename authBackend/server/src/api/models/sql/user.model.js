
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
        firstName: {
            type: DataTypes.STRING,
            trim: true,
            validate: {
                len: [1, 128],
            },
        },
        lastName: {
            type: DataTypes.STRING,
            trim: true,
            validate: {
                len: [1, 128],
            },
        },
        accountId:{
            type: DataTypes.STRING,
            trim: true,
            unique: true,
        },
        gender: {
            // type: DataTypes.ENUM,
            // values: Enum.gender,
            // trim: true,
            type: DataTypes.STRING,
            allowNull:true
        },
        residentialAddress: {
            type: DataTypes.STRING,
            trim: true,
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
        receivePromotionalEmails: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            notEmpty: true,
        },
        dob: {
            type: DataTypes.DATE,
            allowNull:true
            // trim: true,
            // validate: {
            //     notEmpty: true,
            // },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [8, 128],
            },
        },
        kycStatus: {
            type: DataTypes.ENUM,
            values: Enum.kycStatus,
            // validate: {
            //     notEmpty: true,
            // },
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            notEmpty: true,
        },
        nationality: {
            type: DataTypes.STRING,
            trim: true,
            validate: {
                len: [1, 128],
            }
        },
        phoneNo: {
            type: DataTypes.STRING,
            trim: true,
            allowNull:true
            // validate: {
            //     len: [1, 128],
            // }
        },
        countryOfResidence: {
            type: DataTypes.STRING,
            trim: true,
            validate: {
                len: [1, 128],
            }
        },
        hideInvestmentActivity: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        profileImage: {
            type: DataTypes.STRING,
            trim: true,
            allowNull:true
        },
        identityDocumentType: {
            type: DataTypes.STRING,
            trim: true,
            allowNull:true
        },
        IdentityDocumentImage: {
            type: DataTypes.STRING,
            trim: true,
            allowNull:true
        },
        IdentityDocumentNumber: {
            type: DataTypes.STRING,
            trim: true,
            allowNull:true
        },
        userPhotoWithId: {
            type: DataTypes.STRING,
            trim: true,
            allowNull:true
        },
        isEmailVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        activationCode: {
            type: DataTypes.STRING,
            unique: true,
        },
        activationCodeStashed: {
            type: DataTypes.STRING,
            trim: true,

        },
        provider: {
            type: DataTypes.STRING
        },
        bioDesc: {
            type: DataTypes.STRING,
            trim: true,
        },
        tAndCAgree: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            notEmpty: true
        },
        disabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            notEmpty: true
        },
        isInvestor: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            notEmpty: true
        },
        isIssuer: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            notEmpty: true
        },
        twoFaEnabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            notEmpty: true
        },
    }, {
        indexes: [{
            unique: true,
            fields: ['email', 'phoneNo'],
        }],
    });


    /**
   * Pre-save hooks
   */

    /*User.afterCreate(async (user, options) => {
        const methodName = '[afterCreate]';
        user.dataValues.pgUserId = user.dataValues.id;
        try {
            const userData = await (new mongoUser(user.dataValues)).save();
            redisCache.set('user', userData.pgUserId, userData);
            return userData;
        } catch (err) {
            logger.error('[UserModel]', methodName, err);
            return err;
        }
    });*/
    /*User.associate = (models) => {
        console.log('models===>', models)
        User.belongsTo(models.CompanyKYC, {
            foreignKey: {allowNull: false},
            as: 'user',
            onDelete: 'CASCADE'
        })
    };*/

    return User;
};
