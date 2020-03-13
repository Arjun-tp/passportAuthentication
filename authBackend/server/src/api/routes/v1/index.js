const express = require('express');
const router = express.Router();
const { mysql} = require('../../../config/vars');


if (mysql.enabled === 'true') {
    const authRoutes = require('./sql/auth.route');
    router.use('/auth', authRoutes);
}



module.exports = router;
