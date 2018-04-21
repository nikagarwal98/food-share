// ROUTES FOR OUR API
// =============================================================================
var router = require('express').Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) { 
    res.render('views/home', {
        title: "Homepage"
    });
});

module.exports = router;

      




