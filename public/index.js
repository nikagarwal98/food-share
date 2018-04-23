// ROUTES FOR OUR API
// =============================================================================
var router = require('express').Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) { 
    res.render('views/home', {
        title: "Homepage"
    });
});

router.get('/login', (req, res) => {
    res.render('views/authentication/login', {
        title: "Login"
    });
});

router.get('/signup', (req, res) => {
   res.render('views/authentication/signup', {
       title: "Signup"
   }) 
});

router.get('/profile', (req, res) => {
   res.render('views/authentication/profile', {
       title: "Profile",
       
       name: "Default Name",
       containers: "10000",
       guestMeals: "5"
   }) 
});

router.get('/chat', (req, res) => {
   res.render('views/chat', {
       title: "Chat"
   });
});

router.get('/match', (req, res) => {
   res.render('views/match', {
       title: "Match"
   }) 
});



module.exports = router;