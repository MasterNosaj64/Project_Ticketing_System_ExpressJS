//const express = require('express');
// router = express.Router()
const UsersModel = require('../models/auth.js')

// Displays the login page
async function login (req, res) {
  // if we had an error during form submit, display it, clear it from session
  req.TPL.login_error = req.session.login_error;
  req.session.login_error = "";

  // render the login page
  res.render("login", req.TPL);
}

// Attempts to authenticate a user
// - The action for the form submit on the login page.
async function authenticate(req, res) {
  try {
    const user = await UsersModel.login(req.body.username, req.body.password);
    if (user != null) {
      req.session.username = user.username;
      req.session.title = user.title;
      // Clear any previous login error
      delete req.session.login_error;

      res.redirect("/home");
    } else {
      req.session.login_error = "Invalid username and/or password!";
      console.log("Invalid username and/or password!");
      res.redirect("/login"); // Redirect back to login to display the error
    }
  } catch (error) {
    console.error("Login error:", error);
    req.session.login_error = "A fatal error occurred. Please inform your system administrator.";
    res.redirect("/login"); // Redirect for consistent Post/Redirect/Get pattern
  }
}

// Logout a user
async function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error('Failed to destroy the session during logout:', err);
      return res.status(500).send("Could not log out.");
    }
    res.redirect("/login");
  });
}



module.exports = {login, authenticate, logout};
