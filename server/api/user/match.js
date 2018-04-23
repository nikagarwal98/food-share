// ROUTES FOR OUR API
// =============================================================================
var router = require('express').Router();              // get an instance of the express Router
var User       = require('../../../app/models/user');

router.get('/', (request, response) => {
         User.count({ status: "Sharing" }).exec((err, count) => {
             // Get a random entry
             let random = Math.floor(Math.random() * count)
            
             // Again query all users but only fetch one offset by our random #
             User.findOne({ status: "Sharing" }).skip(random).exec(
               (err, matchedUser) => {
                 
                 if (err) { response.json({ success: false, message: "Failed to match with another user!" }); }
                 else { response.json({ success: true, message: "User found!", user: matchedUser}); }
                 
               });
         });
          
      });
module.exports = router;