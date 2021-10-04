const admin = require('../fireBaseDB/fireBase');
const { signToken } = require('../utils/utils');
require('dotenv').config();
class UserServices {
    constructor() {
        this.admin = admin.collection('Users');
    }

    signUp = async (userData) => {
        try {
            const snapShot = await this.admin.get();
            const list = snapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            const userExists = list.some((doc) => {
                return doc.username === userData.username;
            });
            if (userExists)
                return {
                    status: 'Failed',
                    message: 'User-name already exists',
                };
            return this.admin.doc().set(userData);
        } catch (err) {
            throw err;
        }
    };

    signIn = async (username, password) => {
        try {
            const snapShot = await this.admin.get();
            const list = snapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            const userExists = list.some((doc) => {
                return doc.username === username;
            });
            if (userExists === false) {
                return 'failed';
            }
            const user = list.filter(
                (doc) => doc.username === username && doc.password === password
            );
            const payload = {
                user_Id: user.id,
            };
            user.token = await signToken(payload, '1h');
            delete user.password;
            return user;
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
