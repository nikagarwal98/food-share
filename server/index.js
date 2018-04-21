var express = require('express');
var app = express();
var chalk = require('chalk');
var volleyball = require('volleyball');
var bodyParser = require('body-parser');
var passport = require('passport');  
var jwt = require('jsonwebtoken');  
var router = express.Router();

var path = require("path");

app.use(volleyball); // logging middleware
app.use(bodyParser.json()); // body parsing middleware
app.set('view engine', 'jade'); // set templating engine
app.set('views', path.join(__dirname, '/public/')); //

app.use('/api', require('./api')); // api routes
app.use('', require('./public')); // public routes

// 404 Error
app.get("*", (request, response) => {
    response.render('views/404');
});

router.use

app.listen(8080, function() {
    console.log(chalk.magenta('Server is running on port 8080'));
});