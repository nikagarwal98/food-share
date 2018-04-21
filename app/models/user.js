var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    name: String,
    email: String, 
    passwordHash: String,
    status: String,
    container: Number
});

module.exports = mongoose.model('User', UserSchema);