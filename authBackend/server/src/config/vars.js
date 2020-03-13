const path = require('path');

/**
 *  import .env variables
 */

require('dotenv-safe').load({
    allowEmptyValues: true,
    path: path.join(__dirname, '../../.env'),
    sample: path.join(__dirname, '../../.env.example'),
});

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    basePath: '/api/v1',
    mysql: {
        uri: process.env.NODE_ENV === 'test'
            ? process.env.MYSQL_URI_TESTS : process.env.MYSQL_URI,
        db: process.env.MYSQL_DB,
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        enabled: process.env.MYSQL_ENABLED,
    },
    frontHost: process.env.FRONT_HOST,
    logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',

};
