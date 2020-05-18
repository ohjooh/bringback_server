'use strict';

const mongoose = require('mongoose')

const MusicSchema = new mongoose.Schema({
  userId:String,
  musicStorage:[
    { str_albumName:String,
      str_albumArtist:String,
      str_albumDate:String,
      str_albumMusiclist:[
        { str_music_name: String,
          str_music_num: Number,
        }]
      }]
})

module.exports = mongoose.model('music', MusicSchema);
