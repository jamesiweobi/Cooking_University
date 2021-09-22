const UserServices = require('../services/user.services');
const userServices = new UserServices();
require('dotenv').config();
const signupController = async (req, res, next) => {
    try {
        const result = await userServices.signUp(req.body);
        res.send(result);
    } catch (err) {
        console.log(err);
    }
};

const signInController = async (req, res, next) => {
    try {
        const { userName, password } = req.body;
        const user = await userServices.signIn(userName, password);

        res.cookie(
            'access_token',
            { token: user.token },
            {
                httpOnly: true,
            }
        ).send(user);
    } catch (err) {
        throw err;
    }
};

const logOutController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await userServices.logOut(id);
        res.cookie(
            'access_token',
            { token: user.token },
            {
                httpOnly: true,
            }
        )
            .json({
                status: 200,
                message: 'User logged out',
            })
            .redirect('/home');
    } catch (err) {
        throw err;
    }
};

module.exports = { signupController, signInController, logOutController };
