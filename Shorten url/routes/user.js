const express = require('express');
const router = express.Router();
const { handleUserSignUp, handleUserLogIn } = require('../controllers/user')
router
    .route('/')
    .post(handleUserSignUp)
router
    .route('/login')
    .post(handleUserLogIn)
module.exports = router;
