const admin = require('../fireBaseDB/fireBase');
const { signToken } = require('../utils/utils');

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
                return doc.userName === userData.userName;
            });
            if (userExists)
                return {
                    status: 'Failed',
                    message: 'User exists',
                };
            return this.admin.doc().set(userData);
        } catch (err) {
            throw err;
        }
    };

    signIn = async (userName, password) => {
        try {
            const snapShot = await this.admin.get();
            const list = snapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            const userExists = list.some((doc) => {
                return doc.userName === userName;
            });
            if (!userExists)
                return {
                    status: 'Failed',
                    message: 'This User does not exist',
                };
            const user = list.filter(
                (doc) => doc.userName === userName && doc.password === password
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
        console.log('LOGGED');
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
}

module.exports = UserServices;
