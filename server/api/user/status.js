// ROUTES FOR OUR API
// =============================================================================
var router = require('express').Router();              // get an instance of the express Routers
var User       = require('../../../app/models/user');

// POST a new status
router.post('/', (request, response) => {
         
         let newStatus = request.body.status;
         let email = request.body.email; 
         
         User.findOne({ email: email }, { status: newStatus }, {}, (err) => {
             if (err) { response.json({ success: false, message: "Could not update status!", error: err }); }
             else { response.json({ success: true, message: "Updated status to " + newStatus + "!" }); }
         });
      });
      
      
module.exports = router;