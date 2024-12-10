const USER = require('../models/user')
const { setUser, getUser } = require('../service/auth')
const { findUser } = require('../service/user')
async function handleUserSignUp(req, res) {
    const body = req.body;
    await USER.create({
        fullName: body.fullName,
        email: body.email,
        password: body.password
    });
    return res.redirect('/');
}
async function handleUserSignIn(req, res) {
    const { email, password } = req.body;
    const token = await findUser(email, password);
    if (token.msg) {
        return res.render('signin', { error: token.msg });
    }
    res.cookie('token', token);
    return res.redirect('/');


}
module.exports = { handleUserSignUp, handleUserSignIn };