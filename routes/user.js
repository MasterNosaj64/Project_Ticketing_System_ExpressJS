const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.use(
    (req, res, next) => {
        req.TPL = req.TPL || {};
        req.TPL.usernav = true;
        next();
    });

router.get('/user', userController.getAllUsers);
router.get('/user/:id', userController.getUser);
router.get('/edituser/', userController.editUser);
router.get('/deleteuser', userController.deleteUser);

module.exports = router;