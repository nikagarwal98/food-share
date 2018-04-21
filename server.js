// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// connect to our MongoDB server
var mongoose   = require('mongoose');
mongoose.connect('mongodb://aryanmann:password1234@ds251849.mlab.com:51849/food-share-datapi', {})
        .then(() => { console.log("connected!"); },
            (error) => { console.log(error); });

// use up our models
var User       = require('./app/models/user');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'Foodshare API online!' });   
});

// more routes for our API will happen here
// REGISTER OUR ROUTES -------------------------------

// GET all users | POST a new user
router.route('/user')
      
      // Create a new user
      .post((request, response) => {
          
          let name = request.body.name;
          let email = request.body.email;
          let password = request.body.password;
          let status = "idle";
          
          let newUser = new User();
          newUser.name = name;
          newUser.email = email;
          newUser.passwordHash = password;
          newUser.status = status;
          
          User.count({ 'email': email }, (err, count) => { 
              if (err){ return; }
              
              if(count >= 1) {
                  response.json({ success: false, message: "A user already exists with that email." });
              } else {
                  newUser.save((err) => {
                    if (err) { response.json({ success: false, message: "A new user could not be created!" }); }
                    else { response.json({ success: true, message: "A new user has been created!", user: newUser }); }
                  });
              }
          });
          
          
      })
      
      // Get all users
      .get((request, response) => {
          User.find((error, users) => {
             if(error) { response.json({ success: false, message: "Could not get list of users!" }); }
             else { response.json({ success: true, message: "Retrieved a list of users!", users: users }); }
          });
          
      });
      
// POST a new status
router.route('/user/status')

      .post((request, response) => {
         
         let newStatus = request.body.status;
         let email = request.body.email; 
         
         User.findOne({ email: email }, { status: newStatus }, {}, (err) => {
             if (err) { response.json({ success: false, message: "Could not update status!", error: err }); }
             else { response.json({ success: true, message: "Updated status to " + newStatus + "!" }); }
         })
      });



// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);