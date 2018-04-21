// ROUTES FOR OUR API
// =============================================================================
var router = require('express').Router();              // get an instance of the express Router

// connect to our MongoDB server
var mongoose   = require('mongoose');
mongoose.connect('mongodb://aryanmann:password1234@ds251849.mlab.com:51849/food-share-datapi', {})
        .then(() => { console.log("connected!"); },
            (error) => { console.log(error); });

router.use('/status', require('./status'));
router.use('/match', require('./match'));

var User       = require('../../../app/models/user');

router.get('/', (request, response) => {
          User.find((error, users) => {
             if(error) { response.json({ success: false, message: "Could not get list of users!" }); }
             else { response.json({ success: true, message: "Retrieved a list of users!", users: users }); }
          })});
          
router.post('/', (request, response) => {
          
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
          })});

module.exports = router;