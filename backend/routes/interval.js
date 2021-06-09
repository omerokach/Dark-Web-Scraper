const express = require('express');
const router = express.Router();
const {updateInterval, getInterVal} = require('../controllers/intervalController')

router.put('/', updateInterval);
router.get('/:userEmail', getInterVal);

module.exports = router