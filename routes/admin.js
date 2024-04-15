const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

router.use(
    (req, res, next) => {
        req.TPL = req.TPL || {};
        req.TPL.usernav = true;
        next();
    });

router.get('/', adminController.getAllUsers);
router.get('/user/:id', adminController.getUser);
router.get('/edituser/', adminController.editUser);
router.get('/deleteuser', adminController.deleteUser);

module.exports = router;