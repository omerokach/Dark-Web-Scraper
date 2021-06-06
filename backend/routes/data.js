const express = require('express');
const router = express.Router();
const {dataGet} = require('../controllers/dataController');

router.get('/', dataGet);

module.exports = router