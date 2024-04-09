// noinspection SpellCheckingInspection

const express = require('express');
const app = express();
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const fs = require('fs');
const path = require('path');

//define routes
const clientRoutes = require('./routes/client');
const userRoutes = require('./routes/user');
const ticketRoutes = require('./routes/ticket');
const authRoutes = require('./routes/auth');
const homeRoutes = require('./routes/home');

app.get('/', (req, res) => {
        res.redirect('/home');
});

app.engine("mustache", mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({ extended: false }));
app.use(session({
        secret: 'keyboard cat' //must insert a key here later than can be extracted form the db
        , resave: false
        , saveUninitialized: false
}))




// Create a middleware to populate an initial template array
app.use(function (req, res, next) {

        // reset the template object to a blank object on each request
        req.TPL = {};

        // decide whether to display the login or logout button in the navbar
        req.TPL.displaylogin = !req.session.username
        req.TPL.displaylogout = req.session.username

        next();
});

// Create middlewares for setting up navigational highlighting
// - we could condense this significantly, for example by having one middleware
// that looks at the URL and decides based on a configuration array... but it
// would come at the cost of readability (which matters more right now since
// we are learning middlewares for the first time).
app.use("/home",
        function (req, res, next) { req.TPL.homenav = true; next(); });
app.use("/client",
        function (req, res, next) { req.TPL.clientnav = true; next(); });
app.use("/ticket",
        function (req, res, next) { req.TPL.ticketnav = true; next(); });
app.use("/users",
        function (req, res, next) { req.TPL.usernav = true; next(); });
app.use("/login",
        function (req, res, next) { req.TPL.loginnav = true; next(); });

// protect access to the app, re-direct user to login page if nobody is logged in...
app.use("/", function (req, res, next) {

        if (req.path.startsWith("/login") || req.session.username) {
                next();
        }
        else {
                res.redirect("/login");

        }

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
app.use("/home", homeRoutes);
app.use("/client", clientRoutes);
//app.use("/company/geteditCompany", require("./controllers/company"));
//app.use("/client/editClient", clientRoutes);
//app.use("/customer", require("./controllers/customer"));
//app.use("/interaction", require("./controllers/interaction"));
app.use("/user", userRoutes);
app.use("/login", authRoutes);
app.use("/logout", authRoutes);
//app.use("/admin", require("./controllers/admin"));


// Catch-all router case
app.get(/^(.+)$/, function (req, res) {
        res.sendFile(__dirname + req.params[0]);
});



module.exports = {app};
