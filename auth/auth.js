'use strict';

const User = require('../models/user')
const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy
const crypto = require('crypto')

passport.use(new BasicStrategy(
  function (userId, password, callback){
    const hash = crypto.createHash('sha256')
    hash.update(password)

    let hash_password = hash.digest('hex')

    User.findOne({userId:userId, password:hash_password},(err,doc)=>{

      if(doc) callback(null, doc)
      else callback(null,false)
    })


  }
))

exports.isBasicAuthnenticated = passport.authenticate('basic', {session:false})
