//configure dotenv
require('dotenv').config()

//requre express
const express = require('express')
const userRoutes = require('./routes/User')
const mongoose = require('mongoose')

//create an express app
const app = express()

//logger middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`)
    next()
})

//routes
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })