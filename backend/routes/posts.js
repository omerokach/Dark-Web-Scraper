const express = require('express');
const router = express.Router();
const {posts_get} = require('../controllers/postsController');

router.get('/', posts_get);

module.exports = router