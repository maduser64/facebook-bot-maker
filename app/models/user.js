var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  local       : {
    email     : String,
  }, 
  facebook    : {
    id        : String,
    token     : String,
    email     : String,
    name      : String,
    password  : String,
    bots      : []
  },
  twitter     : {
    id        : String,
    token     : String,
    tokenSecret: String,
    displayName: String,
    username   : String
  }


});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);