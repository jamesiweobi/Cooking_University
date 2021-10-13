const UserServices = require('../services/user.services');
const userServices = new UserServices();

require('dotenv').config();

const signupController = async (req, res, next) => {
    try {
        const result = {};
        const { password, username, firstName, lastName } = req.body;
        if (password.length < 6) {
            result.status = 'Failed';
            result.message = 'Password too short!';
            result.statusCode = 400;
        }
        if (
            firstName.length < 2 ||
            lastName.length < 2 ||
            username.length < 3
        ) {
            result.status = 'Failed';
            result.message = 'Username, lastName or firstName too short.';
            result.statusCode = 400;
        }
        const result2 = await userServices.signUp(req.body);
        if (result2) {
            return res.status(result2.statusCode).json({
                status: result2.status,
                message: result2.message,
                data: result2,
            });
        }
        res.status(result.statusCode).json({
            status: result.status,
            message: result.message,
            data: result,
        });
    } catch (err) {
        console.log(err);
    }
};

const signInController = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await userServices.signIn(username, password);
        if (user === 'failed') {
            return res.send({
                status: '401',
                message: 'This User does not exist',
            });
        }
        return res
            .cookie(
                'access_token',
                { token: user.token },
                {
                    httpOnly: true,
                }
            )
            .send(user);
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

const getOneUser = async (req, res, next) => {
    const id = req.params.id;
    try {
        const user = await userServices.getUser(id);
        const result = user[0];
        res.send(result);
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    signupController,
    signInController,
    logOutController,
    getOneUser,
};
