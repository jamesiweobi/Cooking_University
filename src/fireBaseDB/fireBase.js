const admin = require('firebase-admin');
const serviceAccount = require('../../fireBaseCredentials.json');
require("dotenv").config()

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

module.exports = admin.firestore();
