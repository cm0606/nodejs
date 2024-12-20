const { getUser } = require('../service/auth')

function checkForAuthentication(req, res, next) {
    const tokenCookie = req.cookies?.token;
    req.user = null;
    if (!tokenCookie) { return next() };
    const token = tokenCookie;
    try {
        const user = getUser(token);
        req.user = user;
        return next();
    } catch (error) {
        return next();
    }

}

function restrictTo(roles = []) {
    return function (req, res, next) {
        if (!req.user)
            return res.redirect("/signin");
        if (!roles.includes(req.user.role))
            return res.end("UnAuthorised");
        return next();
    };
}
module.exports = { checkForAuthentication, restrictTo };