const { v4: uuidv4 } = require('uuid')
const { setUser, getUser } = require('../service/auth')
const USER = require('../models/user')
async function handleUserSignUp(req, res) {
    const body = req.body;
    await USER.create({
        name: body.name,
        email: body.email,
        password: body.password
    })
    return res.render('home');
}
async function handleUserLogIn(req, res) {
    const { email, password } = req.body;

    const user = await USER.findOne({ email, password });
    if (user) {
        const token = setUser(user);
        res.cookie('token', token);
        return res.redirect('/');

    }
    else {
        return res.render('login', { error: "Invalid Email or Password" });
    }


}
module.exports = { handleUserSignUp, handleUserLogIn };