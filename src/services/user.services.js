const admin = require('../fireBaseDB/fireBase');
const { signToken } = require('../utils/utils');s

class UserServices {
    constructor() {
        this.admin = admin.collection('Users');
    }

    signUp = async (userData) => {
        try {
            const result = {};
            const snapShot = await this.admin.get();
            const list = snapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            const userExists = list.some((doc) => {
                return doc.username === userData.username;
            });
            if (userExists) {
                result.status = 'Failed';
                result.message = 'User-name already exists';
                result.statusCode = 400;
                return result;
            }
            result.status = 'Success';
            result.message = 'User Created';
            result.statusCode = 201;
            return result;
        } catch (err) {
            throw err;
        }
    };

    signIn = async (username, password) => {
        try {
            const result = {};
            const snapShot = await this.admin.get();
            const list = snapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            const userExists = list.some((doc) => {
                return doc.username === username;
            });
            if (userExists === false) {
                result.status = 'Failed';
                result.message = 'User not found.';
                result.statusCode = 400;
                return result;
            }
            const user = list.filter(
                (doc) => doc.username === username && doc.password === password
            );
            if (user.length < 1) {
                result.status = 'Failed';
                result.message = 'Username or Password is wrong!';
                result.statusCode = 400;
                return result;
            }
            const payload = {
                user_Id: user.id,
            };
            user.token = await signToken(payload, '1h');
            user.password = undefined;
            result.status = 'Success';
            result.message = 'User loggin success!';
            result.statusCode = 200;
            result.user = user;
            return result;
        } catch (err) {
            throw err;
        }
    };

    logOut = async (id) => {
        try {
            const snapShot = await this.admin.get();
            const list = snapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            const user = list.filter((doc) => doc.id === id);
            const payload = {
                user_Id: user.id,
            };
            user.token = await signToken(payload, '1s');
            delete user.password;
            return user;
        } catch (err) {
            throw err;
        }
    };

    getUser = async (id) => {
        try {
            const snapShot = await this.admin.get();
            const list = snapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            const user = list.filter((doc) => doc.id === id);
            delete user.password;
            return user;
        } catch (err) {
            throw err;
        }
    };
}

module.exports = UserServices;
