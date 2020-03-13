/**
 * Sequelize initialization module
 */
const path = require('path');
const Sequelize = require('sequelize');
const sequelizeTransforms = require('sequelize-transforms');
const lodash = require('lodash');

const db = {};
const {
    mysql,
} = require('./vars');

// Open sequelize connection
if (mysql.enabled) {
    const sequelize = new Sequelize(mysql.db, mysql.username, mysql.password, {
        dialect: 'mysql',
        host: mysql.host,
        port: mysql.port,
        logging: false,
        dialectOptions: {
            supportBigNumbers: true,
            bigNumberStrings: true,
        },

        omitNull: true,
        native: true,
        define: {
            underscored: false,
            freezeTableName: true,
            charset: 'utf8',
            dialectOptions: {
                collate: 'utf8_general_ci',
            },
            timestamps: true,
        },
        sync: {
            force: true,
        },
        pool: {
            max: 50,
            min: 1,
            idle: 40000,
            acquire: 40000,
            evict: 100000,
            handleDisconnects: true,
        },
    });

    sequelizeTransforms(sequelize);

    const models = ['user'];

    const modelPathFormat = path.join(__dirname, '../api/models/sql/{0}.model.js');

    for (let i = 0; i < models.length; i++) {
        const model = sequelize.import(modelPathFormat.replace(/\{0\}/g, models[i]));
        db[model.name] = model;
    }

    // TODO: Uncomment after solving cyclic dependencies
    Object.keys(db).forEach((modelName) => {
        if ('associate' in db[modelName]) {
            db[modelName].associate(db);
        }
    });

    module.exports = lodash.extend({
        sequelize,
        Sequelize,
    }, db);
}
