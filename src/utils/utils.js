const jwt = require('jsonwebtoken');
require('dotenv').config();

const signToken = async (user, expiresIn) => {
    return await jwt.sign(user, process.env.SIGNATURE, {
        expiresIn: expiresIn,
    });
};

const authMiddleWare = async (req, res, next) => {
    const { access_token } = req.cookies;
    try {
        if (access_token !== undefined) {
            req.userLoggedIn = true;
            jwt.verify(access_token.token, process.env.SIGNATURE);
            next();
        } else {
            req.userLoggedIn = false;
            next();
        }
    } catch (err) {
        req.userLoggedIn = false;
        next();
    }
};
module.exports = { signToken, authMiddleWare };
