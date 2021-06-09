const express = require('express');
const router = express.Router();
const postRoute = require('./posts');
const userRoute = require('./user');
const chartRoute = require('./chart')
const intervalRoute = require('./interval')

router.use('/posts', postRoute);
router.use('/user', userRoute);
router.use('/chart', chartRoute);
router.use('/interval', intervalRoute);

module.exports = router