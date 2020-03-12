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
    // the sql dialect of the database
    // currently supported: 'mysql', 'sqlite', 'mysql', 'mssql'
        dialect: 'mysql',

        // custom host; default: localhost
        host: mysql.host,

        // custom port; default: dialect default
        port: mysql.port,

        // custom protocol; default: 'tcp'
        // mysqls only, useful for Heroku
        // protocol: null,

        // disable logging; default: console.log
        logging: false,

        // you can also pass any dialect options to the underlying dialect library
        // - default is empty
        // - currently supported: 'mysql', 'mysql', 'mssql'
        dialectOptions: {
            // socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
            supportBigNumbers: true,
            bigNumberStrings: true,
        },

        // the storage engine for sqlite
        // - default ':memory:'
        // storage: 'path/to/database.sqlite',

        // disable inserting undefined values as NULL
        // - default: false
        omitNull: true,

        // a flag for using a native library or not.
        // in the case of 'pg' -- set this to true will allow SSL support
        // - default: false
        native: true,

        // Specify options, which are used when sequelize.define is called.
        // The following example:
        //   define: { timestamps: false }
        // is basically the same as:
        //   sequelize.define(name, attributes, { timestamps: false })
        // so defining the timestamps for each model will be not necessary
        define: {
            underscored: false,
            freezeTableName: true,
            charset: 'utf8',
            dialectOptions: {
                collate: 'utf8_general_ci',
            },
            timestamps: true,
        },

        // similar for sync: you can define this to always force sync for models
        sync: {
            force: true,
        },

        // pool configuration used to pool database connections
        // last code
        // max: 5,
        // min: 0,
        // idle: 20000,
        // acquire: 60000
        pool: {
            max: 50,
            min: 1,
            idle: 40000,
            acquire: 40000,
            evict: 100000,
            handleDisconnects: true,
        },

    // isolation level of each transaction
    // defaults to dialect default
    // isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ
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
