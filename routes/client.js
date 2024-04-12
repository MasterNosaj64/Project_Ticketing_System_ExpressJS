const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client');

router.use(
    (req, res, next) => {
        req.TPL = req.TPL || {};
        req.TPL.clientnav = true;
        next();
    });

router.get("/", clientController.getAllClients);
router.get('/client/:id', clientController.getClient);
router.get("/deleteclient", clientController.deleteClient);
router.get("/createclient", clientController.createClient);
router.get("/editclient/:id", clientController.editClient);

module.exports = router;