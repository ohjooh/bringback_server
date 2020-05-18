'use strict';

const express = require('express');
const route = express.Router()
const user = require ('../controller/user')
const auth = require('../auth/auth')
const path = require('path')
const nodeID3 = require('node-id3')
const mongoose = require('mongoose')
const fs = require('fs');
const User = require('../models/user')
const filePath = './music/';
const crypto = require('crypto')

// const multer = require('multer')
route.route('/')
  .get ((req, res) => {
    console.log(req.query)

    res.send("확인")
  })

route.route('/user')
  .post(user.createUser)
  .get(auth.isBasicAuthnenticated, user.readUser)
  .put(auth.isBasicAuthnenticated, user.updateUser)


  route.route('/music').get((req, res) =>{

    fs.readdir('./music', function(err, filelist){
    let all_album_list = []
    let album_data = []

    for (let i = 0 ; i<filelist.length; i++){
      let music = nodeID3.read(filePath+filelist[i])
       //노래 데이터 뽑아옴 -> 앨범리스트와 같은 앨범이 있는지 판별
       if (music == false ) continue
       else album_data.push({ Album_title:music.album, Album_artist:music.artist, Album_year:music.year })
       //album_data = music
    }

    const removeDupliactes = (values) => {
      let concatArray = values.map(eachValue => {
        return Object.values(eachValue).join('')
      })
      let filterValues = values.filter((value, index) => {
        return concatArray.indexOf(concatArray[index]) === index
      })
      return filterValues
    }

    all_album_list = removeDupliactes(album_data)
    console.log(all_album_list)
    res.status(200).send(JSON.stringify(all_album_list))

    })

  })

  route.route('/music/:id')
    .get((req, res) => {
      console.log(req.params.id)
      const songFile = filePath+req.params.id+'.mp3'
      const data = nodeID3.read(songFile);
      res.send(data);
      //res.send(data.title + ' - ' + data.artist);
    })


route.route('/music/:id/play')
  .get((req, res) => {
    console.log(req.params.id)
    const songFile = filePath+req.params.id+'.mp3'
    const data = nodeID3.read(songFile);
    // res.send(data.title + ' - ' + data.artist);

    res.writeHead(200,{'Content-Type': 'audio/mpeg'});
    fs.createReadStream(songFile).pipe(res);

  })

route.route('/login').post((req, res) => {
  console.log(req.body.password ,req.body.userId)

    const hash = crypto.createHash('sha256')
    hash.update(req.body.password)
    let hash_password = hash.digest('hex');

    const query = {
      userId: req.body.userId,
      password:hash_password
    }

    User.findOne(query,(err, result) =>{
      if(result != null){
        const objToSend = {
          userId_result :result.userId,
          taste_result: result.taste
        }
        res.status(200).send(JSON.stringify(objToSend))
      }
      else {
        res.status(404).send()
      }
    })
})

route.route('/setting').post((req,res) =>{
  console.log(req.body.userId)
  User.findOne({userId:req.body.userId}, (err, result) =>{
    if(result != null){
      const objToSend_set = {
        email_r:result.email,
        phone_r:result.phone,
        birth_r:result.birth,
        gender_r:result.gender,
        taste_r:result.taste
      }
      res.status(200).send(JSON.stringify(objToSend_set))
    }
    else res.status(404).send()
  })
})

module.exports = route;
