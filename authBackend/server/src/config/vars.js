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
    apiLink: `http://${process.env.BACKEND_HOST}:${process.env.PORT}`,
    basePath: '/api/v1',
    testEmail: process.env.TEST_EMAIL,
    testPassword: process.env.TEST_PASSWORD,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
    mongo: {
        uri: process.env.NODE_ENV === 'test'
            ? process.env.MONGO_URI_TESTS : process.env.MONGO_URI,
        enabled: process.env.MONGO_ENABLED,
    },
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
    adminHost: process.env.ADMIN_HOST,
    logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
    nodeMailer: {
        service: 'gmail',
        user: process.env.NODE_MAILER_EMAIL,
        password: process.env.NODE_MAILER_PASSWORD,
        from: process.env.NODE_MAILER_MAIL_FROM,
    },
    mailGun:{
        api_key : process.env.MAIL_GUN_API_KEY,
        domain : process.env.MAIL_GUN_DOMAIN,
        from : process.env.MAIL_GUN_MAIL_FROM
    
    },
    s3: {
        s3AccessKeyId: process.env.S3_ACCESS_KEY_ID,
        s3secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        s3BucketName: process.env.S3_BUCKET_NAME,
        s3Url:process.env.S3_BUCKET_URL
    }
};
