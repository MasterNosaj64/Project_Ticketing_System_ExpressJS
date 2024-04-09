//const express = require('express');

// Display the home page
async function showHome (req, res)
{
  res.render("home",
             req.TPL);
}

module.exports = {showHome};
