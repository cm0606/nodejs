const express = require('express');
const router = express.Router();
const { handleUserSignUp, handleUserSignIn } = require('../controllers/user')

router
    .route('/signin')
    .get((req, res) => {
        return res.render('signin');
    })
    .post(handleUserSignIn);
router
    .route('/signup')
    .get((req, res) => {
        return res.render('signup');
    })
    .post(handleUserSignUp);
router.post('/logout', (req, res) => {

    res.clearCookie('token')
    return res.redirect('/');
})
module.exports = router;
