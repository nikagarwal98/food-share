// ROUTES FOR OUR API
// =============================================================================
var router = require('express').Router();              // get an instance of the express Routers
var User       = require('../../../app/models/user');

// POST a new status
router.post('/', (request, response) => {
         
         let newContainer = request.body.container;
         let email = request.body.email; 
         
         User.update({ email: email }, { container: newContainer }, {}, (err) => {
             if (err) { response.json({ success: false, message: "Could not update container!", error: err }); }
             else { response.json({ success: true, message: "Updated containers to " + newContainer + "!" }); }
         });
      });
      
module.exports = router;