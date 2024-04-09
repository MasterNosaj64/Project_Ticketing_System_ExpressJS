//const express = require('express');
//const router = express.Router();
//const UsersModel = require('../models/user.js')
const ClientModel = require('../models/client.js')

async function getAllClients(req, res) {
  // Retrieve all the articles and users using the model method, display the page
  let clientResults = await ClientModel.getAllClients();
  // req.TPL.companies = clientResults;

  //let usersResults = await UsersModel.getAllUsers();
  //req.TPL.users = usersResults;

  //console.log(req.TPL.companies);
  //console.log("hello");
  res.render('client', {
    companies: clientResults,
    editclient: false
  }
    //req.TPL);

  );
}

async function deleteClient(req, res) {
  
  try {

    await ClientModel.deleteClient(req.params.rowid);
    //await ArticlesModel.deleteArticles(req.query.username);
    res.render("client");

  } catch (error) {

    console.error("Delete error:", error);
    res.render("client");

  }

}

async function createClient(req, res) {
  
  try {

    await ClientModel.createClient(req.query);
    //replace with customer delete
    //await ArticlesModel.deleteArticles(req.query.username);
    res.render("client");

  } catch (error) {

    console.error("Delete error:", error);
    res.render("client");

  }

}

async function editClient(req, res) {
  
  function renderPage(clientArray) {
    res.render("client", { 
        companies: false,
        client: clientArray });
  }


  let clientResults = await ClientModel.getClient(renderPage, req.params.id);


  res.render('client', {
    companies: clientResults,
    editclient: true
  });

}

async function getClient(req, res) {

  function renderPage(clientArray) {
    res.render("client", {
      companies: false,
      client: clientArray });
  }


  let clientResults = await ClientModel.getClient(renderPage, req.params.id);


  res.render('client', {
    companies: clientResults,
    editclient: true
  });

}

module.exports = {getAllClients, getClient, deleteClient, createClient, editClient}