const express = require('express');
const router = express.Router();
const {
    signupController,
    signInController,
    logOutController,
    getOneUser,
} = require('../controllers/users.controller');

router.post('/', signupController);
router.post('/login', signInController);
router.post('/:id', logOutController).get('/:id', getOneUser);

module.exports = router;
