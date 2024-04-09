const express = require('express');
const router = express.Router();
const userController = require('../controllers/auth');

router.get('/', userController.login);
router.post('/authenticate', userController.authenticate);
router.get('/logout', userController.logout);

module.exports = router;