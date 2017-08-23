"use strict";
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const requestId = require('express-request-id');
const mongoose = require('mongoose');
const favicon = require('serve-favicon');
const path = require('path');
const util = require('util');

var db = mongoose.connect('mongodb://localhost/bookAPI', {
  useMongoClient: true
  /* other options */
});

const fs = require('fs');

const app = express(); 
let bookRouter = require('./router');

const basicAuth = require('basic-auth-connect');
let port = process.env.port || 8080;

app.use(favicon(path.join(__dirname, 'public','favicon.ico')));
app.use(requestId());
// logging logs to a file in append mode
app.use(morgan('combined', {
    stream: fs.createWriteStream(path.join(__dirname, "ServerLogs.log"), { flag: 'a' })
}));

// app.use(basicAuth(function (user, passwd) {
//     return (user === 'testuser' && pass === 'test');
// }));

// Register Body parser middleware
// form parsing
app.use(bodyParser.urlencoded({ extended: false }));

// convert raw data into json
app.use(bodyParser.json());

// Custom Middleware - Chaining
app.use(function (req, res, next) {
    console.log("---Welcome 1---");
    next();
}, function (req, res, next) {
    console.log("---Welcome 2---");
    next();
});

//app.set('view engine', 'html');
//app.set('views', __dirname +'/Views');
app.use('/assets', express.static('assets', {redirect: false}));
//app.use(express.static(__dirname + "/Views"));

app.get('/', (req, res) => {
    res.end('<h1>Welcome to Express Application</h1>');
});

app.use('/books', bookRouter);

//Regex and default url handler
app.all('/*', (req, res, next) => {
    res.status(404).send("Page Not Found!");
    next();
});

//Error handling Middleware - it always need 4 parameters
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err);
})

app.listen(port, () => {
    util.log('Server is Ready at port %s', port);  // util.log adds timestamp
});

