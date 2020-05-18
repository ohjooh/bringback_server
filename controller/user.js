'use strict';

const User = require('../models/user')
const crypto = require ('crypto')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

let jwtKey = '20191209';

exports.createUser = function(req,res){
  let userId = req.body.userId
  let password = req.body.password
  let email = req.body.email
  let phone = req.body.phone
  let birth = req.body.birth
  let gender = req.body.gender
  let taste = req.body.taste

  // new User(
  //         { userId:userId, password:password}).save((err, doc)=>{
  //         if (doc) res.send('유저가 생성되었습니다.')
  //       })

  User.findOne({userId:userId}, function(err, result){
    if(err){
       res.send(err)
       console.log( "db error")
    }
    else{
      if(result===null){
        const hash = crypto.createHash('sha256')
        hash.update(password)
        let hash_password = hash.digest('hex');


        new User(
          { userId:userId,
            password:hash_password,
            email:email,
            phone:phone,
            birth:birth,
            gender:gender,
            taste:taste

          }).save((err, doc)=>{
          if (doc) res.status(200).send()
        })

      }
      else res.status(400).send()

    }//else 끝
  })


}

exports.readUser = function (req, res){
  console.log("확인")
  res.status(200).send();
}



exports.updateUser = function(req, res){
  res.send('유저가 수정되었습니다.')
}
