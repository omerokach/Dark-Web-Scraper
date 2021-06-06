const express = require('express');
const router = express.Router();
const dataRoute = require('./data')

router.use('/data', dataRoute);

module.exports = router