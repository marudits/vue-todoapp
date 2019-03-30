var express = require('express');
var router = express.Router();

// models
const posts = require('../models/posts');

// shared
const CONSTANTS = require('../shared/constants');

// utils
const Envelope = require('../utils/envelope');

// API: posts
router.get('/posts', posts.getPosts);
router.get('/posts/:id', posts.getPostDetail);
router.post('/posts', posts.addPost);
router.put('/posts/:id', posts.updatePost);
router.delete('/posts/:id', posts.removePost);

// default router
// default router
router.get('*', (req, res, next) => {
    const URL = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.status(404).json(new Envelope(false, { message: CONSTANTS.RESPONSE.CODE['404'], url: URL }));
});

module.exports = router;
