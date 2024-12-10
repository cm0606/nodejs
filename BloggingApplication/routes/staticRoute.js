const BLOG = require('../models/blog')
const express = require('express');
const router = express.Router();
router.get('/', async (req, res) => {
    const allBlogs = await BLOG.find({})
    return res.render('home', { user: req.user, blogs: allBlogs });
})
module.exports = router; 