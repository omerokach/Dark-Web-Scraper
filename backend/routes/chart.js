const express = require('express');
const router = express.Router();
const {getPieData} = require('../controllers/chartsControllers');

router.get('/pie', getPieData);

module.exports = router