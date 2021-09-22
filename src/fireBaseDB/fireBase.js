const admin = require('firebase-admin');

const serviceAccount = require('../../fireBaseCredentials.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// const getAnalytics = require('firebase/analytics');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: process.env.API_KEY,
//     authDomain: process.env.AUTH_DOMAIN,
//     projectId: process.env.PROJECT_ID,
//     storageBucket: process.env.STORAGE_BUCKET,
//     messagingSenderId: process.env.MESSAGING_SENDER_ID,
//     appId: process.env.APP_ID,
//     measurementId: process.env.MEASUREMENT_ID,
// };
// const db = firebase.initializeApp(firebaseConfig);
// Initialize Firebase
// const firebaseDB = admin.initializeApp(firebaseConfig);
// admin.initializeApp({
//     credential: admin.credential.applicationDefault(),
//     databaseURL: 'https://<DATABASE_NAME>.firebaseio.com',
// });
module.exports = admin.firestore();
