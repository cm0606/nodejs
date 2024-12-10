const jwt = require("jsonwebtoken");
const secretkey = "chetan@06@06";
function setUser(user) {
    const payload = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role
    }
    const jwtToken = jwt.sign(payload, secretkey);
    return jwtToken;

}
function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secretkey)
    }
    catch (error) {
        return null;
    }
}
module.exports = { setUser, getUser }