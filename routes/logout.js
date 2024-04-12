const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.use((req, res, next) => {
    if (req.session.username) {
        next();
    } else {
        // If user is not logged in, redirect them to the login page
        res.redirect("/login");
    }
});

router.get('/', authController.logout);

module.exports = router;