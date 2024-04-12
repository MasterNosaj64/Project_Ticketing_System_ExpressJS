const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.use((req, res, next) => {
    if (req.session.username) {
        // If user is logged in, redirect them to the home page
        res.redirect("/home");
    } else {
        // If user is not logged in, render the login page
        next();
    }
});

router.get('/', authController.login);
router.post('/authenticate', authController.authenticate);
router.get('/logout', authController.logout);

module.exports = router;