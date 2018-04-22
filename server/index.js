var express = require('express');
var app = express();
var chalk = require('chalk');
var volleyball = require('volleyball');
var bodyParser = require('body-parser');
var path = require("path");
const jwt = require('jsonwebtoken');

// Chat REQUIRES
var http = require('http').Server(app);
var io = require('socket.io')(http);

// connect to our MongoDB server
var mongoose   = require('mongoose');
mongoose.connect('mongodb://aryanmann:password1234@ds251849.mlab.com:51849/food-share-datapi', {})
        .then(() => { console.log("Connected to MongoDB!"); },
            (error) => { console.log(error); });

app.use(volleyball); // logging middleware
app.use(bodyParser.json()); // body parsing middleware
app.set('view engine', 'jade'); // set templating engine
app.set('views', path.join(__dirname, '..', 'public')); //

app.use('/api', require('./api')); // api routes
app.use('', require('../public')); // public routes
app.use(express.static('./public/'));

// 404 Error
app.get("*", (request, response) => {
    response.render('views/404', {
        title: "Not Found"
    });
});

// CHAT EMMITER

io.on('connection', function(socket){
    console.log('user connected');
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});

// changed app to http so socket.io can wrap around http
http.listen(8080, function() {
    console.log(chalk.blue('Server is running on port 8080'));
});