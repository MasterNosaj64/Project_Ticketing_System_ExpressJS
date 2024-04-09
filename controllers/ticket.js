//const express = require('express');
//const router = express.Router();
//const UsersModel = require('../models/user.js')
const TicketModel = require('../models/ticket.js')

async function getAllTickets(req, res) {
  // Retrieve all the articles and users using the model method, display the page
  let ticketResults = await TicketModel.getAllTickets();
  // req.TPL.companies = ticketResults;

  //let usersResults = await UsersModel.getAllUsers();
  //req.TPL.users = usersResults;

  //console.log(req.TPL.companies);
  //console.log("hello");
  res.render('ticket', {
    companies: ticketResults,
    editticket: false
  }
    //req.TPL);

  );
}




async function createTicket(req, res) {
  
  try {

    await TicketModel.createTicket(req.query);
    //replace with customer delete
    //await ArticlesModel.deleteArticles(req.query.username);
    res.render("ticket");

  } catch (error) {

    console.error("Delete error:", error);
    res.render("ticket");

  }

}

async function editTicket(req, res) {
  
  function renderPage(ticketArray) {
    res.render("ticket", { 
        companies: false,
        ticket: ticketArray });
  }


  let ticketResults = await TicketModel.getTicket(renderPage, req.params.id);


  res.render('ticket', {
    companies: ticketResults,
    editticket: true
  });

}

async function getTicket(req, res) {

  function renderPage(ticketArray) {
    res.render("ticket", {
      companies: false,
      ticket: ticketArray });
  }


  let ticketResults = await TicketModel.getTicket(renderPage, req.params.id);


  res.render('ticket', {
    companies: ticketResults,
    editticket: true
  });

}

module.exports = {getAllTickets, getTicket, createTicket, editTicket}