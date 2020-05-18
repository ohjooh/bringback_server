'use strict';

const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

  userId:String,
  password:String,
  email: String,
  phone: String,
  birth:String,
  gender: String,
  taste:String

})

module.exports = mongoose.model('user', UserSchema);
