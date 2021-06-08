const express = require('express');
const router = express.Router();
const {user_post, addKeyWords} = require('../controllers/userControllers');

router.post('/', user_post);
router.put('/key-words', addKeyWords);

module.exports = router