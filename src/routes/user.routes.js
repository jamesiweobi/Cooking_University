const express = require('express');
const router = express.Router();
const {
    signupController,
    signInController,
    logOutController,
} = require('../controllers/users.controller');

router.post('/', signupController).get('/', signInController);
router.post('/:id', logOutController);

module.exports = router;
