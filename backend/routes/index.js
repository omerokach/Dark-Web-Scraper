const express = require('express');
const router = express.Router();
const dataRoute = require('./data');
const postRoute = require('./posts');
const userRoute = require('./user');

router.use('/data', dataRoute);
router.use('/posts', postRoute);
router.use('/user', userRoute);

module.exports = router