// noinspection SpellCheckingInspection

const express = require('express');
const app = express();
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const fs = require('fs');
//const path = require('path');

//define routes
const clientRoute = require('./routes/client');
const adminRoute = require('./routes/admin');
//const ticketRoutes = require('./routes/ticket');
const authRoute = require('./routes/auth');
const homeRoute = require('./routes/home');
const logoutRoute = require('./routes/logout');

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.engine("mustache", mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'keyboard cat' //must insert a key here later than can be extracted form the db
    , resave: false
    , saveUninitialized: false
}))


// Create a middleware to populate an initial template array
app.use(function (req, res, next) {

    // reset the template object to a blank object on each request
    req.TPL = req.TPL || {};

    next();
});


// protect access to the app, re-direct user to login page if nobody is logged in...
app.use("/", function (req, res, next) {

    if (req.path.startsWith("/login") || req.session.username) {
        next();
    } else {
        res.redirect("/login");

    }

});

// Apply no-cache headers to all responses to help fight the back and forward button
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});


app.use(express.static('images'));

//write logs file for all reqs
app.use((req, res, next) => {

    const dateTime = new Date();
    const path = req.path;
    const ip = req.ip;
    const queryParams = JSON.stringify(req.query);
    const reqBody = JSON.stringify(req.body);

    const logEntry = `${dateTime} - Path: ${path}, IP: ${ip}, Query Params: ${queryParams}, Request Body: ${reqBody}\n`;

    // Append to log.txt file
    fs.appendFile('log.txt', logEntry, (err) => {
        if (err) throw err;
        console.log('Log entry added.');
    });

    next(); // Continue to the next middleware or route handler
});

// Include Controllers
//
// - We define all of our routes inside our controllers, and include them in
// our main app script.
//
app.use("/home", homeRoute);
app.use("/client", clientRoute);
//app.use("/interaction", require("./controllers/interaction"));
app.use("/admin", adminRoute);
app.use("/login", authRoute);
app.use("/logout", logoutRoute);
//app.use("/admin", require("./controllers/admin"));


// Catch-all router case
app.get(/^(.+)$/, function (req, res) {
    res.sendFile(__dirname + req.params[0]);
});

module.exports = {app};