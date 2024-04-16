//const express = require('express');
// router = express.Router()
const UsersModel = require('../models/admin.js')

async function getAllUsers(req, res){

  try {

    const usersResults = await UsersModel.getAllUsers();

    if ( usersResults != null) {

      res.render('admin', {
        users: usersResults
      });
    }
    else {
      // if we have an error, render to home page
      res.render("home");
    }
  } catch (error) {
    req.session.login_error = "A fatal error occurred. Please inform your system administrator.";
    res.render("home");
  }


}

async function getUser (req, res) {

  try {

    const usersResults = await UsersModel.getUser(req.params.id);

    if (usersResults != null) {
      // set a session key username to login the user
      res.render('user', {
        user: usersResults,
        users: true
      });
    }
    else {
      // if we have an error, render to home page
      res.render("home");
    }
  } catch (error) {
    req.session.login_error = "A fatal error occurred. Please inform your system administrator.";
    res.render("home");
  }
}

async function editUser(req, res){
  //render to user
}

async function deleteUser(req, res){
  const userId = req.params.id;
  try {
    const result = await adminModel.deleteUser(userId);
    if (result) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {getAllUsers, getUser, editUser, deleteUser};
