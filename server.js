'use strict';

const express = require('express')
const app = express()
const port = process.env.Post || 3000
const router = require('./route/router')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/bringback')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(router)

app.listen(port, err => {
    if (err) console.log(err)
    else console.log("서버 가동")
})