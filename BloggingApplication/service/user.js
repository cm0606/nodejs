const USER = require('../models/user');
const { setUser } = require('./auth')
const { createHmac } = require("crypto");
async function findUser(email, password) {
    const user = await USER.findOne({ email });
    if (!user) return ({ msg: 'user not found' });
    const salt = user.salt;
    const hashedPassword = user.password;
    const userProvidedPasswordHash = createHmac("sha256", salt)
        .update(password)
        .digest("hex");
    if (hashedPassword !== userProvidedPasswordHash) return ({ msg: 'Password Incorrect' });
    const token = setUser(user);
    return token;
}
module.exports = { findUser };
