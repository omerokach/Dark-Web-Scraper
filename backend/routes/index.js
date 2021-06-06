const express = require('express');
const router = express.Router();
const dataRoute = require('./data');
const postRoute = require('./posts');
const userRoute = require('./user');

router.use('/data', postRoute);
router.use('/v1', postRoute);
router.use('/user', userRoute);

module.exports = router