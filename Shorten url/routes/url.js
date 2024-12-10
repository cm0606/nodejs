const express = require('express');
const { handleGenerateShortUrl, handleOpenUrl, handleAnalyseVisit, handleGetAllUrls } = require('../controllers/url');

const router = express.Router();
router
    .route('/')
    .get(handleGetAllUrls)
    .post(handleGenerateShortUrl);
router
    .route('/:shortId')
    .get(handleOpenUrl)
router
    .route('/analyse/:shortId')
    .get(handleAnalyseVisit)


module.exports = router;