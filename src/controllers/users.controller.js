const UserServices = require('../services/user.services');
const userServices = new UserServices();
require('dotenv').config();
const signupController = async (req, res, next) => {
    try {
        const { password, username, firstName, lastName } = req.body;
        if (password.length < 6) {
            return res.json({
                error: 'Failed',
                data: {
                    result: {
                        message: 'Password too short!',
                        status: 'Failed',
                    },
                },
            });
        }
        if (firstName.length < 2 || lastName.length < 2 || username.length < 3)
            return res.json({
                error: 'Failed',
                data: {
                    result: {
                        message: 'Username, lastName or firstName too short.',
                        status: 'Failed',
                    },
                },
            });

        const result = await userServices.signUp(req.body);
        res.status(201).json({
            status: 'Success',
            data: { message: 'User created', result },
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
            return res.json({
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
        console.log(user, 'user details');
        res.send('ok');
    } catch (err) {}
};

module.exports = {
    signupController,
    signInController,
    logOutController,
    getOneUser,
};
