// ROUTES FOR OUR API
// =============================================================================
var router = require('express').Router();              // get an instance of the express Router

router.use('/user', require('./user'));

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ success: true, message: 'Foodshare API online!' });   
});

module.exports = router;