const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket');

router.get('/', ticketController.getAllTickets);
router.get('/ticket/:id', ticketController.getTicket);
router.get('/newticket/', ticketController.createTicket);
router.get('/editTicket/', ticketController.editTicket);

module.exports = router;