const express = require('express')
const cors = require('cors')
const app = express.Router()

app.use(cors(), (req, res, next) => {
  console.log('call to the system at:', new Date().getHours() + ':' + new Date().getMinutes() +
      '  from address' + req.url)
  next()
})

app.use(cors(), (req, res, next) => {
  if ((req.method === 'POST' || req.method === 'PUT') && (req.body === undefined)) {
    res.status(400).send('Bad Request: Empty body')
  } else {
    next()
  }
})

module.exports = app
