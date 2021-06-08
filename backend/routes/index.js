const express = require('express');
const router = express.Router();
const postRoute = require('./posts');
const userRoute = require('./user');

router.use('/posts', postRoute);
router.use('/user', userRoute);

module.exports = router