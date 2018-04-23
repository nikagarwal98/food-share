var router = require('express').Router(); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var User       = require('../../../app/models/user');

router.post('/', (req, res, next) => {
   User.find({ email: req.body.email }).limit(1)
     .exec()
     .then(user => {
        
        // If no user was found, return an error! 
        if(user.length < 1) {
            return res.status(401).json({
              success: false, message: "No User Found: Authorization failed!"
            });
        }
        
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            
            // If could not compare for some reason
            if(err) {
                return res.status(401).json({
                    success: false, message: "BCrypt Comparison Error: Authorization failed!"
                });
            }
            
            console.log(result);
            // If hash does not match
            if(result) {
                const token = jwt.sign({
                    name: user[0].name,
                    email: user[0].email
                }, process.env.JWT_KEY, 
                {
                    expiresIn: "1h"
                });
                return res.status(200).json({
                    success: true, message: "Authorization successful!", token: token
                });
            }
            
            // Other reason
            return res.status(401).json({
                success: false, message: "Password Match Error: Authorization failed!"
            });
        });
     })
     .catch(err => {
          console.log(err);
          res.status(500).json({
              error: err
          });
     });
});

module.exports = router;