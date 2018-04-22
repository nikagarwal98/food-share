var router = require('express').Router(); 
const bcrypt = require("bcrypt");

var User       = require('../../../app/models/user');

router.post('/', (req, res, next)=> {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
          if(user.length >= 1) {
              return res.status(409).json({
                  success: false, message: "Email already exists"
              });
          } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err){
                        return res.status(500).json({
                            success: false, message: "Error while hashing password", error: err
                        });
                    } else {
                        const user = new User({
                            name: req.body.name,
                            email: req.body.email,
                            password: hash,
                            status: "Idle",//req.body.status,
                            container: 0//req.body.container
                        });
                        user
                          .save()
                          .then(result => {
                              console.log(result);
                              res.status(201).json({
                                  message: 'User created'
                              });
                          })
                          .catch(err => {
                              console.log(err);
                              res.status(500).json({
                                  error: err
                              });
                          });
                    }
                })
            }
      });
});

router.delete('/:userId', (req, res, next) => {
   User.remove({email: req.body.email}) 
     .exec()
     .then(result => {
         res.status(200).json({
             success: true, message: 'User deleted'
         });
     })
     .catch(err => {
         console.log(err);
         res.status(500).json({
             success: false, message: 'Could not delete user', error: err
         });
     });
});

module.exports = router;