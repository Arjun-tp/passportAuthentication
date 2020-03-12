const express = require('express');

const router = express.Router();
const {
    mysql,
} = require('../../../config/vars');



if (mysql.enabled === 'true') {
    const authRoutes = require('./sql/auth.route');
    const administratorRoutes = require('./sql/adminstrator.route');

    router.use('/auth', authRoutes);
    router.use('/administrator', administratorRoutes);
}

module.exports = router;
