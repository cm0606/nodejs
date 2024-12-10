const express = require('express');
const router = express.Router();
const URL = require('../models/url');
const { getUser } = require('../service/auth');
const { restrictTo } = require('../middlewares/auth');
router.get('/admin/urls', restrictTo(["ADMIN"]), async (req, res) => {
    const userId = req.user._id;
    const allurls = await URL.find();
    if (allurls.length === 0) {
        return res.render('home');
    }
    return res.render('home', { urls: allurls });


})
router.get('/', restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
    const userId = req.user._id;
    const allurls = await URL.find({ createdBy: userId });
    if (allurls.length === 0) {
        return res.render('home');
    }
    return res.render('home', { urls: allurls });


})
router.get('/signup', (req, res) => {
    return res.render('signup');
})
router.get('/login', (req, res) => {
    return res.render('login');
})

module.exports = router;