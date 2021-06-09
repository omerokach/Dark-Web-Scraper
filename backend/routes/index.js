const express = require('express');
const router = express.Router();
const postRoute = require('./posts');
const userRoute = require('./user');
const chartRoute = require('./chart')

router.use('/posts', postRoute);
router.use('/user', userRoute);
router.use('/chart', chartRoute);

module.exports = router