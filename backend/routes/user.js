const express = require('express');
const router = express.Router();
const {user_post, addKeyWords, getKeyWords} = require('../controllers/userControllers');

router.post('/', user_post);
router.put('/key-words', addKeyWords);
router.get('/key-words/:userEmail', getKeyWords);

module.exports = router