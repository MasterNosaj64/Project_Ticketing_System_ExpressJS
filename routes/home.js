const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');

router.use((req, res, next) => {
        req.TPL = req.TPL || {};
        req.TPL.homenav = true;
        next();
    });

router.get('/', homeController.showHome);

module.exports = router;