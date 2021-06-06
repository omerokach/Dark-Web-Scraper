const express = require('express');
const router = express.Router();
const {user_post} = require('../controllers/userControllers');

router.post('/', user_post);

module.exports = router